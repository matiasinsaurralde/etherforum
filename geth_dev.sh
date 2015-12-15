#!/bin/sh
geth --dev --datadir ~/ethereum_dev --mine --minerthreads 1 --etherbase 5d2da6c536f5aaf1b05ea5eeced388c602280365 --maxpeers 25 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpccorsdomain "http://192.168.0.3" --unlock 0x5d2da6c536f5aaf1b05ea5eeced388c602280365
