export const calculatePriceAndCount = (items) =>{
    const totalPrice = items.reduce((sum, obj) => sum + obj.price*obj.count, 0);
    const totalCount = items.reduce((sum, obj) => obj.count+sum, 0)
    return {
        totalPrice,
        totalCount
    }
 }