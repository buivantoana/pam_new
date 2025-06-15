import { Box } from "@mui/material";
import React from "react";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";
import { motion } from "framer-motion";

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const ContactView = (props: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
        paddingTop: isMobile ? "150px" : "180px",
      }}>
      <motion.img
        src={vector2}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "50%",
          left: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector1}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "5%",
          left: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector4}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "10%",
          right: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector5}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "70%",
          right: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}>
        <Typography
          variant={isMobile ? "h2" : "h1"}
          textAlign={"center"}
          color='#FF6119'
          fontWeight={"700"}
          mb={3}>
          Liên hệ qua Email
        </Typography>
      </motion.div>
      <JobApplicationForm />
    </Box>
  );
};

export default ContactView;
import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
function JobApplicationForm() {
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

  const handleSubmit = () => {
    console.log(form);
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
                sx={{
                  background: "linear-gradient(90deg, #FF6600, #FF3300)",
                  borderRadius: 999,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: 16,
                  mt: 1,
                }}>
                Ứng Tuyển Ngay
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
