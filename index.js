import express from "express"
import { authentication } from "./middleware/authorization.js";
import "dotenv/config.js"
import { getHtmlContent } from "./utils/scraping.js";
const app = express();

app.use(express.json())

app.post("/", authentication, async (req, res) => {
  try {

    const { url } = req.body

    if (!url) return res.json({ message: "No url found" }).status(404)
    const data = await getHtmlContent(url)

    res.send(data)
  } catch (error) {
    res.status(400).json({ error })
  }

})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
