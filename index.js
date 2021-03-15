const discURL = "https://www.amazon.com/gp/product/B08FC5L3RG";
const digitalURL = "https://www.amazon.com/dp/B08FC6MR62"

const path = require('path');

const discImg = path.join(__dirname, '/assets/disc.png');
const digitalImg = path.join(__dirname, '/assets/digital.png');

const notifier = require('node-notifier');
const open = require('open');
const cheerio = require('cheerio');

const chalk = require('chalk')

const got = require('got');



/**
 * Scrape Amazon's listing for digital and disc version of PS5s
 * Determine inventory if element exists through length of add to cart button element (0 = null, 1 = exists)
 * Once inventory is found, stop the interval loop for ~1min and re-run to check for more stock. */

function sendNotification(type, reason) { // accepts 2 params, type (disc/digital) & reason, if product found, notify end user
  notifier.notify({
    title: `(${type}) Amazon Web Scraper`,
    message: `Found PS5 inventory\nReason: ${reason}`,
    icon: (type == "Disc" ? discImg : digitalImg), // ternary operation to see what img to use from type
    wait: true
  });

  notifier.on('click', function (notifierObject, options, event) {
    open(type == "Disc" ? discURL : digitalURL);
  });
}

function output(type, status) {
  let currentTime = new Date().toLocaleTimeString()

  switch (status) {
    case "out of stock":
      console.log(`[${chalk.blue(type.toUpperCase())} | ${currentTime}]: ${chalk.red("OUT OF STOCK, RESCRAPING")}`);
      break;

      case "in stock":
        console.log(`[${chalk.green(type.toUpperCase())} | ${currentTime}]: ${chalk.green("IN STOCK, SENDING NOTIFICATION (ADD TO CART BUTTON LEN. > 0)")}`);
        sendNotification("Digital", "Add-to-Cart Element") // sends notification to user, can be clicked on to be directed 2 listing
      break;
    default:
      // conditions not met
      console.log(`[${chalk.red("ERROR")}]: Conditionals not met, please check the output method call.`)
      break;
  }
}

function checkDigital() {
  got(digitalURL).then(response => {
    const $ = cheerio.load(response.body);
    let stockStatus = $("#add-to-cart-button").length;

    console.log(stockStatus)
    (stockStatus == 0 ? output("Digital", "out of stock") : output("Digital", "in stock"));

  }).catch(err => {
    console.log(err);
  });
}

function checkDisc() {
  got(discURL).then(response => {
    const $ = cheerio.load(response.body);
    let stockStatus = $("#add-to-cart-button").length;

    (stockStatus == 0 ? output("Console", "out of stock") : output("Console", "in stock"));

  }).catch(err => {
    console.log(err);
  });
}


// main, runs on start

function main() {
  setInterval(async function () {

    checkDigital();
    //checkDisc();
  
  
  }, 5000) // retries every 5000 ms (5 secs) to prevent rate limitation by amazon 😎 (until i get rotating proxies)
}

main(); // call main to start