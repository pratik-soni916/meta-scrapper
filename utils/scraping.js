import puppeteer from "puppeteer"
import UserAgent from 'user-agents';
import { KEYS_LIST } from "./constants.js"

export const getHtmlContent = async (url) => {
    try {
        const proxyUrl = 'http://157.90.122.53:80';
        const browser = await puppeteer.launch({
            headless: true,
            // args: [`--proxy-server=${proxyUrl}`]
        })


        const page = await browser.newPage();
        if (page) {
            const userAgent = new UserAgent({ deviceCategory: 'desktop' });
            await page.setUserAgent(userAgent.toString())
        }

        await page.setDefaultNavigationTimeout(300000);
        await page.goto(url);
        const metaTags = await page.evaluate((keysList) => {
            const metaElements = document.querySelectorAll('meta');
            const metaObject = {};

            metaElements.forEach((element) => {
                const nameAttribute = element.getAttribute('name');
                const propertyAttribute = element.getAttribute('property');

                if ((nameAttribute && keysList.includes(nameAttribute.toLowerCase())) ||
                    (propertyAttribute && keysList.includes(propertyAttribute.toLowerCase()))) {
                    let key;
                    if (nameAttribute) {
                        key = nameAttribute.replace(/^og:|article:/, '');
                    } else {
                        key = propertyAttribute?.replace(/^og:|article:/, '');
                    }

                    if (key) {
                        metaObject[key] = element.getAttribute('content');
                    }
                }
            });

            return metaObject;
        }, KEYS_LIST);
        browser.close()
        return metaTags
    } catch (error) {
        return error
    }
}