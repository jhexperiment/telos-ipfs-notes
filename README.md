# Telos IPFS

### Prerequisites
 - Ubuntu 18.04
 - A user account dedicated to ipfs

#### Update
```
sudo apt-get update
sudo apg-get upgrade
```

#### User
```
sudo groupadd ipfs
sudo useradd -d /home/ipfs -g ipfs -G sudo -m -s /bin/bash ipfs
sudo passwd ipfs
su -l ipfs
```

#### Install GOLANG
- Current Stable Version: `1.11.2`
- Installing Version: `1.11`

```
cd ~
wget 'https://dl.google.com/go/go1.11.linux-amd64.tar.gz'
sudo tar -C /usr/local -xzf go1.11.linux-amd64.tar.gz
rm go1.11.linux-amd64.tar.gz
```
`vim ~/.profile`
```
  export GOPATH=$HOME/.go
  export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
  # Force usage of private network
  export LIBP2P_FORCE_PNET=1
```
`source ~/.profile`

#### Verify version
```
ipfs@ipfs-genesis:~$ go version
go version go1.11 linux/amd64
```

#### Install IPFS (go-ipfs)
- Current Stable Version: `0.4.18`
- Installing Version: `0.4.18`

```
wget 'https://dist.ipfs.io/go-ipfs/v0.4.18/go-ipfs_v0.4.18_linux-amd64.tar.gz'
tar -zxvf go-ipfs_v0.4.18_linux-amd64.tar.gz
cd go-ipfs
sudo ./install.sh
cd ~
rm -rf go-ipfs*
```
#### Verify version
```
ipfs@ipfs-genesis:~$ ipfs version
ipfs version 0.4.18
```


#### Remove user sudo
`sudo deluser ipfs sudo`

#### IPFS init
```
cd ~
ipfs init
ipfs bootstrap rm --all
```

#### Copy swarm key
```
cd ~/.ipfs
wget 'https://raw.githubusercontent.com/jhexperiment/telos-ipfs-notes/master/configs/ipfs/swarm.key'
```

#### Start daemon
```
ipfs daemon --enable-pubsub-experiment &> ipfs.log & echo $! > ipfs.pid
```

#### ipfs.log example output
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
Gateway (readonly) server listening on /ip4/0.0.0.0/tcp/8080
Daemon is ready
```

#### Clear IPFS pin set
```
ipfs pin rm QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
ipfs pin rm QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
ipfs pin rm QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv
```

#### Sync pin set
`COMING SOON`

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
 - https://github.com/ipfs/go-ipfs/blob/master/docs/config.md
