import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

interface StockUpdateModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (newStock: number) => void;
  initialStock: number;
  currentStock: number;
}

const StockUpdateModal: React.FC<StockUpdateModalProps> = ({
  open,
  handleClose,
  handleConfirm,
  initialStock,
}) => {
  const [newStock, setNewStock] = useState<number>(initialStock);

  const onConfirm = () => {
    handleConfirm(newStock);
    handleClose();
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
        <Typography variant="h6" component="h2">
          Update Stock
        </Typography>
        <TextField
          fullWidth
          type="number"
          label="New Stock"
          variant="outlined"
          value={newStock}
          onChange={(e) => setNewStock(Number(e.target.value))}
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

export default StockUpdateModal;
