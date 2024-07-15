import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    try {
        const products = [
            { title: "Hp Laptop", image: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/01/HP-Envy-16-07-920x613.jpg", price: 2000, stock: 12 },
            { title: "Asus Laptop", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaX6sHwIB2AsWcAkc-fzKvRhmSpNMO57KI7Q&s", price: 2100, stock: 10 },
            { title: "Dell Laptop", image: "https://www.digitaltrends.com/wp-content/uploads/2018/02/dell-xps-13-screen-lid1.jpg?fit=1500%2C1000&p=1", price: 1800, stock: 8 },
            
        ];
    
    
        const existingProduct = await getAllProducts();
    
        if(existingProduct.length === 0){
            await productModel.insertMany(products)
        }
    } catch (err) {
        console.error("Csnnot seed db", err)
    }
    

};