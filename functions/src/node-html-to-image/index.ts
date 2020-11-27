const express = require('express');
const puppeteer = require('puppeteer');
export const router = express.Router();

// http://localhost:5001/firetools-io/us-central1/imageServiceApi/html2image/render?url=https://google.com
router.get(`/render`,
  async function(req: any, res: any) {
    const url: any = req.query.url;
    // const width = parseInt(req.query.width) || 1024;
    // const height = parseInt(req.query.height) || 768;
    const fullPage = req.query.full
      ? req.query.full === 'true'
      : false;

    if (!url) {
      return res.send(`Invalid url: ${url}`);
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 640,
      height: req.query.height || 600,
      deviceScaleFactor: 1
    });

    const htmlString = `
<html lang="en">
<head>
    <title></title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
    <style>
    html {
      box-sizing: border-box;
      touch-action: manipulation;
      
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
    }
    
    *,
    *::before,
    *::after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
    }
    .gen-news-image-temp {
      width: 100%;
    }
    .gen-news-image-content {
      padding: 20px;
      font-size: 18px;
      color: #212121;
    }
    .gen-news-image-title {
      font-size: 24px;
      text-transform:uppercase;
      font-weight: 700;
      margin-bottom: 20px;
    }
    </style>
</head>
<body>
<img class="gen-news-image-temp" alt="" src="https://external-iad3-1.xx.fbcdn.net/safe_image.php?d=AQC2Bm-smMCNcQTR&url=https%3A%2F%2Fvtv1.mediacdn.vn%2Ffb_thumb_bn%2F2020%2F11%2F8%2Fap20313147873135-16048120100291002199522.jpg&_nc_cb=1&_nc_hash=AQApZpfdpLVWcpI2">
<div class="gen-news-image-content">
  <div class="gen-news-image-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  <div class="gen-news-image-text">Adipisci animi asperiores cum dolor doloribus enim inventore ipsam molestias numquam quasi quis quo similique sit, soluta unde ut voluptatum? Ex, voluptatem.</div>
</div>
</body>
</html>`;
    await page.setContent(htmlString);
    // await Promise.race([
    //   page.waitForNavigation({waitUntil: 'load'}),
    //   page.waitForNavigation({waitUntil: 'networkidle0'})
    // ]);

    // This option will also work with setContent that doesn't support the wait networkidle0 option
    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('img'));
      await Promise.all(selectors.map(img => {
        if (img.complete) {
          return;
        }
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }));
    });


    const screenshot = await page.screenshot({
      fullPage,
      type: 'jpeg'
    });

    await browser.close();

    return res.type('image/jpeg').send(screenshot);
  });

router.get(`/screenshot`,
  async function(req: any, res: any) {
    const url: any = req.query.url;
    const width = parseInt(req.query.width) || 1024;
    const height = parseInt(req.query.height) || 768;
    const fullPage = req.query.full
      ? req.query.full === 'true'
      : false;

    if (!url) {
      return res.send(`Invalid url: ${url}`);
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle2'});

    if (!fullPage) {
      await page.setViewport({width, height});
    }

    const screenshot = await page.screenshot({fullPage});

    await browser.close();

    return res.type('image/png').send(screenshot);
  });
