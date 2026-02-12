// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title ZKMotusDeploy.s
 * @author Yabes Theodorus
 * @notice Short description of contract
 * @dev Created 2026
 */
import {Script} from "forge-std/Script.sol";
import {ZKMotusPayment} from "src/ZKMotusPayment.sol";
import {ZKMotusRegistry} from "src/ZKMotusRegistry.sol";
import {HonkVerifier} from "src/ZKMotusVerifier.sol";

contract ZKMotusDeploy is Script {
    function run() public returns (ZKMotusPayment payment, ZKMotusRegistry registry, HonkVerifier verifier) {
        vm.startBroadcast();
        verifier = new HonkVerifier();
        payment = new ZKMotusPayment(msg.sender);
        registry = new ZKMotusRegistry(payable(address(payment)), msg.sender, address(verifier));
        vm.stopBroadcast();
    }
}
