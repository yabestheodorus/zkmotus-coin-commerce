# Run the deployment script

deploy:
forge script $(SCRIPT) --broadcast --rpc-url $(RPC_URL) --private-key $(BURNER_PK) -vvvv

deploy-local:
forge script script/ZKMotusDeploy.s.sol:ZKMotusDeploy --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --broadcast --gas-limit 150000000 -vvvv

deploy-sepolia:
forge script script/ZKMotusDeploy.s.sol:ZKMotusDeploy --rpc-url https://eth-sepolia.g.alchemy.com/v2/MpO-__stjmLpQmlSgi1et --private-key 0xfc60f28f14db96f746dd92718453e076575c34cd3ac25706d29f1b857563a5bc --broadcast --gas-limit 150000000 -vvvv

abi:
mkdir ../backend/abi
cat out/ZKMotusPayment.sol/ZKMotusPayment.json | jq '.abi' > ../backend/abi/ZKMotusPayment.abi.json
cat out/ZKMotusRegistry.sol/ZKMotusRegistry.json | jq '.abi' > ../backend/abi/ZKMotusRegistry.abi.json
