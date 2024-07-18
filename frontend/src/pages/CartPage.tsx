import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { Base_URL } from "../constants/baseUrl";
import { useCart } from "../context/Cart/CartContext";



const CartPage = () => {
    const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
    const [error, setError] = useState("");

    // useEffect(() => {
    //     if(!token) {
    //         return;
    //     }

    // const fetchCart = async () => {
    //     const response = await fetch(`${Base_URL}/cart`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    //     if(!response.ok) {
    //         setError("Failed to fetch user cart. Please try again");
    //     }

    //     const data = await response.json();
    //     setcart(data);
    // };

    // fetchCart();
    // }, [token]);

    return (
    <Container sx={{ mt:2 }}>
        <Typography variant="h4">My Cart</Typography>
        {cartItems.map((item) => (
            <Box>{item.title}</Box>
        ))}
    </Container>
    ) 

};

export default CartPage;