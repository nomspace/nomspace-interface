#!/usr/bin/env bash

cd $(dirname $0)/..
mkdir -p ./src/abis/homora_v2_contracts
cp -R ../homora_v2_contracts/build/interfaces/* ./src/abis/homora_v2_contracts
mkdir -p ./src/abis/fountain_of_youth
cp -R ../fountain_of_youth/build/abi/* ./src/abis/fountain_of_youth
