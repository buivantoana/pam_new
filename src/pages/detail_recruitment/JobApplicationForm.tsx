import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const positions = [
  "Designer",
  "Developer",
  "Marketer",
  "Content Creator",
];

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

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        maxWidth: 900,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            fullWidth
            variant="outlined"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
            InputProps={{ sx: { borderRadius: 999 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            fullWidth
            variant="outlined"
            placeholder="Địa chỉ Email"
            value={form.email}
            onChange={handleChange}
            sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
            InputProps={{ sx: { borderRadius: 999 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            fullWidth
            variant="outlined"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
            InputProps={{ sx: { borderRadius: 999 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="position"
            select
            fullWidth
            variant="outlined"
            placeholder="Vị trí ứng tuyển"
            value={form.position}
            onChange={handleChange}
            sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
            InputProps={{ sx: { borderRadius: 999 } }}
          >
            {positions.map((pos) => (
              <MenuItem key={pos} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
          hidden
            type="file"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 999, backgroundColor: "#f4f4f4" }}
            InputProps={{
              sx: { borderRadius: 999 },
              startAdornment: (
                <InputAdornment position="start">
                  <UploadFileIcon color="warning" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" textAlign={"start"} color="text.secondary">
            (Chúng tôi chấp nhận file doc, docx, pdf, xls, xlsx, png dưới 2MB)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FF6600, #FF3300)",
              borderRadius: 999,
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 16,
              mt: 1,
            }}
          >
            Ứng Tuyển Ngay
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
