import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { submitJobApplication } from "../../service/contact";

const positions = [
  "Chuyên viên nhân sự",
  "Dựng phim/Video Editor",
  "Chuyên viên kế toán",
  "Biên kịch",
  "Diễn hoạt 2D Animation",
  "Quản trị kênh",
  "Đạo cụ (DIY/Handmade)",
];

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  },
});

export default function JobApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    file: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.position || !form.file) {
      toast.error("Vui lòng điền đầy đủ thông tin và đính kèm file!");
      return;
    }
    setLoading(true);
    try {
      const res = await submitJobApplication(form);
      toast.success("Ứng tuyển thành công!");
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Gửi ứng tuyển thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}>
      <Box
        sx={{
          px: 2,
          py: 4,
          maxWidth: 900,
          mx: "auto",
          textAlign: "center",
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <motion.div variants={fadeInUp(0)}>
              <TextField
                name='name'
                fullWidth
                variant='outlined'
                placeholder='Họ và tên'
                value={form.name}
                onChange={handleChange}
                sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
                InputProps={{ sx: { borderRadius: 999 } }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div variants={fadeInUp(0.1)}>
              <TextField
                name='email'
                fullWidth
                variant='outlined'
                placeholder='Địa chỉ Email'
                value={form.email}
                onChange={handleChange}
                sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
                InputProps={{ sx: { borderRadius: 999 } }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div variants={fadeInUp(0.2)}>
              <TextField
                name='phone'
                fullWidth
                variant='outlined'
                placeholder='Số điện thoại'
                value={form.phone}
                onChange={handleChange}
                sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
                InputProps={{ sx: { borderRadius: 999 } }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div variants={fadeInUp(0.3)}>
              <TextField
                name='position'
                select
                fullWidth
                variant='outlined'
                placeholder='Vị trí ứng tuyển'
                onChange={handleChange}
                sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
                InputProps={{ sx: { borderRadius: 999 } }}>
                {positions.map((pos) => (
                  <MenuItem key={pos} value={pos}>
                    {pos}
                  </MenuItem>
                ))}
              </TextField>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={fadeInUp(0.4)}>
              <TextField
                type='file'
                onChange={handleFileChange}
                fullWidth
                variant='outlined'
                sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
                InputProps={{
                  sx: { borderRadius: 999 },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <UploadFileIcon color='warning' />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={fadeInUp(0.5)}>
              <Typography
                variant='body1'
                textAlign={"start"}
                color='text.secondary'>
                (Chúng tôi chấp nhận file doc, docx, pdf, xls, xlsx, png dưới
                2MB)
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div variants={fadeInUp(0.6)}>
              <Button
                onClick={handleSubmit}
                variant='contained'
                disabled={loading}
                sx={{
                  background: "linear-gradient(90deg, #FF6600, #FF3300)",
                  borderRadius: 999,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: 16,
                  mt: 1,
                  minWidth: 180,
                  position: "relative",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Ứng Tuyển Ngay"
                )}
              </Button>

            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}