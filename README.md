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
    "/ip4/54.153.47.228/tcp/4001/ipfs/QmYMhYeaTxXsxPaFhxNTJSdZKUvKBHwjFy71cw6cJfFcUy",
    "/ip4/54.67.52.228/tcp/4001/ipfs/QmP3nZKzhKjRWxn3AijEgTeEHyFFCs6iJobH7DQG5J2wD2"
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
