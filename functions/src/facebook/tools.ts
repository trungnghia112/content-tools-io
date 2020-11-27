const axios = require('axios');

(async () => {
  try {
    const access_token = 'EAAAAZAw4FxQIBAEIrGJKfgftzyMV0zb4zIlJ1usaPFzI5O1w5elwrZB5gqU1IBbmciaPAyUmmD2bwHZCN8H3yy71Y7STSugAylTjC4B9ypZAcDyC52oBHDl2l2IwOwB4KxLWQV4l0j4C88RFZBGxNdjY0FQhX9zy5ya1m7wzj3PIPDZB6a6PFl9bIPeoEIjq4ZD';
    // const apiUrl = `${appConfig.facebook.url}/${appConfig.facebook.graphApiVersion}/2049893801902462/feed?access_token=${access_token}`;
    const apiUrl = `https://graph.facebook.com/v9.0/2049893801902462/feed?access_token=${access_token}`;

    let res = await axios.get(apiUrl);
    console.log(res);
  } catch (e) {
    console.log(e);
  }

})();
