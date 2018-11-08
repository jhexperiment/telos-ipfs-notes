var ipfsAPI = require('ipfs-api');


var ipfs = ipfsAPI({host: 'testipfs1.telosvoyager.io', port: '6888', protocol: 'http'})

ipfs.files.cat('QmSeefmLb94Yq3bmCmeqQmjacrQmve911xcBLRPQEsfobt', function (err, file) {
  if (err) {
    throw err
  }

  console.log(file.toString('utf8'))
})
