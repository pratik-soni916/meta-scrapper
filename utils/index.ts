import { load } from "cheerio";

export const extractMetaTagsFromString = async (htmlString:string, keysList:string[]) =>  {
  const $ = load(htmlString);
  const metaTags = $('meta');
  const metaObject:Record<string,any> = {};

    metaTags.each((index, element) => {
      const nameAttribute = $(element).attr('name');
      const propertyAttribute = $(element).attr('property');

      if ((nameAttribute && keysList.includes(nameAttribute.toLowerCase())) ||
          (propertyAttribute && keysList.includes(propertyAttribute.toLowerCase()))) {
          let key;
          if (nameAttribute) {
              key = nameAttribute.replace(/^og:/, ''); // Remove "og:" prefix if present
          } else {
              key = propertyAttribute?.replace(/^og:/, ''); // Remove "og:" prefix if present
          }

          if(key){
            metaObject[key] = $(element).attr('content');
          }
      }
    });

    return metaObject;
}
