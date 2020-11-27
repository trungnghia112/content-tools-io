import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { router as routerCrawl } from './crawl';
import { router as routerHttps } from './https';
import { router as routerPayment } from './payments';
import { router as routerFacebook } from './facebook';

import { router as routerImage } from './node-html-to-image';

const app: any = express();
const main: any = express();

// main.use(cors(({ origin: '*', credentials: true, methods: 'GET' })));
app.use(cors({origin: '*', credentials: true}));
main.use(cors({origin: '*', credentials: true}));
main.use('/api/v1', app);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use('/crawl', routerCrawl);
app.use('/https', routerHttps);
app.use('/payments', routerPayment);
app.use('/facebook', routerFacebook);

const imageService: any = express();
imageService.use(cors({origin: '*', credentials: true}));
imageService.use(express.json());
imageService.use(express.urlencoded()); //Parse URL-encoded bodies
imageService.use('/html2image', routerImage);

// @ts-ignore:disable-next-line
export const webApi = functions.https.onRequest(main);

// @ts-ignore:disable-next-line
export const imageServiceApi = functions.runWith({
  timeoutSeconds: 120,
  memory: '2GB'
}).https.onRequest(imageService);


