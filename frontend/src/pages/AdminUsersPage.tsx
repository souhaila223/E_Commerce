import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationModal from "../components/ConfirmationModal";
import PasswordResetModal from "../components/PasswordResetModal";
import SuccessModal from "../components/SuccessModal";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
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
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
        setSuccessMessage("User deleted successfully");
        setOpenSuccessModal(true);
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

  const handleConfirmReset = async (newPassword: string) => {
    if (selectedUserId) {
      await resetPassword(selectedUserId, newPassword);
        setSuccessMessage("Password reset successfully");
        setOpenSuccessModal(true);
    }
    handleCloseReset();
  };

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
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
                  <LockResetOutlinedIcon />
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

      <SuccessModal
        open={openSuccessModal}
        handleClose={handleCloseSuccess}
        message={successMessage}
      />
    </Container>
  );
};

export default AdminUsersPage;
