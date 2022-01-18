module.exports = async (page, website) => {
    const { selectors } = website
    await page.setDefaultNavigationTimeout(0);
    await page.goto(website.url)
    await page.waitForSelector(website.selectors.spamButton);
    await page.click(website.selectors.spamButton);

    const links = await page.evaluate(() => {
        const links = [];
        const MAX_ARTICLES = 5;
        const $links = document.getElementsByClassName("LimitedShowcase__LinkTracker-shopping-ui__sc-8z6sja-2 jFkuVP");
        for (const link of $links) {
            if (links.length < MAX_ARTICLES) {
                links.push(link.href)
            }
        }
        return links;
    })
    const articles = [];
    for (const link of links) {
        await page.goto(link)
        await page.waitForSelector("#__next > div.sc-fiKUBa.hiiBo > div.ProductDetails__StyledProductDetails-shopping-ui__sc-2486oi-4.cUpzjz > div.ProductDetails__Desktop-shopping-ui__sc-2486oi-1.hrHLaN > div.generalstyles__Row-shopping-ui__sc-1j7wv79-0.generalstyles__RowNoSpaceTopBottom-shopping-ui__sc-1j7wv79-1.bpeUJX.iJwYqb > div > div.PurchaseInfo__PurchaseInfoWrapper-shopping-ui__sc-1wok6te-6.gHCLee > h1");
        const articleWithoutLink = await page.evaluate(() => {
            const article = {}
            article.images = [];
            article.name = document.querySelector("h1").innerText;
            article.price = document.querySelector("#__next > div.sc-fiKUBa.hiiBo > div.ProductDetails__StyledProductDetails-shopping-ui__sc-2486oi-4.cUpzjz > div.ProductDetails__Desktop-shopping-ui__sc-2486oi-1.hrHLaN > div.generalstyles__Row-shopping-ui__sc-1j7wv79-0.generalstyles__RowNoSpaceTopBottom-shopping-ui__sc-1j7wv79-1.bpeUJX.iJwYqb > div > div.PurchaseInfo__PurchaseInfoWrapper-shopping-ui__sc-1wok6te-6.gHCLee > div.PurchaseInfo__PriceWrapper-shopping-ui__sc-1wok6te-5.bJiXdi > span").innerText;
            article.description = document.querySelector("#__next > div.sc-fiKUBa.hiiBo > div.ProductDetails__StyledProductDetails-shopping-ui__sc-2486oi-4.cUpzjz > div.ProductDetails__Desktop-shopping-ui__sc-2486oi-1.hrHLaN > div.generalstyles__Row-shopping-ui__sc-1j7wv79-0.ExtendedDescription__StyledExtendedDescription-shopping-ui__sc-19p4e3l-0.bpeUJX.eaIzFd > div > div.DescriptionText__DescriptionWrapper-shopping-ui__sc-14hdqca-0.cHlNtA > ul > li:nth-child(1) > p").innerText
            const images = document.querySelectorAll("#__next > div.sc-fiKUBa.hiiBo > div.ProductDetails__StyledProductDetails-shopping-ui__sc-2486oi-4.cUpzjz > div.ProductDetails__Desktop-shopping-ui__sc-2486oi-1.hrHLaN > div.generalstyles__Row-shopping-ui__sc-1j7wv79-0.generalstyles__RowNoSpaceTopBottom-shopping-ui__sc-1j7wv79-1.bpeUJX.iJwYqb > div > div.sliderstyles__SliderCont-shopping-ui__sc-11akmvx-0.ProductCarousel__StyledProductCarousel-shopping-ui__sc-h5s4x0-1.llKYlb.jLXpRo > div.Carousel__CarouselWrapper-shopping-ui__sc-14j4dwx-0.eyRIMp.ProductCarousel__StyledCarousel-shopping-ui__sc-h5s4x0-5.iNqmje > ul.Carousel__CarouselList-shopping-ui__sc-14j4dwx-2.UGRUF > li > img")
            for (const image of images) {
                article.images.push(image.src)
            }

            return article;
        })
        articles.push(articleWithoutLink)
    }
    const articlesComplete = articles.map((article, index) => {
        return { ...article, link: links[index] }
    })
    console.log(articlesComplete)



}