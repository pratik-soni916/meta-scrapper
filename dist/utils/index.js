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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetaTagsFromString = void 0;
const cheerio_1 = require("cheerio");
const extractMetaTagsFromString = (htmlString, keysList) => __awaiter(void 0, void 0, void 0, function* () {
    const $ = (0, cheerio_1.load)(htmlString);
    const metaTags = $('meta');
    const metaObject = {};
    metaTags.each((index, element) => {
        const nameAttribute = $(element).attr('name');
        const propertyAttribute = $(element).attr('property');
        if ((nameAttribute && keysList.includes(nameAttribute.toLowerCase())) ||
            (propertyAttribute && keysList.includes(propertyAttribute.toLowerCase()))) {
            let key;
            if (nameAttribute) {
                key = nameAttribute.replace(/^og:/, ''); // Remove "og:" prefix if present
            }
            else {
                key = propertyAttribute === null || propertyAttribute === void 0 ? void 0 : propertyAttribute.replace(/^og:/, ''); // Remove "og:" prefix if present
            }
            if (key) {
                metaObject[key] = $(element).attr('content');
            }
        }
    });
    return metaObject;
});
exports.extractMetaTagsFromString = extractMetaTagsFromString;
