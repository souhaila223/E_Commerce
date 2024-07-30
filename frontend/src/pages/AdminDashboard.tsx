import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import {
  Button,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IOrder, IOrderItem } from "../types/OrderItem";

const AdminDashboardPage = () => {
  const {
    allUsers,
    getAllUsers,
    // updateUserStatus,
    deleteUser,
    getAllOrders,
    allOrders,
    updateOrderStatus,
  } = useAuth();

  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, []);

  const handleDelete = (_id: string) => {
    deleteUser(_id);
  };

  const handleStatusChange = (
    orderId: string,
    event: SelectChangeEvent<string>
  ) => {
    const newStatus = event.target.value as string;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h3>User Management</h3>
      <Table sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Is Admin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              {/* <TableCell>{user._id}</TableCell> */}
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{String(user.isAdmin)}</TableCell>
              <TableCell>
                {/* <Button onClick={() => updateUserStatus(user.id, !user.isAdmin)}>
                  {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                </Button> */}
                <Button onClick={() => handleDelete(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3>Order Management</h3>
      <Table sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {/* <TableCell>Order ID</TableCell> */}
            <TableCell>Product Image</TableCell>
            <TableCell>Product Title</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>{index + 1}</TableCell>
              {/* <TableCell>{order._id}</TableCell> */}
              <TableCell>
                {order.orderItems.map((item: IOrderItem, index: number) => (
                  <img
                    key={index}
                    src={item.productImage}
                    alt={item.productTitle}
                    style={{ width: "50px", height: "50px" }}
                  />
                ))}
              </TableCell>
              <TableCell>
                {order.orderItems
                  .map((item: IOrderItem) => item.productTitle)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {order.orderItems
                  .map((item: IOrderItem) => item.quantity)
                  .join(", ")}
              </TableCell>
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

export default AdminDashboardPage;
