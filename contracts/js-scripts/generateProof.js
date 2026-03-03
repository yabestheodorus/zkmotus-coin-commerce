import { Barretenberg, UltraHonkBackend } from '@aztec/bb.js';

import { ethers } from 'ethers';
import { Noir } from '@noir-lang/noir_js';
import circuit from '../../circuits/target/circuits.json'; // ← direct import

export default async function generateProof() {
    try {
        const noir = new Noir(circuit);
        const inputs = process.argv.slice(2);

        const input = {
            order_commitment: inputs[0], // string
            serial_number_hashed: inputs[1], // string
            verify_nonce: inputs[2], // string
            client_secret: inputs[3], // string
            client_serial_number: inputs[4], // string
        };

        const { witness } = await noir.execute(input);

        const originalLog = console.log;
        console.log = () => {};

        // initialize the backend using the circuit bytecode
        const barretenbergApi = await Barretenberg.new();
        const backend = new UltraHonkBackend(circuit.bytecode, barretenbergApi);

        const { proof, publicInputs } = await backend.generateProof(witness, {
            verifierTarget: 'evm',
        });

        console.log = originalLog;

        const result = ethers.AbiCoder.defaultAbiCoder().encode(['bytes', 'bytes32[]'], [proof, publicInputs]);

        // const isValid = await backend.verifyProof({ proof, publicInputs }, { keccak: true });
        // console.log(`Proof verification: ${isValid ? 'SUCCESS' : 'FAILED'}`);
        return result;
    } catch (error) {
        console.error('Error generating proof :', error);
        throw error;
    }
}

(async () => {
    generateProof()
        .then((result) => {
            process.stdout.write(result);
            process.exit(0);
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
})();
