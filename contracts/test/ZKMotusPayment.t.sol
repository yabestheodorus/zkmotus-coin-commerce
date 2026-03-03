// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title ZKMotusPayment.t
 * @author Yabes Theodorus
 * @notice Short description of contract
 * @dev Created 2026
 */

import {Test, console} from "forge-std/Test.sol";
import {ZKMotusPayment} from "src/ZKMotusPayment.sol";
import {ZKMotusRegistry} from "src/ZKMotusRegistry.sol";
import {HonkVerifier} from "src/ZKMotusVerifier.sol";
import {ZKMotusDeploy} from "script/ZKMotusDeploy.s.sol";
import {Poseidon2, Field} from "@poseidon2/src/Poseidon2.sol";

contract RejectETH {
    receive() external payable {
        revert("I hate ETH");
    }
}

contract ZKMotusPaymentTest is Test {
    ZKMotusPayment payment;
    ZKMotusRegistry registry;
    HonkVerifier verifier;
    ZKMotusDeploy deployer;
    Poseidon2 hasher;
    RejectETH rejector;
    // dummy product
    uint256 constant ORDER_ID = 445;
    uint256 constant TOTAL_PRICE = 15e16; // price in ETH
    uint256 constant SECRET_KEY = 15546; // price in ETH
    uint256 constant SECRET_KEY_PERSON2 = 62650; // price in ETH
    uint256 constant FIELD_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 product1Serial = 6652452724339345;
    uint256 product2Serial = 3729851295541858;
    bytes32 product1SerialHashed;
    bytes32 product2SerialHashed;
    bytes32 purchaseCommitmentProduct1;
    bytes32 orderCommitmentWithPerson2;
    bytes32 purchaseCommitmentProduct2;
    bytes32 orderCommitment;

    address MERCHANT = makeAddr("merchant");

    function setUp() public {
        //this rejector address is to test withdraw failed scenario
        rejector = new RejectETH();

        payment = new ZKMotusPayment(MERCHANT);
        verifier = new HonkVerifier();
        registry = new ZKMotusRegistry(payable(address(payment)), MERCHANT, address(verifier));

        hasher = new Poseidon2();
        product1SerialHashed = Field.toBytes32(hasher.hash_1(Field.toField(product1Serial)));
        product2SerialHashed = Field.toBytes32(hasher.hash_1(Field.toField(product2Serial)));
        purchaseCommitmentProduct1 =
            Field.toBytes32(hasher.hash_2(Field.toField(SECRET_KEY), Field.toField(product1Serial)));
        purchaseCommitmentProduct2 =
            Field.toBytes32(hasher.hash_2(Field.toField(SECRET_KEY), Field.toField(product2Serial)));
        orderCommitment = Field.toBytes32(hasher.hash_2(Field.toField(SECRET_KEY), Field.toField(ORDER_ID)));
        orderCommitmentWithPerson2 =
            Field.toBytes32(hasher.hash_2(Field.toField(SECRET_KEY_PERSON2), Field.toField(ORDER_ID)));
    }

    function testCreateOrderWithZeroValues() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.prank(MERCHANT);
        vm.expectRevert(ZKMotusPayment.ZKMotusPayment__ZeroAmount.selector);
        payment.createNewOrder(0, serialNumbers, 0);
    }

    function testCreateOrderWithEmptyProduct() public {
        bytes32[] memory serialNumbers;
        vm.expectRevert(ZKMotusPayment.ZKMotusPayment_EmptyArray.selector);
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        bytes32[] memory serialNumbersZeroFilled = new bytes32[](2);
        vm.expectRevert(ZKMotusPayment.ZKMotusPayment_EmptyArray.selector);
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbersZeroFilled, TOTAL_PRICE);
    }

    function testCreateSuccessfullOrder() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.expectEmit(true, false, false, false);
        emit ZKMotusPayment.OrderCreated(ORDER_ID, TOTAL_PRICE);
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        assertEq(payment.getOrderPrice(ORDER_ID), TOTAL_PRICE);

        //test serial number from order id match serial number above
        bytes32[] memory serialNumbersFromOrder = payment.getSerialNumbersFromOrder(ORDER_ID);
        assertEq(serialNumbers.length, serialNumbersFromOrder.length);
    }

    function testOrderIdExist() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        vm.expectRevert(abi.encodeWithSelector(ZKMotusPayment.ZKMotusPayment__OrderIdExist.selector, ORDER_ID));
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
    }

    function testPaymentWithZeroValue() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        vm.expectRevert(ZKMotusPayment.ZKMotusPayment__ZeroAmount.selector);
        payment.receivePayment{value: 0}(ORDER_ID, "");

        // test payment with unregistered orderId
        vm.expectRevert(abi.encodeWithSelector(ZKMotusPayment.ZKMotusPayment__InvalidOrderId.selector, ORDER_ID + 2));
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID + 2, "");
    }

    function testPaymentWithIncorrectPaymentAmount() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
         vm.expectRevert(abi.encodeWithSelector(ZKMotusPayment.ZKMotusPayment__IncorrectPaymentAmount.selector, 1e5, 15e16 ));
        payment.receivePayment{value: 1e5}(ORDER_ID, "");
    }

    function testSuccessfullPayment() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        vm.expectEmit(true, false, false, false);
        emit ZKMotusPayment.OrderPaid(ORDER_ID, orderCommitment, TOTAL_PRICE, serialNumbers);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);
    }

    function testPaymentWithSameOrderIdWillRevert() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);
         vm.expectRevert(abi.encodeWithSelector(ZKMotusPayment.ZKMotusPayment__OrderIdHasBeenPaid.selector, ORDER_ID));
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);
    }

    function testPaymentWithSameSerialNumberWillRevert() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // create two orders with the same items inside
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID + 1, serialNumbers, TOTAL_PRICE);

        // pay the two orders with the same items inside will revert
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);
         vm.expectRevert(abi.encodeWithSelector(ZKMotusPayment.ZKMotusPayment__SerialNumberAlreadyHasOwner.selector, serialNumbers[0]));
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID + 1, orderCommitment);
    }

    function testWithdrawWithZeroAmount() public {
        vm.prank(MERCHANT);
        vm.expectRevert(ZKMotusPayment.ZKMotusPayment__ZeroAmount.selector);
        payment.withdraw();
    }

    function testSuccessfullWithdraw() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // create two orders with the same items inside
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        // pay the two orders with the same items inside will revert
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        vm.prank(MERCHANT);
        payment.withdraw();
        assertEq(address(payment).balance, 0);
        assertEq(MERCHANT.balance, TOTAL_PRICE);
    }

    function testWithdrawFailed() public {
        payment = new ZKMotusPayment(address(rejector));

        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // create two orders with the same items inside
        vm.prank(address(rejector));
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        // pay the two orders with the same items inside will revert
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        vm.prank(address(rejector));
        vm.expectRevert(ZKMotusPayment.ZKMotusPayment__WithdrawFailed.selector);
        payment.withdraw();
    }
}
