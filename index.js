const discURL = "https://www.amazon.com/gp/product/B08FC5L3RG";
const digitalURL = "https://www.amazon.com/dp/B08FC6MR62"

const path = require('path');

const discImg = path.join(__dirname, '/assets/disc.png');
const digitalImg = path.join(__dirname, '/assets/digital.png');


const {Builder, By, Key, until} = require('selenium-webdriver');
const notifier = require('node-notifier');
const open = require('open');
const { isContext } = require('vm');


/**
 * Scrape Amazon's listing for digital and disc version of PS5s
 * Determine inventory if element exists, such as add to cart button
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


function checkDigital() {

    sendNotification("Digital", "Add-to-Cart Element")
}

function checkDisc() {

}



// setInterval(function() {
//     let currentTime = new Date().toLocaleTimeString()

    

// }, 1000)

checkDigital()