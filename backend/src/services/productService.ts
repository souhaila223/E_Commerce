import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    try {
        const products = [
            { title: "Hp Laptop", image: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/01/HP-Envy-16-07-920x613.jpg", price: 1200, stock: 8 },
             { title: "Laptop", image: "image2.jpg", price: 20, stock: 80 }
        ];
    
    
        const existingProduct = await getAllProducts();
    
        if(existingProduct.length === 0){
            await productModel.insertMany(products)
        }
    } catch (err) {
        console.error("Csnnot seed db", err)
    }
    

};