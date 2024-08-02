import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Base_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import { Product } from "../types/Product";




const ProductTable = () => {
  const { deleteProduct } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Base_URL}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenDelete = (productId: string) => {
    setSelectedProductId(productId);
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(selectedProductId);
        setSuccessMessage("Product deleted successfully");
        setOpenSuccessModal(true);
        fetchProducts(); // Re-fetch the product list after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
    handleCloseDelete();
  };

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };

  return (
    <Paper sx={{ overflow: "hidden", height: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell>{product._id}</TableCell> */}
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleOpenDelete(product._id)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />

      <SuccessModal
        open={openSuccessModal}
        handleClose={handleCloseSuccess}
        message={successMessage}
      />
    </Paper>
  );
};

export default ProductTable;
