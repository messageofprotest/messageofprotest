/**
 * Returns true if a includes any elements in b
 * @param a a string or array
 * @param b a list of objects that might be contained in 'a'
 */
export const includesAny = (aList, bList) => {
    return bList.some(b => aList.includes(b));
}