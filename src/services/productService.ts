import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    const products = [
        { title: "Hp Laptop", image: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/01/HP-Envy-16-07-920x613.jpg", price: 1200, stock: 8 },
         { title: "Laptop", image: "image2.jpg", price: 20, stock: 80 }
        // { title: "Product 3", image: "image3.jpg", price: 15, stock: 50 },
        // { title: "Product 4", image: "image4.jpg", price: 25, stock: 70 },
        // { title: "Product 5", image: "image5.jpg", price: 5, stock: 90 },
        // { title: "Product 6", image: "image6.jpg", price: 30, stock: 60 },
        // { title: "Product 7", image: "image7.jpg", price: 35, stock: 40 },
        // { title: "Product 8", image: "image8.jpg", price: 40, stock: 30 },
        // { title: "Product 9", image: "image9.jpg", price: 45, stock: 20 },
        // { title: "Product 10", image: "image10.jpg", price: 50, stock: 10 },
    ];


    const existingProduct = await getAllProducts();

    if(existingProduct.length === 0){
        await productModel.insertMany(products)
    }

};