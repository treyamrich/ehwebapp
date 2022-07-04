//Sets empty date fields for a POItem to Null or an Empty string
export function formatPOItemDate(po, setNull) {
    for(let i = 0; i < po.orderedProducts.length; i++) {
        if(setNull) {
            if(po.orderedProducts[i].receivedDate === "") {
                po.orderedProducts[i].receivedDate = null;
            }
            if(po.orderedProducts[i].goodTill === "") {
                po.orderedProducts[i].goodTill = null;
            }
        } else {
            if(po.orderedProducts[i].receivedDate === null) {
                po.orderedProducts[i].receivedDate = "";
            }
            if(po.orderedProducts[i].goodTill === null) {
                po.orderedProducts[i].goodTill = "";
            }
        } 
    }
}