import { db } from '../core';
import { appConfig } from '../configs/constant';

const cors = require('cors')({origin: true});
const axios = require('axios');
export const fbapi = (request: any, response: { send: (arg0: string) => void; }) => {
  cors(request, response, async () => {
    const {url, detail} = request.body;
    console.log(url, detail);

    try {
      const fbData: any = await db.collection('settings').doc('facebook').get();

      if (!fbData.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', fbData.data());
      }

      const {access_token} = fbData.data();

      const apiUrl = `${appConfig.facebook.url}/${appConfig.facebook.graphApiVersion}/2049893801902462/feed?access_token=${access_token}`;
      let fbRes = await axios.get(apiUrl);
      console.log(fbRes);
      response.send(fbRes);
    } catch (e) {
      response.send(e);
    }

  });
};
