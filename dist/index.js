"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const url = "https://www.hometownregister.com/sports/teutopolis-st-anthony-headed-to-iesa-state-volleyball-tournaments/article_03bba481-06b8-5f8f-9a5c-1711b1b83503.html"
const keys_list = ['author', 'keywords', 'article:publisher', 'name', 'og:section', 'og:site_name', 'og:type', 'og:image', 'og:title', 'og:url', 'og:description'];
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url)
        return res.json({ message: "No url found" }).status(404);
    const response = yield axios_1.default.get(url);
    const data = yield (0, utils_1.extractMetaTagsFromString)(response.data, keys_list);
    res.json(data).status(200);
}));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
