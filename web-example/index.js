var ipfsClusterAPI = require('ipfs-cluster-api')
var ipfsAPI = require('ipfs-api');

// var ipfs = ipfsAPI({host: 'testipfs3.telosvoyager.io', port: '9095', protocol: 'http'})
// var ipfs = ipfsAPI({host: 'testipfs3.telosvoyager.io', port: '9095', protocol: 'http'})

var ipfs = ipfsAPI({host: 'testipfs3.telosvoyager.io', port: '6888', protocol: 'http'})
var ipfsCluster = ipfsClusterAPI('testipfs3.telosvoyager.io', 9094, {protocol: 'http'})

// ipfsCluster.id(function (err, identity) {
//   if (err) {
//     throw err
//   }
//   console.log(identity)
// })

// ipfsCluster.version((err, version) => {
//   if (err) {
//     throw err
//   }
//   console.log(version)
// })

// ipfsCluster.peers.ls(function (err, peers) {
//   if (err) {
//     throw err
//   }
//   console.log(peers)
// })

ipfsCluster.pin.ls(function (err, pinset) {
  if (err) {
    throw err
  }
  console.log(pinset)
})

ipfs.files.cat('QmQcHGQfmfoc72rNQvPKxB88nkt3ggYLrgsjw2jLJ7N36b', function (err, file) {
  if (err) {
    throw err
  }

  console.log(file.toString('utf8'))
})
