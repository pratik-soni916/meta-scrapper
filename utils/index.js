import { load } from "cheerio";

export const extractMetaTagsFromString = async (htmlString, keysList) => {
  const $ = load(htmlString);
  const metaTags = $('meta');
  const metaObject = {};

  metaTags.each((index, element) => {
    const nameAttribute = $(element).attr('name');
    const propertyAttribute = $(element).attr('property');

    if ((nameAttribute && keysList.includes(nameAttribute.toLowerCase())) ||
      (propertyAttribute && keysList.includes(propertyAttribute.toLowerCase()))) {
      let key;
      if (nameAttribute) {
        key = nameAttribute.replace(/^og:|article:/, '');
      } else {
        key = propertyAttribute?.replace(/^og:|article:/, '');
      }

      if (key) {
        metaObject[key] = $(element).attr('content');
      }
    }
  });

  return metaObject;
}
