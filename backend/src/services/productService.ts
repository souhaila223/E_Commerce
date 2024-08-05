import productModel from "../models/productModel";
import { IProduct } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};


export const addProduct = async (product: IProduct) => {
  const newProduct = new productModel(product);
  return await newProduct.save();
};


export const updateProductStock = async (productId: string, stock: number) => {
  return await productModel.findByIdAndUpdate(productId, { stock }, { new: true });
};


export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Hp",
        image:
          "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/01/HP-Envy-16-07-920x613.jpg",
        price: 2000,
        stock: 12,
      },
      {
        title: "Asus",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaX6sHwIB2AsWcAkc-fzKvRhmSpNMO57KI7Q&s",
        price: 2100,
        stock: 10,
      },
      {
        title: "Dell",
        image:
          "https://www.digitaltrends.com/wp-content/uploads/2018/02/dell-xps-13-screen-lid1.jpg?fit=1500%2C1000&p=1",
        price: 1800,
        stock: 8,
      },
      {
        title: "Apple",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXhlrfDX9pa7KMdVigSJbeySyieUrX2bq_g&s",
        price: 3000,
        stock: 6,
      },
      {
        title: "Accer",
        image:
          "https://cdn.uc.assets.prezly.com/b81d27f7-536c-4ba5-8485-a501014d7380/-/preview/1000x1000/-/format/auto/SP-01.png",
        price: 2400,
        stock: 14,
      },
      {
        title: "Huawei",
        image:
          "https://cdn.vox-cdn.com/thumbor/JXchU0-8sKt-lyCyx4wrgjR7Wgg=/0x0:2040x1360/2400x1356/filters:focal(1040x1068:1041x1069)/cdn.vox-cdn.com/uploads/chorus_asset/file/22908079/akrales_211005_4788_0095.jpg",
        price: 1700,
        stock: 5,
      },
    ];

    for (const product of products) {
      const existingProduct = await productModel.findOne({
        title: product.title,
      });
      if (!existingProduct) {
        await productModel.create(product);
      }
    }
  } catch (err) {
    console.error("Cannot seed db", err);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return { statusCode: 404, data: "Product not found" };
    }
    return { statusCode: 200, data: "Product deleted successfully" };
  } catch (err) {
    console.error("Error deleting product:", err);
    return { statusCode: 500, data: "Something went wrong!" };
  }
};
