# Amazon PS5 Web Scraper (Beta)

Scrapes the PS5 listing on Amazon.com through web requests and checks for an "Add to cart" button to verify inventory.  

## NOTE
You might get rate limited because I did not add rotating proxies support because I don't have access to any. I'll add them in the future but for now, you can change the interval at which the consoles are checked for.

## Installation

Use the package manager [npm](https://nodejs.org/en/download/current/) to install packages.

```npm
npm install
```

## Usage
Open a terminal and cd into the project directory & run
```npm
node index.js
```
to install necessary dependencies

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
