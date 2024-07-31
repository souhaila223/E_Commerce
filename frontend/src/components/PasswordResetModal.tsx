import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";


interface PasswordResetModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (newPassword: string) => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  const [newPassword, setNewPassword] = useState("");

  const onConfirm = () => {
    handleConfirm(newPassword);
    setNewPassword("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "5px",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Reset Password
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Enter the new password for the user.
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PasswordResetModal;
