const express = require('express');
const axios = require('axios');

const {filesUpload} = require('./filesUpload');

export const router = express.Router();
// {{API}}/webApi/api/v1/https?url=http://trangbao24h.com/wp-json/wp/v2/tags
router.get(`/`,
  async function(request: any, response: any) {
    const url = request.query.url;
    const res: any = await axios.get(url);
    const data = res.data;
    response.send(data);
  });

router.post(`/`,
  async function(request: any, response: any) {
    const url = request.query.url;
    const requestBody = request.body;

    const config: any = {
      method: 'post',
      url: url,
      data: requestBody.body
    };

    if (requestBody.headers) {
      config.headers = requestBody.headers;
    }

    // console.log('config:', config);

    try {
      const res: any = await axios(config);
      const data = res.data;
      response.send(data);
    } catch (err) {
      response.status(err.response.status).send({...err.response.data});
    }
  });


router.post(`/upload`, filesUpload, async (req: any, res: any) => {
  if (req.response.error) {
    const err = req.response.error;
    res.status(err.data.status).send({...err});
  } else {
    res.send(req.response);
  }
});
