import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../service/uploadService";
import {
  createImage,
  getImageByName,
  updateImage,
} from "../../../service/manage_image";
import Loading from "../../../components/Loading";

// Images
import khangia1 from "../../../images/khangia1.png";
import khangia2 from "../../../images/khangia2.png";

// Reusable Dropzone
const ImageDropzone = ({ onUpload, defaultUrl }) => {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    },
  });

  const displayImage = preview || defaultUrl;

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#f5f5f5" : "#fff",
        width: "100%",
        color: "black",
        height: "100%",
      }}
    >
      <input {...getInputProps()} />
      {displayImage ? (
        <img
          src={displayImage}
          alt="preview"
          style={{ width: "100%", borderRadius: 8, height: "100%" }}
        />
      ) : (
        <Typography>Kéo ảnh vào đây hoặc click để chọn ảnh</Typography>
      )}
    </Box>
  );
};

const audienceData = [
  { title: "Trẻ em", image: null },
  { title: "Thanh thiếu niên và các thành viên trong gia đình", image: null },
  { title: "Gen Z", image: null },
];

const CooperateImageController = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      let result = await getImageByName("cooperate");
      if (result && result.status === 0) {
        setName(result.data.name);
        if (result.data.cooperate?.image1)
          setImage1(result.data.cooperate.image1);
        if (result.data.cooperate?.image2)
          setImage2(result.data.cooperate.image2);
        if (result.data.cooperate?.image3)
          setImage3(result.data.cooperate.image3);
        if (result.data.cooperate?.topImage)
          setTopImage(result.data.cooperate.topImage);
        if (result.data.cooperate?.title)
          setTitle(result.data.cooperate.title);
        if (result.data.cooperate?.description)
          setDescription(result.data.cooperate.description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const cooperate: any = {};

      // Upload image1 if it's a file
      if (image1 instanceof File) {
        const formData = new FormData();
        formData.append("image", image1);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image1 = upload.url;
      } else {
        cooperate.image1 = image1;
      }

      // Upload image2 if it's a file
      if (image2 instanceof File) {
        const formData = new FormData();
        formData.append("image", image2);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image2 = upload.url;
      } else {
        cooperate.image2 = image2;
      }

      // Upload image3 if it's a file
      if (image3 instanceof File) {
        const formData = new FormData();
        formData.append("image", image3);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image3 = upload.url;
      } else {
        cooperate.image3 = image3;
      }

      // Upload topImage if it's a file
      if (topImage instanceof File) {
        const formData = new FormData();
        formData.append("image", topImage);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.topImage = upload.url;
      } else {
        cooperate.topImage = topImage;
      }

      // Add title and description
      cooperate.title = title;
      cooperate.description = description;

      const resultBody = {
        name: "cooperate",
        cooperate,
      };

      let result;
      if (name) {
        result = await updateImage("cooperate", resultBody);
      } else {
        result = await createImage(resultBody);
      }
      if (result && result.status === 0) {
        getImage();
      }
      console.log("Body sent:", resultBody);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setLoading(false);
  };

  const updatedAudienceData = audienceData.map((item, index) =>
    index === 0 ? { ...item, image: image1 } :
    index === 1 ? { ...item, image: image2 } :
    { ...item, image: image3 }
  );

  return (
    <>
      {loading && <Loading />}
      <Container>
        <Box
          display="flex"
          my={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight="bold">
            Quản lý ảnh trang hợp tác
          </Typography>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload Dữ Liệu
          </Button>
        </Box>
        <Box
       
          sx={{
          
            width: "100%",
            
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            px: isMobile ? 0 : 2,
            py: isMobile ? 3 : 0,
          
          }}
        >
          <Box sx={{ width: "100%",  }}>
            <ImageDropzone
              onUpload={(file) => setTopImage(file)}
              defaultUrl={typeof topImage === "string" ? topImage : null}
            />
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mt: 2, backgroundColor: "#fff" }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2, backgroundColor: "#fff" }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mt: 2, color: "#fff" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#fff" }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        {/* AudienceSection */}
        <Box
          sx={{
            backgroundColor: "#fff8f6",
            py: 6,
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Floating decorative images */}
          {!isMobile && (
            <>
              <Box
                component="img"
                src={khangia1}
                alt="decor1"
                sx={{
                  position: "absolute",
                  bottom: 50,
                  left: 0,
                }}
              />
              <Box
                component="img"
                src={khangia2}
                alt="decor2"
                sx={{
                  position: "absolute",
                  top: 50,
                  left: 100,
                }}
              />
            </>
          )}

          <Typography variant={isMobile ? "h6" : "h3"} fontWeight="500" mb={4}>
            Khán giả chính của{" "}
            <span style={{ color: "#f2784b", fontStyle: "italic" }}>
              Pam-Media
            </span>
            <span style={{ color: "#f2784b" }}>✨</span>
          </Typography>

          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              {updatedAudienceData.map((audience, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: 3,
                      position: "relative",
                      height: "300px",
                    }}
                  >
                    {index === 0 && (
                      <ImageDropzone
                        onUpload={(file) => setImage1(file)}
                        defaultUrl={typeof image1 === "string" ? image1 : null}
                      />
                    )}
                    {index === 1 && (
                      <ImageDropzone
                        onUpload={(file) => setImage2(file)}
                        defaultUrl={typeof image2 === "string" ? image2 : null}
                      />
                    )}
                    {index === 2 && (
                      <ImageDropzone
                        onUpload={(file) => setImage3(file)}
                        defaultUrl={typeof image3 === "string" ? image3 : null}
                      />
                    )}
                    <CardContent
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        width: "90%",
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: "0px !important",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {audience.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default CooperateImageController;