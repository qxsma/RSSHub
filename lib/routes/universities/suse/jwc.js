const got = require('@/utils/got');
const cheerio = require('cheerio');
const util = require('./utils');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'http://jwc.suse.edu.cn/p/0/?StId=st_app_news_search_x636149230514839073_x__x__x_0_x_0_x_0_x__x__x_',
    });

    const data = response.data;
    const $ = cheerio.load(data);
    const list = $('.item').get();

    const result = await util.ProcessFeed(list, ctx.cache);

    ctx.state.data = {
        title: '四川轻化工大学-教务信息',
        link: 'http://jwc.suse.edu.cn/p/0/?StId=st_app_news_search_x636149230514839073_x__x__x_0_x_0_x_0_x__x__x_',
        description: '四川轻化工大学-教务信息',
        item: result,
    };
};
