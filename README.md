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

#### Install NodeJS
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
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

#### Change port
```
vim ~/.ipfs/config
```
```
{
  "Addresses": {
    "API": "/ip4/127.0.0.1/tcp/6001"
  }
}
```

#### Remove user sudo
`sudo deluser ipfs sudo`

#### IPFS init
```
cd ~
ipfs init
ipfs bootstrap rm --all
ipfs bootstrap add /ip4/52.52.231.62/tcp/4001/ipfs/QmbAMm6WXDVtapiv7H7kMcBVSv4CTdfgxoCtLj8dJYcd4M
```

#### Copy swarm key
```
cd ~/.ipfs
wget 'https://raw.githubusercontent.com/jhexperiment/telos-ipfs-notes/master/configs/ipfs/swarm.key'
```

#### Start daemon
```
cd ~
ipfs daemon --enable-pubsub-experiment &> ipfs.log & echo $! > ipfs.pid
```

#### ipfs.log example output
```
Initializing daemon...
Successfully raised file descriptor limit to 2048.
Swarm is limited to private network of peers with the swarm key
Swarm key fingerprint: 61d4478554db8f3a30f1b5b9aea6c295
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/172.31.23.17/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /p2p-circuit
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/172.31.23.17/tcp/4001
Swarm announcing /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/6001
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```




#### naxsi
```
sudo apt-get install build-essential libpcre3-dev libssl-dev zlib1g-dev -y
wget http://nginx.org/download/nginx-1.15.7.tar.gz
wget https://github.com/nbs-system/naxsi/archive/0.56.tar.gz -O naxsi-0.56.tar.gz
tar xvzf nginx-1.15.7.tar.gz
tar xvzf naxsi-0.56.tar.gz
cd nginx-1.15.7/
./configure --with-compat --conf-path=/etc/nginx/nginx.conf --add-dynamic-module=../naxsi-0.56/naxsi_src/ \
 --error-log-path=/var/log/nginx/error.log --http-client-body-temp-path=/var/lib/nginx/body \
 --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-log-path=/var/log/nginx/access.log \
 --http-proxy-temp-path=/var/lib/nginx/proxy --lock-path=/var/lock/nginx.lock \
 --pid-path=/var/run/nginx.pid --with-http_ssl_module \
 --without-mail_pop3_module --without-mail_smtp_module \
 --without-mail_imap_module --without-http_uwsgi_module \
 --without-http_scgi_module --prefix=/usr
```
Result:
```
  ...
  nginx path prefix: "/usr"
  nginx binary file: "/usr/sbin/nginx"
  nginx modules path: "/usr/modules"
  nginx configuration prefix: "/etc/nginx"
  nginx configuration file: "/etc/nginx/nginx.conf"
  nginx pid file: "/var/run/nginx.pid"
  nginx error log file: "/var/log/nginx/error.log"
  nginx http access log file: "/var/log/nginx/access.log"
  nginx http client request body temporary files: "/var/lib/nginx/body"
  nginx http proxy temporary files: "/var/lib/nginx/proxy"
  nginx http fastcgi temporary files: "/var/lib/nginx/fastcgi"
```
```
make modules
sudo cp objs/ngx_http_naxsi_module.so /usr/modules/
make
sudo make install
cd ~
sudo cp naxsi-0.56/naxsi_config/naxsi_core.rules /etc/nginx/
```
#### nginx config
```
sudo wget https://raw.githubusercontent.com/jhexperiment/telos-ipfs-notes/master/configs/nginx/nginx.conf -O /etc/nginx/nginx.conf
sudo wget https://raw.githubusercontent.com/jhexperiment/telos-ipfs-notes/master/configs/naxsi/ipfs.rules -O /etc/nginx/ipfs.rules
sudo wget https://raw.githubusercontent.com/jhexperiment/telos-ipfs-notes/master/configs/nginx/nginx.service -O /lib/systemd/system/nginx.service
```



#### Resources
 - https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#private-networks
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
 - https://github.com/nbs-system/naxsi
 - https://medium.com/@mycoralhealth/learn-to-securely-share-files-on-the-blockchain-with-ipfs-219ee47df54c
