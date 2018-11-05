# Telos IPFS-Cluster

### Prerequisites
 - Ubuntu 18.04
 - A user account dedicated to ipfs

#### Update
```
sudo apt-get update
sudo apg-get upgrade
sudo apt-get install build-essential
```

#### User
```
sudo groupadd ipfs
sudo useradd -d /home/ipfs -g ipfs -G sudo -m -s /bin/bash ipfs
sudo passwd ipfs
su -l ipfs
```

#### Install GOLANG
```
cd ~
wget 'https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz'
sudo tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```
`vim ~/.profile`
```
  export GOPATH=$HOME/.go
  export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```
`source ~/.profile`

#### Install IPFS (go-ipfs)
```
mkdir ~/.src
cd ~/.src
wget 'https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz'
tar zxvf *.gz
cd go-ipfs
sudo ./install.sh
```


#### Install IPFS-Cluster
```
git clone https://github.com/ipfs/ipfs-cluster.git $GOPATH/src/github.com/ipfs/ipfs-cluster
cd $GOPATH/src/github.com/ipfs/ipfs-cluster
make install
```


#### IPFS init && IPFS-Cluster init
```
cd ~
ipfs init
ipfs bootstrap rm --all

ipfs-cluster-service init
```

#### Edit IPFS Config
`vim ~/.ipfs/config`
```
  "Bootstrap": [
    "/ip4/54.183.202.2/tcp/4001/ipfs/QmcKMdkDWNah9NKQWDfHXav1iq8DA5n8hCu41KHEKhzgFR",
    "/ip4/54.67.52.228/tcp/4001/ipfs/QmP3nZKzhKjRWxn3AijEgTeEHyFFCs6iJobH7DQG5J2wD2",
    "/ip4/54.153.47.228/tcp/4001/ipfs/QmYMhYeaTxXsxPaFhxNTJSdZKUvKBHwjFy71cw6cJfFcUy"
  ],
  "Addresses": {
    "Gateway": "/ip4/0.0.0.0/tcp/6888"
  }
```

#### Edit IPFS-Cluster Config
`vim ~/.ipfs-cluster/service.json`
```
  {
    "cluster": {
      "peername": "test telos cluster node",
      "secret": "2401e4a1cf19603f1934b88a408ecda151cd0fc82d6a3c63905dfe727c8840c6"
    },
    "ipfs_connector": {
      "ipfshttp": {
        "proxy_listen_multiaddress": "/ip4/0.0.0.0/tcp/9095"
      }
    }
  }
```
#### Edit IPFS-Cluster Peers
`vim ~/.ipfs-cluster/peerstore`
```
/ip4/54.183.202.2/tcp/9096/ipfs/QmTdeqpBPeq3UAAGnApeKHd9usv1Nu3DBU9kMrUZ5J3MpY
/ip4/54.67.52.228/tcp/9096/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB
/ip4/54.153.47.228/tcp/9096/ipfs/QmZyfn8RNHWaCWSq32HkHQXjjojNZykHquzBQ4xBCHTogU
```

#### Start daemons
```
cd ~/scripts
./ipfs_start.sh
./cluster_start.sh
```

#### ipfs.log
```
Initializing daemon...
Successfully raised file descriptor limit to 2048.
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/172.31.22.109/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /p2p-circuit/ipfs/QmP3nZKzhKjRWxn3AijEgTeEHyFFCs6iJobH7DQG5J2wD2
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/172.31.22.109/tcp/4001
Swarm announcing /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway (readonly) server listening on /ip4/0.0.0.0/tcp/6888
Daemon is ready
```

#### cluster.log
```
05:26:32.574  INFO    service: Initializing. For verbose output run with "-l debug". Please wait... daemon.go:43
05:26:32.579  INFO    cluster: IPFS Cluster v0.7.0+git6f72ab2e67b46f245ed0e8144b065a321d6cb9a9 listening on:
        /p2p-circuit/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB
        /ip4/127.0.0.1/tcp/9096/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB
        /ip4/172.31.22.109/tcp/9096/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB

 cluster.go:107
05:26:32.580  INFO    restapi: REST API (HTTP): /ip4/127.0.0.1/tcp/9094 restapi.go:414
05:26:32.580  INFO    restapi: REST API (libp2p-http): ENABLED. Listening on:
        /p2p-circuit/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB
        /ip4/127.0.0.1/tcp/9096/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB
        /ip4/172.31.22.109/tcp/9096/ipfs/QmNx5rEANRbePZ2s8393TzWWWAX7rUJTzg7ey4x9G5XkqB

 restapi.go:431
05:26:32.580  INFO  consensus: existing Raft state found! raft.InitPeerset will be ignored raft.go:203
05:26:32.581  INFO   ipfshttp: IPFS Proxy: /ip4/0.0.0.0/tcp/9095 -> /ip4/127.0.0.1/tcp/5001 ipfshttp.go:221
05:26:33.081  INFO  consensus: Current Raft Leader: QmZyfn8RNHWaCWSq32HkHQXjjojNZykHquzBQ4xBCHTogU raft.go:293
05:26:33.081  INFO    cluster: Cluster Peers (without including ourselves): cluster.go:403
05:26:33.081  INFO    cluster:     - QmTdeqpBPeq3UAAGnApeKHd9usv1Nu3DBU9kMrUZ5J3MpY cluster.go:410
05:26:33.081  INFO    cluster:     - QmZyfn8RNHWaCWSq32HkHQXjjojNZykHquzBQ4xBCHTogU cluster.go:410
05:26:33.081  INFO    cluster: ** IPFS Cluster is READY ** cluster.go:418
```
#### Cluster Pin List
```
ipfs@ip-172-31-17-96:~$ ipfs-cluster-ctl pin ls
QmSeefmLb94Yq3bmCmeqQmjacrQmve911xcBLRPQEsfobt |  | PIN | Repl. Factor: -1 | Allocations: [everywhere] | Recursive
```

http://testipfs3.telosvoyager.io:6888/api/v0/cat/QmSeefmLb94Yq3bmCmeqQmjacrQmve911xcBLRPQEsfobt

#### Resources
 - https://docs.ipfs.io/introduction/usage/
 - https://gateway.ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
 - https://cluster.ipfs.io/guides/quickstart/
 - https://cluster.ipfs.io/documentation/
 - https://cluster.ipfs.io/documentation/ipfs-cluster-ctl/
 - https://cluster.ipfs.io/documentation/ipfs-cluster-service/
 - https://cluster.ipfs.io/documentation/configuration/
 - https://cluster.ipfs.io/documentation/security/
 - https://cluster.ipfs.io/documentation/internals/
 - https://cluster.ipfs.io/documentation/composite-clusters/
 - https://github.com/ipfs/go-ipfs
 - https://github.com/te0d/js-ipfs-cluster-api
 - https://github.com/ipfs/js-ipfs-api
 - https://docs.ipfs.io/reference/api/http/
