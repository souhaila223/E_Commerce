import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const AdminDashboardPage = () => {
  const { allUsers, getAllUsers, deleteUser, myOrders } = useAuth();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = (_id: string) => {
    deleteUser(_id);
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
                {/* <Button onClick={() => updateUserAdminStatus(user.id, !user.isAdmin)}>
                  {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                </Button> */}
                <Button onClick={() => handleDelete(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminDashboardPage;
