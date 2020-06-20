/**
 * Returns true if a includes any elements in b
 * @param a a string or array
 * @param b a list of objects that might be contained in 'a'
 */
export const includesAny = (aList, bList) => {
    return bList.some(b => aList.includes(b));
}

/**
 * Rep object from google civics api, along with the type of social
 * network you want extract.
 * @param rep repo object from civics api
 * @param type name of social network, for instance "facebook", "twitter", "linkedin"
 */
export const extractSocialIdFromRep = (rep, type) => {
    if(rep.channels) {
        for(let channel of rep.channels) {
            if(stringsMatch(type, channel.type))
                return channel.id;
        }    
    }
}

// case insensitive string matching
export const stringsMatch = (a, b) => {
    return a.toLowerCase() == b.toLowerCase();
}

export const makeTwitterLink = (text, hashtags) => {
    text = encodeURI(text);
    hashtags = String(hashtags);
    return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
}

export const isDevelopmentMode = window.webpackHotUpdate;

export const runIfProduction = func => {
    if(!isDevelopmentMode) func();
}
