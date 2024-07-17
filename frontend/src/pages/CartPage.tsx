import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { Base_URL } from "../constants/baseUrl";



const CartPage = () => {
    const { token } = useAuth();
    const [cart, setcart] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        if(!token) {
            return;
        }

    const fetchCart = async () => {
        const response = await fetch(`${Base_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(!response.ok) {
            setError("Failed to fetch user cart. Please try again");
        }

        const data = await response.json();
        setcart(data);
    };

    fetchCart();
    }, [token]);

    console.log({cart});

    return (
    <Container sx={{ mt:2 }}>
        <Typography variant="h4">My Cart</Typography>
    </Container>
    ) 

};

export default CartPage;