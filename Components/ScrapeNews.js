const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function scrapeNews() {
  const url = 'https://www.thepinknews.com'; // URL of the website to scrape
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const articles = [];

    $('.article-list__post-content__title').each((index, element) => {
      const headline = $(element).find('a').text().trim();
      const link = $(element).find('a').attr('href');
      const id = `article-${index + 1}`; // Generate unique ID
      articles.push({ id, headline, link });
    });

    return articles;
  } catch (error) {
    throw new Error('There was a problem with the fetch operation:', error);
  }
}

module.exports = scrapeNews;
