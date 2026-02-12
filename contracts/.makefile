
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
forge script script/ZKMotusDeploy.s.sol:ZKMotusDeploy --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast --gas-limit 150000000 -vvvv

# Clean build artifacts
clean:
	forge clean

# Shortcut: build and deploy
all: build deploy

abi:
	mkdir ../backend/abi
	cat out/ZKMotusPayment.sol/ZKMotusPayment.json | jq '.abi' > ../backend/abi/ZKMotusPayment.abi.json
	cat out/ZKMotusRegistry.sol/ZKMotusRegistry.json | jq '.abi' > ../backend/abi/ZKMotusRegistry.abi.json
