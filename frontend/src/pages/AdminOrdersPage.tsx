import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { IOrder, IOrderItem } from "../types/OrderItem"; 

const AdminOrdersPage = () => {
  const { allOrders, getAllOrders, updateOrderStatus } = useAuth();

  useEffect(() => {
    getAllOrders();
  }, []);


  const handleStatusChange = (orderId: string, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as string;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h3>Order Management</h3>
      <Table sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Product Image</TableCell>
            <TableCell>Product Title</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((order: IOrder, index) => (
            <TableRow key={order._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {order.orderItems.map((item: IOrderItem, idx: number) => (
                  <img key={idx} src={item.productImage} alt={item.productTitle} style={{ width: "50px", height: "50px" }} />
                ))}
              </TableCell>
              <TableCell>{order.orderItems.map((item: IOrderItem) => item.productTitle).join(', ')}</TableCell>
              <TableCell>{order.orderItems.map((item: IOrderItem) => item.quantity).join(', ')}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <Select
                  value={order.orderStatus}
                  onChange={(event) => handleStatusChange(order._id, event)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminOrdersPage;
