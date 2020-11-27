const https = require('https');
const config = require('./credentials.json');

async function requestUrlFacebook(url: any) {
  return new Promise((resolve: any) => {
    const data = `image_height=144&image_width=144&uri=${encodeURIComponent(url)}&__a=1&__csr=&__req=1z&__beoa=0&__pc=PHASED%3Amessengerdotcom_pkg&__comet_req=0&fb_dtsg=${config.fb_dtsg}`;
    const options = {
      hostname: 'www.messenger.com',
      path: '/message_share_attachment/fromURI/',
      method: 'POST',
      headers: {
        'accept': '*/*',
        'authority': 'www.messenger.com',
        'origin': 'https://www.messenger.com',
        'accept-language': 'en-GB,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
        'pragma': 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'referrer': `https://www.messenger.com/t/${config.accountName}`,
        'cookie': `c_user=${config.c_user}; xs=${config.xs}; wd=1201x946`

      }
    };

    const req = https.request(options, (res: any) => {
      let data = '';
      res.on('data', (chunk: any) => {
        data += chunk;
      });

      res.on('end', () => {
        const resultParsed = JSON.parse(data.replace('for (;;);', ''));
        resolve(resultParsed);
      });

    }).on('error', (err: any) => {
      console.log('Error: ', err.message);
    });

    req.write(data);
    req.end();
  });
}

(async () => {
  const content = await requestUrlFacebook('https://datadome.co');
  console.log(content);
  // {
  //     __ar: 1,
  //         payload:
  //     {
  //         description:
  //         'The #1 SaaS bot protection software for e-commerce and classifieds ads websites. Bot detection service with unmatched speed and accuracy. Deploy in minutes.',
  //             media:
  //         {
  //             image:
  //             'https://external.fcdg2-1.fna.fbcdn.net/safe_image.php?d=AQCWUlNeWLZPsTtv&w=144&h=144&url=https%3A%2F%2Fdatadome.co%2Fwp-content%2Fuploads%2Ffeatured-image.jpg&cfs=1&_nc_cb=1&_nc_hash=AQDYnd48bPKvFNkQ',
  //                 image_size: [Object]
  //         },
  //         source: 'datadome.co',
  //             style_list: ['share', 'fallback'],
  //                 target: null,
  //                     title:
  //         'DataDome - Real-Time Bot Protection, Detection and Mitigation Solution',
  //             uri:
  //         'https://datadome.co/?attachment_canonical_url=https%3A%2F%2Fdatadome.co%2F&attachment_user_url=https%3A%2F%2Fdatadome.co%2F',
  //             share_data: { share_type: 100, share_params: [Object] }
  //     },
  //     hsrp: { hblp: { sr_revision: 1002782683, consistency: [Object] } },
  //     lid: '6880792885017226207'
  // }
})();
