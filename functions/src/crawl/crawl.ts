const cors = require('cors')({origin: true});
const cheerio = require('cheerio');
const fetch = require('node-fetch');

export const crawl = (request: any, response: { send: (arg0: string) => void; }) => {
  cors(request, response, async () => {
    const {url, detail} = request.body;
    // console.log(url, 'detail:', detail);
    const {
      title,
      description,
      keywords,
      image,
      content,
      site_name
    } = detail;

    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const titleData: string = getElement($, title);
    const descriptionData: string = getElement($, description);
    const keywordsData: string = getElement($, keywords);
    const imageData: string = getElement($, image);
    const contentData: string = getElement($, content);
    const siteNameData: string = getElement($, site_name);

    const data: any = {
      title: titleData,
      description: descriptionData,
      keywords: keywordsData,
      image: imageData,
      content: contentData,
      site_name: siteNameData
    };
    // console.log(data);
    response.send(data);
  });
};


const getElement = ($: any, el: {
  type: any;
  element: any;
  query: any;
  attr: any;
  index: any;
  replace_rules: any[];
  remove_rules: any[];
}) => {
  if (!el || (el.type !== 'query' && el.element === '')) {
    return '';
  }

  let data: any;
  switch (el.type) {
    case 'attr':
      data = $(el.element).attr(el.attr);
      break;
    case 'text':
      if (el.index) {
        data = $(el.element).eq(el.index).text();
      } else {
        data = $(el.element).text();
      }
      break;
    case 'html':
      if (el.index) {
        data = $(el.element).eq(el.index).html();
      } else {
        data = $(el.element).html();
      }
      break;
    case 'query':
      data = eval(el.query);
      break;
    case 'loop_string':
      const loopArr: any = [];
      if (el.index) {
        $(el.element).eq(el.index).each(function(i: any, elem: any) {
          loopArr[i] = $(elem).text();
        });
      } else {
        $(el.element).each(function(i: any, elem: any) {
          loopArr[i] = $(elem).text();
        });
      }
      data = loopArr.join(',');

      break;
    default:
      break;
  }
  // console.log(el, data);
  if (typeof data === 'string') {
    data = data.trim();
    if (el.replace_rules && el.replace_rules.length > 0) {
      el.replace_rules.map(v => {
        data = data.replace(v.search_value, v.new_value || '');
      });
    }
    if (el.remove_rules && el.remove_rules.length > 0) {
      el.remove_rules.map(v => {
        data = removeElement(data, v);
      });
    }
  }
  return data;
};

const removeElement = (html: any, el: {
  type: any;
  element: any;
  query: any;
}) => {
  const $ = cheerio.load(html);
  switch (el.type) {
    case 'html':
      $(el.element).remove();
      break;
    case 'query':
      eval(el.query);
      break;
    default:
      break;
  }
  return $('body').html();
};
