import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationModal from "../components/ConfirmationModal";
import PasswordResetModal from "../components/PasswordResetModal";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";


const AdminUsersPage = () => {
  const { allUsers, getAllUsers, deleteUser, resetPassword } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleOpenDelete = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId);
    }
    handleCloseDelete();
  };

  const handleOpenReset = (userId: string) => {
    setSelectedUserId(userId);
    setOpenResetModal(true);
  };

  const handleCloseReset = () => {
    setOpenResetModal(false);
    setSelectedUserId(null);
  };

  const handleConfirmReset = (newPassword: string) => {
    if (selectedUserId) {
      resetPassword(selectedUserId, newPassword);
    }
    handleCloseReset();
  };

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
            <TableCell>Role</TableCell>
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
              <Button
                  color="primary"
                  onClick={() => handleOpenReset(user._id)}
                >
                  <LockResetOutlinedIcon/>
                </Button>
                <Button
                  color="error"
                  onClick={() => handleOpenDelete(user._id)}
                >
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user?"
      />

      <PasswordResetModal
        open={openResetModal}
        handleClose={handleCloseReset}
        handleConfirm={handleConfirmReset}
      />
    </Container>
  );
};

export default AdminUsersPage;
