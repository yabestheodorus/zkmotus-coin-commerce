// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title ZKMotusRegistry.t
 * @author Yabes Theodorus
 * @notice Short description of contract
 * @dev Created 2026
 */

import {Test, console} from "forge-std/Test.sol";
import {ZKMotusPaymentTest} from "./ZKMotusPayment.t.sol";
import {ZKMotusRegistry} from "src/ZKMotusRegistry.sol";

contract ZKMotusRegistryTest is ZKMotusPaymentTest {
    function testRegisterAuthenticityWithZeroValueCommitment() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        vm.expectRevert(ZKMotusRegistry.ZKMotusRegistry__ZeroValue.selector);
        registry.registerAuthenticity(
            bytes32(0),
            orderCommitment,
            product1SerialHashed
        );
    }

    function testRegisterAuthenticityWithUnpaidItem() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);

        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry.ZKMotusRegistry__ItemNotPaid.selector,
                serialNumbers[0]
            )
        );
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );
    }

    function testRegisterAuthenticityWithUnauthorizedBuyer() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry.ZKMotusRegistry__UnauthorizedBuyer.selector,
                serialNumbers[0]
            )
        );
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitmentWithPerson2,
            product1SerialHashed
        );
    }

    function testRegisterAuthenticityWithSameItemTwice() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry
                    .ZKMotusRegistry__ItemsAlreadyRegistered
                    .selector,
                serialNumbers[0]
            )
        );
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );
    }

    function _generateProof(
        bytes32 _orderCommitment,
        bytes32 serialNumberHashed,
        uint256 serialNumber,
        uint256 nonce
    ) public returns (bytes memory proof, bytes32[] memory publicInputs) {
        string[] memory inputs = new string[](8);
        inputs[0] = "npx";
        inputs[1] = "tsx";
        inputs[2] = "js-scripts/generateProof.js";
        inputs[3] = vm.toString(_orderCommitment);
        inputs[4] = vm.toString(serialNumberHashed);
        inputs[5] = vm.toString(nonce);
        inputs[6] = vm.toString(SECRET_KEY);
        inputs[7] = vm.toString(serialNumber);

        // use ffi to run scripts in the CLI to create the commitment
        bytes memory result = vm.ffi(inputs);

        //ABI decode the result
        (proof, publicInputs) = abi.decode(result, (bytes, bytes32[]));
    }

    function testVerifyAuthenticityNotFromMerchant() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // creating new order and do payment
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        // registering authenticity
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );

        bytes32 nonce = keccak256(
            abi.encodePacked(product1Serial, block.timestamp)
        );
        uint256 fieldNonce = uint256(nonce) % FIELD_MODULUS;

        (bytes memory proof, ) = _generateProof(
            purchaseCommitmentProduct1,
            product1SerialHashed,
            product1Serial,
            fieldNonce
        );
        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry.ZKMotusRegistry__NotFromMerchant.selector,
                address(this)
            )
        );
        registry.verifyAuthenticity(
            proof,
            product1SerialHashed,
            bytes32(fieldNonce)
        );
    }

    function testVerifyAuthenticityWithValidProof() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // creating new order and do payment
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        // registering authenticity
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );

        bytes32 nonce = keccak256(
            abi.encodePacked(product1Serial, block.timestamp)
        );
        uint256 fieldNonce = uint256(nonce) % FIELD_MODULUS;

        (bytes memory proof, ) = _generateProof(
            purchaseCommitmentProduct1,
            product1SerialHashed,
            product1Serial,
            fieldNonce
        );
        vm.prank(MERCHANT);
        registry.verifyAuthenticity(
            proof,
            product1SerialHashed,
            bytes32(fieldNonce)
        );
    }

    function testVerifyAuthenticityWithInvalidNonce() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // creating new order and do payment
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        // registering authenticity
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );

        bytes32 nonce = keccak256(
            abi.encodePacked(product1Serial, block.timestamp)
        );
        uint256 fieldNonce = uint256(nonce) % FIELD_MODULUS;

        (bytes memory proof, ) = _generateProof(
            purchaseCommitmentProduct1,
            product1SerialHashed,
            product1Serial,
            fieldNonce
        );
        vm.prank(MERCHANT);
        registry.verifyAuthenticity(
            proof,
            product1SerialHashed,
            bytes32(fieldNonce)
        );

        // reverify authenticity using same nonce will revert
        vm.prank(MERCHANT);
        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry.ZKMotusRegistry__InvalidNonce.selector,
                bytes32(fieldNonce)
            )
        );
        registry.verifyAuthenticity(
            proof,
            product1SerialHashed,
            bytes32(fieldNonce)
        );
    }

    function testVerifyAuthenticityWithUnregisteredItems() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // creating new order and do payment
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        // registering authenticity
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );

        bytes32 nonce = keccak256(
            abi.encodePacked(product1Serial, block.timestamp)
        );
        uint256 fieldNonce = uint256(nonce) % FIELD_MODULUS;

        (bytes memory proof, ) = _generateProof(
            purchaseCommitmentProduct1,
            product1SerialHashed,
            product1Serial,
            fieldNonce
        );

        // reverify authenticity using unregistered item
        vm.prank(MERCHANT);
        vm.expectRevert(
            abi.encodeWithSelector(
                ZKMotusRegistry.ZKMotusRegistry__ItemNotRegistered.selector,
                serialNumbers[1]
            )
        );
        registry.verifyAuthenticity(
            proof,
            product2SerialHashed,
            bytes32(fieldNonce)
        );
    }

    function testVerifyAuthenticityWithInvalidProof() public {
        bytes32[] memory serialNumbers = new bytes32[](2);
        serialNumbers[0] = product1SerialHashed;
        serialNumbers[1] = product2SerialHashed;

        // creating new order and do payment
        vm.prank(MERCHANT);
        payment.createNewOrder(ORDER_ID, serialNumbers, TOTAL_PRICE);
        payment.receivePayment{value: TOTAL_PRICE}(ORDER_ID, orderCommitment);

        // registering authenticity for product 1 and 2
        registry.registerAuthenticity(
            purchaseCommitmentProduct1,
            orderCommitment,
            product1SerialHashed
        );
        registry.registerAuthenticity(
            purchaseCommitmentProduct2,
            orderCommitment,
            product2SerialHashed
        );

        bytes32 nonce = keccak256(
            abi.encodePacked(product1Serial, block.timestamp)
        );
        uint256 fieldNonce = uint256(nonce) % FIELD_MODULUS;

        (bytes memory proof, ) = _generateProof(
            purchaseCommitmentProduct1,
            product1SerialHashed,
            product1Serial,
            fieldNonce
        );

        // verify invalid proof by using purchase commitment product 1, but use product 2 serial as public input
        vm.prank(MERCHANT);
        vm.expectRevert(ZKMotusRegistry.ZKMotusRegistry__InvalidProof.selector);
        registry.verifyAuthenticity(
            proof,
            product2SerialHashed,
            bytes32(fieldNonce)
        );
    }
}
