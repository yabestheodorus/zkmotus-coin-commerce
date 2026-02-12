use poseidon::poseidon2;
fn main(
    order_commitment: pub Field,
    serial_number_hashed: pub Field,
    verify_nonce: pub Field,
    client_secret: Field,
    client_serial_number: Field,
) {
    // compute the commitment Poseidon(secret, serial_number)
    let computed_order_commitment: Field =
        poseidon2::Poseidon2::hash([client_secret, client_serial_number], 2);

    let computed_serial_number_hash: Field = poseidon2::Poseidon2::hash([client_serial_number], 1);

    let computed_hash: Field =
        poseidon2::Poseidon2::hash([computed_order_commitment, verify_nonce], 2);
    let computed_hash_pub: Field = poseidon2::Poseidon2::hash([order_commitment, verify_nonce], 2);

    assert(computed_hash == computed_hash_pub);
    assert(computed_serial_number_hash == serial_number_hashed);
}
