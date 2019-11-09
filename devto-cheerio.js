const cheerio = require('cheerio');
const request = require('request-promise');

const BASE_URL = 'https://dev.to/';
const USERNAME = 'grohsfabian';

(async () => {

    let response = await request(`${BASE_URL}${USERNAME}`);

    let $ = cheerio.load(response, { normalizeWhitespace: true });

    let name = $('span[itemprop="name"]').text().trim();
    let avatar = $('img[class="profile-pic"]').attr('src');
    let description = $('p[class="profile-description"]').text().trim();

    let socials = [];
    $('p[class="social"] > a').each((index, element) => {
        let url = $(element).attr('href');
        socials.push(url);
    });

    let details = {};
    $('div[class="user-metadata-details-inner"] > div').each((index, element) => {
        let key = $(element).find('.key').text().trim();
        details[key] = $(element).find('.value').text().trim();
    });

    let statistics = [];
    $('div[class="sidebar-data"] > div').each((index, element) => {
        let s = $(element).text().trim();
        statistics.push(s);
    });

    let widgets = {};

    $('div[class="user-sidebar"]').each((index, element) => {
       let header = $(element).find('header').text().trim();
        widgets[header] = $(element).find('div[class="widget-body"] > p').text().trim();
    });

    console.log(name, avatar, description, 'Socials:', socials, 'Details:', details, 'Stats:', statistics, 'Widgets:', widgets);

})();

