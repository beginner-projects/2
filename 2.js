const puppeteer = require("puppeteer-core");

async function getBFGPrice() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Adjust this path to your Chrome installation
    });

    const page = await browser.newPage();
    const siteUrl = "https://coinmarketcap.com/currencies/betfury/";

    await page.goto(siteUrl, { waitUntil: "networkidle2" });

    const priceSelector = "#section-coin-overview > div.sc-65e7f566-0.DDohe.flexStart.alignBaseline > span";
    await page.waitForSelector(priceSelector);

    const priceText = await page.$eval(priceSelector, (el) => el.textContent);
    
    // Convert price to a number
    const price = parseFloat(priceText.replace(/[^0-9.-]/g, ''));

    if (isNaN(price)) {
      throw new Error('Price conversion error');
    }

    const myTokenBuyPrice = (price + (price * 0.05)).toFixed(5);
    const myTokenSellPrice = (price - (price * 0.05)).toFixed(5);
    console.log("BFG Price:", price, "Buy:", myTokenBuyPrice, "Sell:", myTokenSellPrice);

    await browser.close();
    return price;
  } catch (err) {
    console.log("Error fetching price:", err);
  }
}

// Fetch the price every 15 seconds
setInterval(getBFGPrice, 15000);



