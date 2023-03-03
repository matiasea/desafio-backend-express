const productKeys = ["title", "description", "code", "price", "stock", "category"]

export function validateProduct (okProduct){
    const okProductKeys = Object.keys(okProduct);
    return (
        productKeys.every((key) => okProductKeys.includes(key)) && okProductKeys.every((key) => productKeys.includes(key))
    );
}

export function validateProductPart (okProductPart){
    const okProductKeys = Object.keys(okProductPart);
    return (
        productKeys.length <= productKeys.length && productKeys.every((key) => productKeys.includes(key))
    );
}