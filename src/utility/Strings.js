//Converts a string so only the first letter is capitalized
export const firstLetterUppercase = str => {
    return `${str.substring(0,1).toUpperCase()}${str.substring(1,str.length).toLowerCase()}`;
}
//Takes objects in array and turns their .name properties into a comma delimited string
export const toNameString = arr => {
    let str = "";
    for(let i = 0; i < arr.length; i++) {
        str += arr[i].name;
        if(i !== arr.length - 1) str += ", ";
    }
    return str;
}
//Converts an array to a string delimited by commas
export function arrToString(arr) {
    let arrStr = "";
    for(let i = 0; i < arr.length; i++) {
        arrStr += arr[i];
        if(i !== arr.length - 1 && arr.length > 1)
            arr += ", ";
    }
    return arrStr;
}