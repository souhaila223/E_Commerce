import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const AdminUsersPage = () => {
  const { allUsers, getAllUsers, deleteUser } = useAuth();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <h3>User Management</h3>
      <Table sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
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
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{String(user.isAdmin)}</TableCell>
              <TableCell>
                <Button onClick={() => deleteUser(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminUsersPage;
