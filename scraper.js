var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, selector, callback) {
  function getItOut(html) {
    try {
      var $ = cheerio.load(html);
      var menu = $(selector);
      var content = [];
      for (var i=0; i < menu.length; i++)
        content.push($(menu[i]).text());
      return content;
    } catch(error) {
      return callback(error.message || "Scrape failed mysteriously.");
    }
  }

  request(url, function (error, response, body) {
    if (error)
      return callback(error);
    var things = getItOut(body);
    if (!things.length)
      return callback("No matching elements.");
    return callback(null, things);
  });
}
