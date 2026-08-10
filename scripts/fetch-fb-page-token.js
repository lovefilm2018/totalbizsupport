import https from 'https';

const userToken = 'EAAT9dJ4m67cBSMlrZBceQRJZAqZAnk4enB9aRR4r3oaTk2UPFs2jx4HQ0riqTjQhRoHDKAM732wAwVJ1uOGvEskSk4S96K3o0BaxZADcURarXKn98X9CiZANlfRoNkBcPG2PV7QWaaQdZARZCGPV5ZBdndE6XX6asObyLC0z2v5d2eWDCH1UD8TtafqxiUBNoI2Kwv6WWKZCgmyfs2JtXd1eexjYuyw8AxwahkAyyKnSR5RXw1kfIZB3GfadtAZALsGYj5wdNlABypsdtxRS6IC0ZCi1BOWh8RBrunEmY2iC';

https.get(`https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== FACEBOOK ME/ACCOUNTS RESULT ===');
    console.log(data);
  });
});
