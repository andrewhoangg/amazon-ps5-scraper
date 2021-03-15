const discURL = "https://www.amazon.com/gp/product/B08FC5L3RG";
const digitalURL = "https://www.amazon.com/dp/B08FC6MR62"

const {Builder, By, Key, until} = require('selenium-webdriver');


function checkDigital() {
    driver.findElement(webdriver.By.id('test')).then(function(webElement) {
        console.log('Element exists');
    }, function(err) {
        if (err.state && err.state === 'no such element') {
            console.log('Element not found');
        } else {
            webdriver.promise.rejected(err);
        }
    });
}

function checkDisc() {

}



setInterval(function() {
    let currentTime = new Date().toLocaleTimeString()

    checkDigital()

}, 1000)