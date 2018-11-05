#!/bin/bash
DATADIR=`pwd`
$DATADIR/ipfs_stop.sh
ipfs daemon "$@" &> $DATADIR/ipfs.log &  echo $! > $DATADIR/ipfs.pid
