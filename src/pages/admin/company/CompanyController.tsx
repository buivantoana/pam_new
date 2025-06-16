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
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../../service/company";

// Kiểu dữ liệu Company
type Company = {
  name: string;
  address: string;
  email: string;
  phone: string;
  primary: boolean;
  copyrightYear?: number;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
  };
};

const CompanyController = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    primary: false,
    socialLinks: {
      instagram: "",
      facebook: "",
      tiktok: "",
      linkedin: "",
      youtube: "",
    },
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

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await getAllCompanies();
      if (res.status === 0) {
        setCompanies(res.data);
      } else {
        showSnackbar(res.message || "Lỗi khi lấy danh sách", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi server", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const openAddModal = () => {
    setEditCompany(null);
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      primary: false,
      socialLinks: {
        instagram: "",
        facebook: "",
        tiktok: "",
        linkedin: "",
        youtube: "",
      },
    });
    setModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setEditCompany(company);
    setFormData({
      name: company.name,
      address: company.address,
      email: company.email,
      phone: company.phone,
      primary: company.primary,
      socialLinks: {
        instagram: company.socialLinks?.instagram || "",
        facebook: company.socialLinks?.facebook || "",
        tiktok: company.socialLinks?.tiktok || "",
        linkedin: company.socialLinks?.linkedin || "",
        youtube: company.socialLinks?.youtube || "",
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    const { name, address, email, phone } = formData;
    if (!name || !address || !email || !phone) {
      showSnackbar("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    try {
      let res;
      if (editCompany) {
        res = await updateCompany(editCompany._id, formData);
      } else {
        res = await createCompany(formData);
      }

      if (res.status === 0) {
        showSnackbar("Lưu thành công", "success");
        fetchCompanies();
        closeModal();
      } else {
        showSnackbar(res.message || "Thao tác thất bại", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi mạng hoặc server", "error");
    }
  };

  const openConfirmDelete = (id: string) => {
    setDelId(id);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setDelId(null);
  };

  const handleDelete = async () => {
    if (!delId) return;
    try {
      const res = await deleteCompany(delId);
      if (res.status === 0) {
        showSnackbar("Xoá thành công", "success");
        fetchCompanies();
      } else {
        showSnackbar(res.message || "Xoá thất bại", "error");
      }
    } catch (error) {
      showSnackbar("Lỗi mạng hoặc server", "error");
    }
    closeConfirm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' mb={2} textAlign='center'>
        Quản lý Công ty
      </Typography>

     {companies.length === 0&& <Button variant='contained' onClick={openAddModal} sx={{ mb: 2 }}>
        Thêm công ty
      </Button>}

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Điện thoại</TableCell>
              <TableCell>Chính</TableCell>
              <TableCell align='right'>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  {loading ? "Đang tải..." : "Chưa có công ty"}
                </TableCell>
              </TableRow>
            )}

            {companies.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>
                  <Checkbox checked={c.primary} disabled />
                </TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => openEditModal(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openConfirmDelete(c._id)} color='error'>
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
        <DialogTitle>{editCompany ? "Sửa Công ty" : "Thêm Công ty"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin='normal' label='Tên' name='name' value={formData.name} onChange={handleChange} />
          <TextField fullWidth margin='normal' label='Địa chỉ' name='address' value={formData.address} onChange={handleChange} />
          <TextField fullWidth margin='normal' label='Email' name='email' value={formData.email} onChange={handleChange} />
          <TextField fullWidth margin='normal' label='Điện thoại' name='phone' value={formData.phone} onChange={handleChange} />
          <Typography variant='subtitle2' mt={2}>Mạng xã hội</Typography>
          {["facebook", "instagram", "tiktok", "linkedin", "youtube"].map((key) => (
            <TextField
              key={key}
              fullWidth
              margin='normal'
              label={key}
              name={key}
              value={(formData.socialLinks as any)[key]}
              onChange={handleChange}
            />
          ))}
          <Box mt={2}>
            <Checkbox
              checked={formData.primary}
              onChange={(e) => setFormData({ ...formData, primary: e.target.checked })}
            />
            Đặt làm công ty chính
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Hủy</Button>
          <Button variant='contained' onClick={handleSubmit}>
            {editCompany ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm xóa */}
      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Bạn chắc chắn muốn xóa công ty này?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirm}>Hủy</Button>
          <Button color='error' variant='contained' onClick={handleDelete}>
            Xóa
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

export default CompanyController;
