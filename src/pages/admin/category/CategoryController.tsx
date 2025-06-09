import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../service/category";

// Kiểu category
type Category = {
  _id: string;
  name: string;
  slug: string;
};

const CategoryController = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Lấy danh sách category từ backend
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories(); // Thay URL đúng backend của bạn

      if (res.status === 0) {
        setCategories(res.data);
      } else {
        showSnackbar(res.message || "Lấy danh sách thất bại", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi mạng hoặc server", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  // Mở modal thêm mới
  const openAddModal = () => {
    setEditCategory(null);
    setFormData({ name: "", slug: "" });
    setModalOpen(true);
  };

  // Mở modal sửa
  const openEditModal = (category: Category) => {
    setEditCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Xử lý submit form thêm/sửa
  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.slug.trim()) {
      showSnackbar("Tên và Slug không được để trống", "error");
      return;
    }

    try {
      let res;
      if (editCategory) {
        res = await updateCategory(editCategory._id, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res.status === 0) {
        showSnackbar(
          editCategory ? "Cập nhật thành công" : "Thêm mới thành công",
          "success"
        );
        fetchCategories();
        closeModal();
      } else {
        showSnackbar(res.message || "Thao tác thất bại", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi mạng hoặc server", "error");
    }
  };

  // Mở confirm dialog xóa
  const openConfirmDelete = (id: string) => {
    setDelId(id);
    setConfirmOpen(true);
  };

  // Đóng confirm dialog
  const closeConfirm = () => {
    setConfirmOpen(false);
    setDelId(null);
  };

  // Xóa category
  const handleDelete = async () => {
    if (!delId) return;
    try {
      const res = await deleteCategory(delId);
      if (res.status === 0) {
        showSnackbar("Xóa thành công", "success");
        fetchCategories();
      } else {
        showSnackbar(res.message || "Xóa thất bại", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi mạng hoặc server", "error");
    }
    closeConfirm();
  };

  // Xử lý input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' mb={2} textAlign='center'>
        Quản lý Categories
      </Typography>

      <Button
        variant='contained'
        color='primary'
        onClick={openAddModal}
        sx={{ mb: 2 }}>
        Thêm Category
      </Button>

      <TableContainer component={Paper}>
        <Table size='small' aria-label='categories table'>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell align='right'>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  {loading ? "Đang tải..." : "Chưa có category"}
                </TableCell>
              </TableRow>
            )}

            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.slug}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => openEditModal(cat)}
                    aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => openConfirmDelete(cat._id)}
                    aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa */}
      <Dialog fullScreen={fullScreen} open={modalOpen} onClose={closeModal}>
        <DialogTitle>
          {editCategory ? "Sửa Category" : "Thêm Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='normal'
            label='Tên'
            name='name'
            value={formData.name}
            onChange={handleChange}
            fullWidth
            autoFocus
          />
          <TextField
            margin='normal'
            label='Slug'
            name='slug'
            value={formData.slug}
            onChange={handleChange}
            fullWidth
            helperText='Ví dụ: tuyen-dung'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Hủy</Button>
          <Button variant='contained' onClick={handleSubmit}>
            {editCategory ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm xóa */}
      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Xác nhận xóa?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirm}>Hủy</Button>
          <Button color='error' variant='contained' onClick={handleDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton
            size='small'
            color='inherit'
            onClick={() => setSnackbar({ ...snackbar, open: false })}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </Container>
  );
};

export default CategoryController;
