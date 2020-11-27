import * as express from 'express';
const axios = require('axios');

export const router = express.Router();
import { fbapi } from './crawl';

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: () => void) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req: any, res: any) {
  res.send('facebook home page');
});
// define the about route
router.post('/', fbapi);

router.get(`/page`,
  async function(request: any, response: any) {
    const url = request.query.url;
    const res: any = await axios.get(url);
    const data = res.data;
    response.send(data);
  });
