const fs = require('fs-extra');
const urls = [
    'primeicons',
    'primeng/resources'
];

async function copyFiles() {
    const third_party = './src/assets/third_party/';
    await fs.remove(third_party);

    for (const [idx, url] of urls.entries()) {
        await fs.copy('./node_modules/' + url, third_party + url);
        console.log(`copy ${idx + 1} - ${url}`);
    }

    console.log('Finished!');
}

copyFiles();
