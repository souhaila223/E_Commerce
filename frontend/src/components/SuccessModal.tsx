import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface SuccessModalProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose, message }) => {
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
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Success
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
