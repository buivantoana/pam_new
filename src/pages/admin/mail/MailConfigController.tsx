import React, { useEffect, useState } from "react";
import {
  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme, Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  getAllMailConfigs,
  createMailConfig,
  updateMailConfig,
  deleteMailConfig,
  setPrimaryMailConfig,
} from "../../../service/mailConfigService";
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";

type MailConfig = {
  _id?: string;
  email: string;
  description?: string;
  primary?: boolean;
};

const MailConfigController = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [data, setData] = useState<MailConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MailConfig | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MailConfig>({ email: "", description: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllMailConfigs();
      if (res.status === 0) {
        setData(res.data);
      } else {
        showSnackbar(res.message || "Không lấy được danh sách", "error");
      }
    } catch {
      showSnackbar("Lỗi server", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditItem(null);
    setFormData({ email: "", description: "" });
    setModalOpen(true);
  };

  const openEditModal = (item: MailConfig) => {
    setEditItem(item);
    setFormData({ email: item.email, description: item.description || "" });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const closeConfirm = () => {
    setConfirmOpen(false);
    setDelId(null);
  };

  const handleSubmit = async () => {
    if (!formData.email) return showSnackbar("Vui lòng nhập email", "error");

    try {
      const res = editItem
        ? await updateMailConfig(editItem._id!, formData)
        : await createMailConfig(formData);

      if (res.status === 0) {
        showSnackbar("Lưu thành công");
        fetchData();
        closeModal();
      } else {
        showSnackbar(res.message || "Thất bại", "error");
      }
    } catch {
      showSnackbar("Lỗi kết nối", "error");
    }
  };

  const handleDelete = async () => {
    if (!delId) return;
    try {
      const res = await deleteMailConfig(delId);
      if (res.status === 0) {
        showSnackbar("Xoá thành công");
        fetchData();
      } else {
        showSnackbar(res.message || "Xoá thất bại", "error");
      }
    } catch {
      showSnackbar("Lỗi mạng", "error");
    }
    closeConfirm();
  };

  const handleSetPrimary = async (id: string) => {
    try {
      const res = await setPrimaryMailConfig(id);
      if (res.status === 0) {
        showSnackbar("Đã đặt làm email chính");
        fetchData();
      } else {
        showSnackbar(res.message || "Cập nhật thất bại", "error");
      }
    } catch {
      showSnackbar("Lỗi server", "error");
    }
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h5' textAlign='center' mb={2}>Quản lý Email Nhận Hồ Sơ</Typography>

      <Button variant='contained' onClick={openAddModal} sx={{ mb: 2 }}>
        Thêm email
      </Button>

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>

              <TableCell>Chính</TableCell>
              <TableCell align='right'>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  {loading ? "Đang tải..." : "Chưa có email nào"}
                </TableCell>
              </TableRow>
            )}

            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleSetPrimary(item._id!)}>
                    {item.primary ? <RiCheckboxBlankCircleFill style={{color:"blue"}} />  :<RiCheckboxBlankCircleLine />}
                  </IconButton>
                </TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => openEditModal(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setDelId(item._id!);
                    setConfirmOpen(true);
                  }} color='error'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog fullScreen={fullScreen} open={modalOpen} onClose={closeModal}>
        <DialogTitle>{editItem ? "Sửa Email" : "Thêm Email"}</DialogTitle>
        <DialogContent >
          <TextField fullWidth label='Email' margin='normal' value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Hủy</Button>
          <Button variant='contained' onClick={handleSubmit}>
            {editItem ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm xóa */}
      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Bạn chắc chắn muốn xoá email này?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirm}>Hủy</Button>
          <Button color='error' variant='contained' onClick={handleDelete}>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton color='inherit' size='small' onClick={() => setSnackbar({ ...snackbar, open: false })}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </Container>
  );
};

export default MailConfigController;
