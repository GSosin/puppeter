const puppeteer = require("puppeteer");
const websites = require("./websites.json");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    for (const website of websites) {
        const scriptPath = path.join(__dirname, "scripts", website.scriptName);
        require(scriptPath)(page, website);
    }
})();