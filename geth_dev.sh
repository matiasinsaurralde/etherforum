#!/bin/sh
geth --dev --datadir ~/ethereum_dev --mine --minerthreads 8 --etherbase 5d2da6c536f5aaf1b05ea5eeced388c602280365 --maxpeers 25 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpccorsdomain "http://localhost"
