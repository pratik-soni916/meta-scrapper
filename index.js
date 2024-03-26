import express from "express"
import { authentication } from "./middleware/authorization.js";
import "dotenv/config.js"
import { getHtmlContent } from "./utils/scraping.js";
import { KEYS_LIST } from "./utils/constants.js";
import axios from "axios";
import { extractMetaTagsFromString } from "./utils/index.js";
const app = express();

app.use(express.json())

app.post("/", authentication, async (req, res) => {

  const { url } = req.body

  if (!url) return res.json({ message: "No url found" }).status(404)
  // const data = await getHtmlContent(url)
  const html = await axios.get('https://app.scrapingbee.com/api/v1/', {
    params: {
      'api_key': process.env.API_KEY,
      'url': url,
    }
  })

  const data = await extractMetaTagsFromString(html.data, KEYS_LIST)
  res.json(data).status(200)

})

app.get("/health-check", (req, res) => {
  res.sendStatus(200)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
