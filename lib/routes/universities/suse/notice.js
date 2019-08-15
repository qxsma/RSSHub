const got = require('@/utils/got');
const cheerio = require('cheerio');
const url = require('url');
const iconv = require('iconv-lite');

const host = 'http://www.suse.edu.cn/p/10/?StId=st_app_news_search_x636053927420541815_x__x__x_0_x_0_x_0_x__x__x_';
const baseurl='http://www.suse.edu.cn/';

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: host,
        responseType: 'buffer',
    });

    const responseHtml = iconv.decode(response.data, 'gbk');
    const $ = cheerio.load(responseHtml);
    const list = $(div.div_itemtitle);

    const items = list
        .map((_,elem) => {
            const a = $('a', elem);
            return{
                link: url.resolve(baseurl, a.attr('href')),
                title: a.text(),
            };
        })
        .get();

    ctx.state.data = {
        title:'四川轻化工大学-通知公告',
        link:host,
        description:'四川轻化工大学-通知公告',
        item:items,
    };
};
