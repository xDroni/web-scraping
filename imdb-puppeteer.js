const puppeteer = require('puppeteer');

(async () => {
    let movieUrl = 'https://www.imdb.com/title/tt4332232/';

    /** @type {Browser} */
    let browser = await puppeteer.launch();

    /** @type {Page} */
    let page = await browser.newPage();

    await page.goto(movieUrl, {waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {
        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        let ratingValue = document.querySelector('div[class="ratingValue"] > strong > span').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        return {
            title,
            ratingValue,
            ratingCount,
        }
    });

    console.log(data);

    await browser.close();

})();