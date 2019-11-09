const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {

    let movieUrl = 'https://www.imdb.com/title/tt4332232/';

    const response = await request(movieUrl);

    const $ = cheerio.load(response);

    let title = $('div[class="title_wrapper"] > h1').text();
    let poster = $('div[class="poster"] > a > img').attr('src');
    let rating = $('div[class="ratingValue"] > strong > span').text();

    console.log(title, poster, rating);

})();