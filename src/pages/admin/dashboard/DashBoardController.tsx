import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import background_gif from "../../../images/source.gif";
import { Login } from "../../../service/admin";

type Props = {};

const DashBoardController = (props: Props) => {
  const theme: any = useTheme();
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [user, setUser] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const password = data.get("password") as string;

    let newErrors = { name: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.password) {
      setLoading(true);
      let body = { email: name, password };
      let result = await Login(body);
      console.log(result);
      if (result && result.status == 0) {
        toast.success("Login success");
        localStorage.setItem("token",JSON.stringify(result.data))
        setLoading(false);
        setTimeout(()=>{
          navigate("/admin/post")
        },500)
      } else {
        toast.warning("Error login");
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      {loading && <Loading />}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "white",
          zIndex: "10",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100vh"}>
          <img
            src={background_gif}
            style={{ width: "100%", height: "100%" }}
            alt=''
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            background: "rgb(246 241 241 / 82%)",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backdropFilter: "blur(40px)",
          }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ededed",
            position: "relative",
            zIndex: "100",
            width: "500px",
            borderRadius: "15px",
            padding: "20px",
          }}>
          <Typography component='h1' fontWeight={"bold"} variant='h5'>
            Đăng nhập
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <Box
              sx={{
                width: "350px",
                margin: "0 auto",
                ".search-input input": {
                  width: "100%",
                },
                ".search-input": {
                  width: "100%",
                },
              }}>
              <Typography my={"5px"} fontWeight={"500"}>
                Name
              </Typography>
              <TextField
                className='search-input'
                id='name'
                name='name'
                autoComplete='name'
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
                size='small'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: "#dddddd", // Màu viền khi không có focus
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Màu viền khi hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF3300", // Màu viền khi focused
                    },
                  },
                  fontSize: "16px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "350px",
                margin: "0 auto",
                ".search-input input": {
                  width: "100%",
                },
                ".search-input": {
                  width: "100%",
                },
              }}>
              <Typography my={"5px"} fontWeight={"500"}>
                Password
              </Typography>
              <TextField
                className='search-input'
                id='password'
                name='password'
                type='password'
                error={!!errors.password}
                helperText={errors.password}
                size='small'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: "#dddddd", // Màu viền khi không có focus
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Màu viền khi hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF3300", // Màu viền khi focused
                    },
                  },
                  fontSize: "16px",
                }}
              />
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2,  background: "linear-gradient(90deg, #FF6600, #FF3300)",
              borderRadius: 999,
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 16,
             
              minWidth: 180,
              position: "relative",}}>
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoardController;
