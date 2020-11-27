import * as express from 'express';
import { hook } from './paddle/subscriptions';
import { lifetime } from './paddle/lifetime';

export const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function (req, res) {
  res.send('payments home page');
});
// define the about route
router.post('/hook', hook);
router.post('/lifetime', lifetime);
