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