export const copyDict = (dict) => {
    let copy = {};
    for (let key in dict)
        copy[key] = dict[key];
    return copy;
}