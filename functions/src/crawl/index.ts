import * as express from 'express';
import { crawl } from './crawl';

export const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: () => void) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req: any, res: any) {
  res.send('news home page');
});
// define the about route
router.post('/', crawl);
