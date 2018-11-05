#!/bin/bash
DIR=`pwd`

    if [ -f $DIR"/ipfs.pid" ]; then
        pid=$(cat $DIR"/ipfs.pid")
        echo $pid
        kill $pid
        rm -r $DIR"/ipfs.pid"

        echo -ne "Stoping IPFS Daemon"

        while true; do
            [ ! -d "/proc/$pid/fd" ] && break
            echo -ne "."
            sleep 1
        done
        echo -ne "\rIPFS Daemon stopped. \n"

    fi
