/*
import * as express from 'express';

export const router = express.Router();
const cors = require('cors')({origin: true});
const fs = require('fs');
const fetch = require('node-fetch');
const FileType = require('file-type');
// const got = require('got');
import FormData = require('form-data');

const form = new FormData();


const hook = (request: any, response: any) => {
  cors(request, response, async () => {
    const body = request.body;
    console.log(body);

    try {
      fetch(body.url)
        .then((res: any) => res.buffer())
        .then(
          async (buf: any) => {
            const type = await FileType.fromBuffer(buf);
            // const file = new File([buf], `${Date.now()}.${type.ext}`, {type: type.mime});
            const file = fs.writeFileSync(`${Date.now()}.${type.ext}`, buf);
            console.log(file);
            return file;
          }
        )
        .then(
          async (file: any) => {
            form.append('title', 'title');
            form.append('caption', 'caption');
            form.append('file', file);
            const postRes = await fetch(`https://tanhky.com/wp-json/wp/v2/media`, {
              method: 'POST',
              body: form,
              headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGFuaGt5LmNvbSIsImlhdCI6MTYwMzQ0ODg0MywibmJmIjoxNjAzNDQ4ODQzLCJleHAiOjE2MDQwNTM2NDMsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fp9BuJHNQcPw8bd7Yr1JquXZ-gCCRg1NHfW4tu7UoLk'
              }
            });
            console.log(postRes);
            response.send(postRes);
          });
    } catch (e) {
      response.send(e);
    }


    /!*fetch(body.url)
      .then((r: any) => r.buffer())
      .then(async (buf: any) => {
        const type = await FileType.fromBuffer(buf);
        return `data:image/${type};base64,` + buf.toString('base64');
      })
      .then((b64: any) => {
        console.log(b64);
      });*!/

    // const stream = got.stream(body.url);
    // const fileType = await FileType.fromStream(stream);
    // console.log(fileType);


    // const res = await fetch(body.url).pi;
    // const fileType = await FileType.fromStream(res.body);
    //
    // console.log(fileType);

    // form.append('title', 'title');
    // form.append('caption', 'caption');
    // form.append('file', fileType);
    // const postRes = await fetch(`https://tanhky.com/wp-json/wp/v2/media`, {
    //   method: 'POST',
    //   body: form,
    //   headers: {
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGFuaGt5LmNvbSIsImlhdCI6MTYwMzQ0ODg0MywibmJmIjoxNjAzNDQ4ODQzLCJleHAiOjE2MDQwNTM2NDMsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fp9BuJHNQcPw8bd7Yr1JquXZ-gCCRg1NHfW4tu7UoLk'
    //   }
    // });
    // console.log(postRes);

    response.send(body);
  });
};


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('posts home page');
});
// define the about route
router.post('/hook', hook);
*/
