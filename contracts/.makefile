
# Load environment variables from .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Makefile for Foundry ZKMotusDeploy script

# Default network (can be overridden)
FOUNDRY_NETWORK ?= anvil

# Script path
SCRIPT = script/ZKMotusDeploy.s.sol:ZKMotusDeploy

# Build all contracts
build:
	forge build

# Run the deployment script
deploy:
	forge script $(SCRIPT) --broadcast --rpc-url $(RPC_URL) --private-key $(BURNER_PK) -vvvv

deploy-local:
forge script script/ZKMotusDeploy.s.sol:ZKMotusDeploy --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --broadcast --gas-limit 150000000 -vvvv

# Clean build artifacts
clean:
	forge clean

# Shortcut: build and deploy
all: build deploy

abi:
	mkdir ../backend/abi
	cat out/ZKMotusPayment.sol/ZKMotusPayment.json | jq '.abi' > ../backend/abi/ZKMotusPayment.abi.json
	cat out/ZKMotusRegistry.sol/ZKMotusRegistry.json | jq '.abi' > ../backend/abi/ZKMotusRegistry.abi.json
