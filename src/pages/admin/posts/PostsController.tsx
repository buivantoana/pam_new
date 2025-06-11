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
  Select,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../../service/post";
import { getAllCategories } from "../../../service/category";
import { RiUploadCloudFill } from "react-icons/ri";
import { uploadImage } from "../../../service/uploadService";
import Loading from "../../../components/Loading";

type Post = {
  _id: string;
  title: string;
  slug: string;
  type: string;
  categories: string[];
};

type Category = { _id: string; name: string; slug: string };

const PostsController = () => {
  const theme = useTheme();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile]: any = useState(null);
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
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    type: "news",
    content: "",
    summary: "",
    imageUrl: "",
    status: "draft",
    publishedAt: "",
    categories: [] as string[],
    jobDetail: { location: "", salary: "", jobType: "", deadline: "" },
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (msg: string, sev: "success" | "error" = "success") =>
    setSnackbar({ open: true, message: msg, severity: sev });

  const fetchAll = async () => {
    setLoading(true);
    console.log("toam1");
    const resCats = await getAllCategories();
    console.log("toam2", resCats);
    if (resCats && resCats.status === 0) setCategories(resCats.data);
    const resPosts = await getAllPosts();
    if (resPosts && resPosts.status === 0) setPosts(resPosts.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openAdd = () => {
    setEditPost(null);
    setForm({
      title: "",
      slug: "",
      type: "news",
      content: "",
      summary: "",
      imageUrl: "",
      status: "draft",
      publishedAt: "",
      categories: [],
      jobDetail: { location: "", salary: "", jobType: "", deadline: "" },
    });
    setModalOpen(true);
  };

  const openEdit = (p: Post) => {
    setEditPost(p);
    setImageUrl(p.imageUrl);
    setContent(p.content);
    setForm({
      ...p,
      publishedAt: p.publishedAt || "",
      jobDetail: p.jobDetail || {
        location: "",
        salary: "",
        jobType: "",
        deadline: "",
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async () => {
    setLoadingCreate(true);
    if (!form.title.trim())
      return showSnackbar("Title không được để trống", "error");
    if (file) {
      const formData: any = new FormData();
      formData.append("image", file);
      let upload: any = await uploadImage(formData);

      if (Object.keys(upload).length > 0) {
        let body = {
          ...form,
          content: content,
          imageUrl: upload.url,
        };
        console.log("body", body);
        const fn = editPost ? updatePost(editPost._id, body) : createPost(body);
        const res = await fn;
        if (res.status === 0) {
          setContent("");
          setImageUrl("");
          setFile(null);
          showSnackbar(
            editPost ? "Cập nhật thành công" : "Thêm mới thành công"
          );
          fetchAll();
          closeModal();
        } else showSnackbar(res.message || "Lỗi", "error");
      }
    } else if (!file && editPost) {
      const fn = updatePost(editPost._id, { ...form, content: content });
      const res = await fn;
      if (res.status === 0) {
        setContent("");
        setImageUrl("");
        setFile(null);
        showSnackbar(editPost ? "Cập nhật thành công" : "Thêm mới thành công");
        fetchAll();
        closeModal();
      } else showSnackbar(res.message || "Lỗi", "error");
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
    const res = await deletePost(delId);
    if (res.status === 0) {
      showSnackbar("Xóa thành công");
      fetchAll();
    } else showSnackbar(res.message || "Lỗi", "error");
    closeDump();
  };

  const changeForm = (e: React.ChangeEvent<any>) => {
    let val = e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  return (
    <>
      {loadingCreate && <Loading />}
      <Container maxWidth='xl'>
        <Typography variant='h4' mb={2}>
          Quản lý Posts
        </Typography>
        <Button variant='contained' onClick={openAdd} sx={{ mb: 2 }}>
          Thêm post
        </Button>

        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell align='right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    {loading ? "Đang tải..." : "Chưa có bài viết"}
                  </TableCell>
                </TableRow>
              )}
              {posts.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>
                    <img
                      src={p.imageUrl}
                      width={50}
                      height={50}
                      style={{ borderRadius: "5px" }}
                    />
                  </TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>
                    {p.categories
                      .map((sl) => {
                        const c = categories.find((ct) => ct.slug === sl);
                        return c?.name || sl;
                      })
                      .join(", ")}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton onClick={() => openEdit(p)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDump(p._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog maxWidth='xl' open={modalOpen} onClose={closeModal}>
          <DialogTitle>{editPost ? "Sửa Post" : "Thêm Post"}</DialogTitle>
          <DialogContent>
            <Grid container py={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='title'
                  label='Title'
                  fullWidth
                  value={form.title}
                  onChange={changeForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='slug'
                  label='Slug'
                  fullWidth
                  value={form.slug}
                  onChange={changeForm}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  name='type'
                  value={form.type}
                  fullWidth
                  onChange={changeForm}
                  displayEmpty>
                  <MenuItem value='news'>News</MenuItem>
                  <MenuItem value='job'>Job</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    name='categories'
                    value={form.categories}
                    multiple
                    onChange={changeForm}
                    label='Categories'>
                    {categories.map((c) => (
                      <MenuItem key={c._id} value={c.slug}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name='summary'
                  label='Summary'
                  fullWidth
                  multiline
                  minRows={1}
                  value={form.summary}
                  onChange={changeForm}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name='publishedAt'
                  label='Published At'
                  type='datetime-local'
                  fullWidth
                  value={form.publishedAt}
                  onChange={changeForm}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {form.type === "job" && (
                <>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>Thông tin Job</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='jobDetail.location'
                      label='Địa điểm'
                      fullWidth
                      value={form.jobDetail?.location || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          jobDetail: {
                            ...form.jobDetail,
                            location: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='jobDetail.salary'
                      label='Mức lương'
                      fullWidth
                      value={form.jobDetail?.salary || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          jobDetail: {
                            ...form.jobDetail,
                            salary: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='jobDetail.jobType'
                      label='Loại công việc'
                      fullWidth
                      value={form.jobDetail?.jobType || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          jobDetail: {
                            ...form.jobDetail,
                            jobType: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='jobDetail.deadline'
                      label='Hạn nộp'
                      type='date'
                      fullWidth
                      value={form.jobDetail?.deadline || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          jobDetail: {
                            ...form.jobDetail,
                            deadline: e.target.value,
                          },
                        })
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <div
                  className='container'
                  style={{
                    width: "50%",
                  }}>
                  <label
                    htmlFor='input-img'
                    className='preview'
                    style={{
                      border: "2px dashed  #ff5117",
                      width: "100%",
                      height: "250px",
                      color: " #ff5117",
                      fontSize: "22px",
                      position: "relative",
                      borderRadius: "6px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        width={"100%"}
                        height={"100%"}
                        style={{
                          objectFit: "contain",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        alt=''
                      />
                    ) : (
                      ""
                    )}
                    <RiUploadCloudFill size={"37px"} />
                    <Typography fontSize={"14px"}>
                      Upload to preview image
                    </Typography>
                  </label>
                  <input
                    onChange={handleImageChange}
                    type='file'
                    hidden
                    id='input-img'
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={"row"} gap={"46.5%"} mt={"10px"}>
                  <Typography fontWeight={"bold"} fontSize={"18px"}>
                    Nội dung
                  </Typography>
                  <Typography fontWeight={"bold"} fontSize={"18px"}>
                    Preview
                  </Typography>
                </Stack>
                <Box sx={{ display: "flex", gap: "20px", mt: "10px" }}>
                  <Box
                    sx={{
                      ".tox-statusbar": {
                        display: "none !important",
                      },
                      width: "50%",
                    }}>
                    <Editor
                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                      value={content}
                      onEditorChange={handleEditorChange}
                      init={{
                        plugins:
                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                        editimage_cors_hosts: ["picsum.photos"],
                        menubar:
                          "file edit view insert format tools table help",
                        toolbar:
                          "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        link_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_class_list: [
                          { title: "None", value: "" },
                          { title: "Some class", value: "class-name" },
                        ],
                        importcss_append: true,
                        file_picker_callback: (callback, value, meta) => {
                          /* Provide file and text for the link dialog */
                          if (meta.filetype === "file") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                text: "My text",
                              }
                            );
                          }

                          /* Provide image and alt text for the image dialog */
                          if (meta.filetype === "image") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                alt: "My alt text",
                              }
                            );
                          }

                          /* Provide alternative source and posted for the media dialog */
                          if (meta.filetype === "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "https://www.google.com/logos/google.jpg",
                            });
                          }
                        },

                        height: 600,
                        image_caption: true,
                        quickbars_selection_toolbar:
                          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                        noneditable_class: "mceNonEditable",
                        toolbar_mode: "sliding",
                        contextmenu: "link image table",

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      " .tox-editor-header": {
                        display: "none !important",
                      },
                      ".tox-statusbar": {
                        display: "none !important",
                      },
                      width: "50%",
                      height: "600px",
                    }}>
                    <Editor
                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                      initialValue={content}
                      init={{
                        height: "600px",
                      }}
                      disabled
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Hủy</Button>
            <Button variant='contained' onClick={handleSave}>
              {editPost ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={closeDump}>
          <DialogTitle>Xác nhận xóa bài viết?</DialogTitle>
          <DialogActions>
            <Button onClick={closeDump}>Hủy</Button>
            <Button variant='contained' color='error' onClick={handleDelete}>
              Xóa
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
              size='small'
              color='inherit'
              onClick={() => setSnackbar({ ...snackbar, open: false })}>
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        />
      </Container>
    </>
  );
};

export default PostsController;
