#!/bin/bash
DATADIR=`pwd`
$DATADIR/ipfs_stop.sh
ipfs daemon --enable-pubsub-experiment "$@" &> $DATADIR/ipfs.log &  echo $! > $DATADIR/ipfs.pid
