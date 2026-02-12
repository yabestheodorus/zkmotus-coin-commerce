// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title ZKMotusPayment
 * @author Yabes Theodorus
 * @notice Handles order creation and payment settlement for ZKMotus items.
 * @dev
 * - Serial numbers are expected to be hashed off-chain (e.g. Poseidon).
 * - This contract does NOT know buyer addresses.
 * - Ownership is represented by a purchase commitment (bytes32).
 * - Designed to be consumed by ZKMotusRegistry for authenticity verification.
 */
contract ZKMotusPayment {
    /*////////////////////////////////////////////////////////////////////////////
                                          ERRORS
    ///////////////////////////////////////////////////////////////////////////*/

    /// @notice Thrown when ETH amount or required value is zero
    error ZKMotusPayment__ZeroAmount();

    /// @notice Thrown when attempting to create an already-existing order
    error ZKMotusPayment__OrderIdExist(uint256 orderId);

    /// @notice Thrown when an order has already been paid
    error ZKMotusPayment__OrderIdHasBeenPaid(uint256 orderId);

    /// @notice Thrown when querying or paying a non-existent order
    error ZKMotusPayment__InvalidOrderId(uint256 orderId);

    /// @notice Thrown when msg.value does not match the expected order price
    error ZKMotusPayment__IncorrectPaymentAmount(uint256 sent, uint256 expected);

    /// @notice Thrown when a non-merchant calls a restricted function
    error ZKMotusPayment__NotFromMerchant(address sender);

    /// @notice Thrown when ETH withdrawal fails
    error ZKMotusPayment__WithdrawFailed();

    /// @notice Thrown when zero address is supplied
    error ZKMotusPayment__ZeroAddress();

    /// @notice Contract does not accept ETH directly
    error ZKMotusPayment__ReceiveNotAvailable();

    /// @notice Contract does not accept fallback calls
    error ZKMotusPayment__FallbackNotAvailable();

    /// @notice Thrown when empty arrays are supplied
    error ZKMotusPayment_EmptyArray();

    /// @notice Thrown when a serial number already has a registered owner
    error ZKMotusPayment__SerialNumberAlreadyHasOwner(bytes32 serialNumber);

    /*////////////////////////////////////////////////////////////////////////////
                                    STATE VARIABLES
    ///////////////////////////////////////////////////////////////////////////*/

    /// @notice Maps orderId to total price (wei)
    mapping(uint256 orderId => uint256 price) s_orderIdToPrice;

    /// @notice Tracks whether an order has been paid
    mapping(uint256 orderId => bool paid) s_orderIdPaid;

    /// @notice Maps orderId to hashed serial numbers included in that order
    mapping(uint256 orderId => bytes32[] serialNumbers) public s_orderIdToSerialNumbers;

    /// @notice Maps hashed serial number to purchase commitment
    mapping(bytes32 serialNumber => bytes32 orderCommitment) public s_serialNumberPaidBy;

    /// @notice Merchant address with exclusive privileges
    address private immutable i_merchant;

    /*////////////////////////////////////////////////////////////////////////////
                                          EVENTS
    ///////////////////////////////////////////////////////////////////////////*/

    /// @notice Emitted when a new order is created
    event OrderCreated(uint256 indexed orderId, uint256 totalPrice);

    /// @notice Emitted when an order is paid
    /// @param orderId The order identifier
    /// @param orderCommitment Commitment representing buyer ownership
    /// @param amount ETH paid
    /// @param serialNumbers Hashed serial numbers included in the order
    event OrderPaid(uint256 indexed orderId, bytes32 indexed orderCommitment, uint256 amount, bytes32[] serialNumbers);

    /*////////////////////////////////////////////////////////////////////////////
                                         MODIFIERS
    ///////////////////////////////////////////////////////////////////////////*/

    /// @notice Restricts function to merchant only
    modifier onlyMerchant() {
        if (msg.sender != i_merchant) {
            revert ZKMotusPayment__NotFromMerchant(msg.sender);
        }

        _;
    }

    /*////////////////////////////////////////////////////////////////////////////
                                        CONSTRUCTOR
    ///////////////////////////////////////////////////////////////////////////*/

    /**
     * @param _merchantAddress Address authorized to create orders and withdraw funds
     */
    constructor(address _merchantAddress) {
        if (_merchantAddress == address(0)) revert ZKMotusPayment__ZeroAddress();
        i_merchant = _merchantAddress;
    }

    /*////////////////////////////////////////////////////////////////////////////
                                   RECEIVE / FALLBACK
    ///////////////////////////////////////////////////////////////////////////*/

    /// @dev ETH transfers must go through receivePayment
    receive() external payable {
        revert ZKMotusPayment__ReceiveNotAvailable();
    }

    /// @dev Reject all fallback calls
    fallback() external payable {
        revert ZKMotusPayment__FallbackNotAvailable();
    }

    /*////////////////////////////////////////////////////////////////////////////
                               PUBLIC / EXTERNAL FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////*/

    /**
     * @notice Creates a new payable order
     * @dev Callable only by merchant
     * @param _orderId Unique order identifier
     * @param _serialNumbers Hashed serial numbers associated with the order
     * @param _totalPrice Total price in wei
     */
    function createNewOrder(uint256 _orderId, bytes32[] memory _serialNumbers, uint256 _totalPrice)
        external
        onlyMerchant
    {
        if (_orderId == 0 || _totalPrice == 0) {
            revert ZKMotusPayment__ZeroAmount();
        }

        if (s_orderIdToPrice[_orderId] != 0) {
            revert ZKMotusPayment__OrderIdExist(_orderId);
        }

        if (_serialNumbers.length == 0) {
            revert ZKMotusPayment_EmptyArray();
        }

        for (uint256 i = 0; i < _serialNumbers.length; i++) {
            if (_serialNumbers[i] == bytes32(0)) {
                revert ZKMotusPayment_EmptyArray();
            }
        }

        s_orderIdToSerialNumbers[_orderId] = _serialNumbers;
        s_orderIdToPrice[_orderId] = _totalPrice;
        emit OrderCreated(_orderId, _totalPrice);
    }

    /**
     * @notice Pays for an order and assigns ownership commitments to serials
     * @param orderId Order being paid
     * @param _orderCommitment Commitment proving buyer ownership
     * @dev frontend will send poseidon2.hash_2(secret,orderId) to keep user address private
     */
    function receivePayment(uint256 orderId, bytes32 _orderCommitment) external payable {
        if (msg.value == 0) {
            revert ZKMotusPayment__ZeroAmount();
        }
        //check whether orderId has been paid
        if (s_orderIdPaid[orderId]) {
            revert ZKMotusPayment__OrderIdHasBeenPaid(orderId);
        }
        uint256 totalPrice = s_orderIdToPrice[orderId];
        if (totalPrice == 0) {
            revert ZKMotusPayment__InvalidOrderId(orderId);
        }
        if (msg.value != totalPrice) {
            revert ZKMotusPayment__IncorrectPaymentAmount(msg.value, totalPrice);
        }
        s_orderIdPaid[orderId] = true;

        bytes32[] memory serialNumbers = s_orderIdToSerialNumbers[orderId];
        for (uint256 i = 0; i < serialNumbers.length; i++) {
            if (s_serialNumberPaidBy[serialNumbers[i]] != bytes32(0)) {
                revert ZKMotusPayment__SerialNumberAlreadyHasOwner(serialNumbers[i]);
            }
            s_serialNumberPaidBy[serialNumbers[i]] = _orderCommitment;
        }

        emit OrderPaid(orderId, _orderCommitment, msg.value, serialNumbers);
    }

    /**
     * @notice Withdraws accumulated ETH to merchant
     */
    function withdraw() external onlyMerchant {
        uint256 balance = address(this).balance;
        if (balance == 0) revert ZKMotusPayment__ZeroAmount();

        (bool success,) = payable(i_merchant).call{value: balance}("");
        if (!success) {
            revert ZKMotusPayment__WithdrawFailed();
        }
    }

    /*////////////////////////////////////////////////////////////////////////////
                             INTERNAL / PRIVATE FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////*/

    /*////////////////////////////////////////////////////////////////////////////
                                VIEW / PURE FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////*/

    /// @notice Returns order price
    function getOrderPrice(uint256 orderId) external view returns (uint256) {
        return s_orderIdToPrice[orderId];
    }

    /**
     * @notice Returns purchase commitment for a serial number
     * @dev Reverts if item has not been paid
     */
    function getCommitmentFromSerialNumber(bytes32 _serialNumber) external view returns (bytes32) {
        return s_serialNumberPaidBy[_serialNumber];
    }

    /// @notice Returns serial numbers associated with an order
    function getSerialNumbersFromOrder(uint256 orderId) external view returns (bytes32[] memory) {
        return s_orderIdToSerialNumbers[orderId];
    }
}
