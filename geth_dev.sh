#!/bin/sh
geth --dev --datadir ~/ethereum_dev --mine --minerthreads 8 --etherbase e140d3dbccc7353b754fe35165a743edd95ce808 --maxpeers 25 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpccorsdomain "http://localhost"
