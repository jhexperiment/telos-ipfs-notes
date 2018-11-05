#!/bin/bash
DIR=`pwd`

    if [ -f $DIR"/cluster.pid" ]; then
        pid=$(cat $DIR"/cluster.pid")
        echo $pid
        kill $pid
        rm -r $DIR"/cluster.pid"

        echo -ne "Stoping IPFS Cluster Daemon"

        while true; do
            [ ! -d "/proc/$pid/fd" ] && break
            echo -ne "."
            sleep 1
        done
        echo -ne "\rIPFS Cluster Daemon stopped. \n"

    fi
