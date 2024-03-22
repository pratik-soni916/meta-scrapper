import express from "express"
import axios from "axios"
import { extractMetaTagsFromString } from "./utils/index.js";
import { authentication } from "./middleware/authorization.js";
import "dotenv/config.js"
const app = express();

app.use(express.json())


// const url = "https://www.hometownregister.com/sports/teutopolis-st-anthony-headed-to-iesa-state-volleyball-tournaments/article_03bba481-06b8-5f8f-9a5c-1711b1b83503.html"
const keys_list = ['author', 'keywords', 'article:publisher', 'name', 'og:section', 'og:site_name', 'og:type', 'og:image', 'og:title', 'og:url', 'og:description']

app.post("/",authentication,async (req,res)=>{
try{

  const {url} =req.body

  if(!url) return res.json({message:"No url found"}).status(404)

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
    }
  });
  const data = await extractMetaTagsFromString(response.data,keys_list)

  res.json(data).status(200)
}catch(error){
  res.status(400).json({error})
}

})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
