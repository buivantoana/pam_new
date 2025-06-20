import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
  Container,
  Grid,
  TableFooter,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { RiUploadCloudFill } from "react-icons/ri";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../service/product";
import { uploadImage } from "../../../service/uploadService";
import Loading from "../../../components/Loading";

type Product = {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  subscribers: string;
  views: string;
  videos: string;
  socials: {
    youtube: string;
    facebook: string;
    tiktok: string;
    instagram: string;
  };
};

const ProductController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile]: any = useState(null);
  const [form, setForm] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    avatar: "",
    subscribers: "",
    views: "",
    videos: "",
    socials: {
      youtube: "",
      facebook: "",
      tiktok: "",
      instagram: "",
    },
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (msg: string, sev: "success" | "error" = "success") =>
    setSnackbar({ open: true, message: msg, severity: sev });

  const fetchAll = async () => {
    setLoading(true);
    const resProducts = await getAllProducts();
    if (resProducts && resProducts.status === 0) {
      setProducts(resProducts.data);
      setTotalProducts(resProducts.data.length); // Set total number of products
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    if (!file) return;
    setFile(file);
    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({
      _id: "",
      name: "",
      description: "",
      avatar: "",
      subscribers: "",
      views: "",
      videos: "",
      socials: {
        youtube: "",
        facebook: "",
        tiktok: "",
        instagram: "",
      },
    });
    setImageUrl("");
    setFile(null);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setImageUrl(p.avatar);
    setForm({
      ...p,
      socials: {
        youtube: p.socials.youtube || "",
        facebook: p.socials.facebook || "",
        tiktok: p.socials.tiktok || "",
        instagram: p.socials.instagram || "",
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async () => {
    setLoadingCreate(true);
    if (!form.name.trim()) {
      showSnackbar("Name cannot be empty", "error");
      setLoadingCreate(false);
      return;
    }

    let body = { ...form };

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const upload = await uploadImage(formData);
      if (upload.url) {
        body = { ...body, avatar: upload.url };
      }
    }

    const fn = editProduct ? updateProduct(editProduct._id, body) : createProduct(body);
    const res = await fn;

    if (res.status === 0) {
      setImageUrl("");
      setFile(null);
      showSnackbar(editProduct ? "Updated successfully" : "Created successfully");
      fetchAll();
      closeModal();
    } else {
      showSnackbar(res.message || "Error", "error");
    }
    setLoadingCreate(false);
  };

  const openDump = (id: string) => {
    setDelId(id);
    setConfirmOpen(true);
  };

  const closeDump = () => {
    setDelId(null);
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    if (!delId) return;
    const res = await deleteProduct(delId);
    if (res.status === 0) {
      showSnackbar("Deleted successfully");
      fetchAll();
    } else {
      showSnackbar(res.message || "Error", "error");
    }
    closeDump();
  };

  const changeForm = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name.includes("socials.")) {
      const socialField = name.split(".")[1];
      setForm({
        ...form,
        socials: { ...form.socials, [socialField]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalProducts) : 0;

  return (
    <>
      {loadingCreate && <Loading />}
      <Container maxWidth="xl">
        <Typography variant="h4" mb={2}>
          Product Management
        </Typography>
        <Button variant="contained" onClick={openAdd} sx={{ mb: 2 }}>
          Add Product
        </Button>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Subscribers</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Videos</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {loading ? "Loading..." : "No products found"}
                  </TableCell>
                </TableRow>
              )}
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      <img
                        src={p.avatar}
                        width={50}
                        height={50}
                        style={{ borderRadius: "5px" }}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{p.subscribers}</TableCell>
                    <TableCell>{p.views}</TableCell>
                    <TableCell>{p.videos}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => openEdit(p)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => openDump(p._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={totalProducts}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Dialog maxWidth="xl" open={modalOpen} onClose={closeModal}>
          <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogContent>
            <Grid container py={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={form.name}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="subscribers"
                  label="Subscribers"
                  fullWidth
                  value={form.subscribers}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="views"
                  label="Views"
                  fullWidth
                  value={form.views}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="videos"
                  label="Videos"
                  fullWidth
                  value={form.videos}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  minRows={4}
                  value={form.description}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Social Media Links</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="socials.youtube"
                  label="YouTube URL"
                  fullWidth
                  value={form.socials.youtube}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="socials.facebook"
                  label="Facebook URL"
                  fullWidth
                  value={form.socials.facebook}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="socials.tiktok"
                  label="TikTok URL"
                  fullWidth
                  value={form.socials.tiktok}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="socials.instagram"
                  label="Instagram URL"
                  fullWidth
                  value={form.socials.instagram}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  className="container"
                  style={{ width: "50%" }}
                >
                  <label
                    htmlFor="input-img"
                    className="preview"
                    style={{
                      border: "2px dashed #ff5117",
                      width: "100%",
                      height: "250px",
                      color: "#ff5117",
                      fontSize: "22px",
                      position: "relative",
                      borderRadius: "6px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: "contain",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        alt=""
                      />
                    ) : (
                      <>
                        <RiUploadCloudFill size="37px" />
                        <Typography fontSize="14px">
                          Upload to preview image
                        </Typography>
                      </>
                    )}
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    hidden
                    id="input-img"
                  />
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editProduct ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={closeDump}>
          <DialogTitle>Confirm delete product?</DialogTitle>
          <DialogActions>
            <Button onClick={closeDump}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </>
  );
};

export default ProductController;