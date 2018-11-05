#!/bin/bash
DATADIR=`pwd`
$DATADIR/cluster_stop.sh
ipfs-cluster-service daemon "$@" &> $DATADIR/cluster.log &  echo $! > $DATADIR/cluster.pid
