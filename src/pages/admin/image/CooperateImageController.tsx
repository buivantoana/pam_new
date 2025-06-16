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
      }}>
      <input {...getInputProps()} />
      {displayImage ? (
        <img
          src={displayImage}
          alt='preview'
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
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  const [image8, setImage8] = useState(null);
  const [image9, setImage9] = useState(null);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [title5, setTitle5] = useState("");
  const [title6, setTitle6] = useState("");
  const [title7, setTitle7] = useState("");
  const [title8, setTitle8] = useState("");
  const [title9, setTitle9] = useState("");
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
        if (result.data.cooperate?.image4)
          setImage4(result.data.cooperate.image4);
        if (result.data.cooperate?.image5)
          setImage5(result.data.cooperate.image5);
        if (result.data.cooperate?.image6)
          setImage6(result.data.cooperate.image6);
        if (result.data.cooperate?.image7)
          setImage7(result.data.cooperate.image7);
        if (result.data.cooperate?.image8)
          setImage8(result.data.cooperate.image8);
        if (result.data.cooperate?.image9)
          setImage9(result.data.cooperate.image9);
        if (result.data.cooperate?.topImage)
          setTopImage(result.data.cooperate.topImage);
        if (result.data.cooperate?.title) setTitle(result.data.cooperate.title);
        if (result.data.cooperate?.description)
          setDescription(result.data.cooperate.description);
        if (result.data.cooperate?.title1)
          setTitle1(result.data.cooperate.title1);
        if (result.data.cooperate?.title2)
          setTitle2(result.data.cooperate.title2);
        if (result.data.cooperate?.title3)
          setTitle3(result.data.cooperate.title3);
        if (result.data.cooperate?.title4)
          setTitle4(result.data.cooperate.title4);
        if (result.data.cooperate?.title5)
          setTitle5(result.data.cooperate.title5);
        if (result.data.cooperate?.title6)
          setTitle6(result.data.cooperate.title6);
        if (result.data.cooperate?.title7)
          setTitle7(result.data.cooperate.title7);
        if (result.data.cooperate?.title8)
          setTitle8(result.data.cooperate.title8);
        if (result.data.cooperate?.title9)
          setTitle9(result.data.cooperate.title9);
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

      if (image4 instanceof File) {
        const formData = new FormData();
        formData.append("image", image4);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image4 = upload.url;
      } else {
        cooperate.image4 = image4;
      }

      // Upload image2 if it's a file
      if (image5 instanceof File) {
        const formData = new FormData();
        formData.append("image", image5);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image5 = upload.url;
      } else {
        cooperate.image5 = image5;
      }

      // Upload image3 if it's a file
      if (image6 instanceof File) {
        const formData = new FormData();
        formData.append("image", image6);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image6 = upload.url;
      } else {
        cooperate.image6 = image6;
      }
      if (image7 instanceof File) {
        const formData = new FormData();
        formData.append("image", image7);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image7 = upload.url;
      } else {
        cooperate.image7 = image7;
      }

      // Upload image2 if it's a file
      if (image8 instanceof File) {
        const formData = new FormData();
        formData.append("image", image8);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image8 = upload.url;
      } else {
        cooperate.image8 = image8;
      }

      // Upload image3 if it's a file
      if (image9 instanceof File) {
        const formData = new FormData();
        formData.append("image", image9);
        const upload = await uploadImage(formData);
        if (upload?.url) cooperate.image9 = upload.url;
      } else {
        cooperate.image9 = image9;
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
      cooperate.title1 = title1;
      cooperate.title2 = title2;
      cooperate.title3 = title3;
      cooperate.title4 = title4;
      cooperate.title5 = title5;
      cooperate.title6 = title6;
      cooperate.title7 = title7;
      cooperate.title8 = title8;
      cooperate.title9 = title9;

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
    index === 0
      ? { ...item, image: image1 }
      : index === 1
      ? { ...item, image: image2 }
      : { ...item, image: image3 }
  );

  return (
    <>
      {loading && <Loading />}
      <Container sx={{ width: "90%" }}>
        <Box
          display='flex'
          my={4}
          justifyContent='space-between'
          alignItems='center'>
          <Typography variant='h4' fontWeight='bold'>
            Quản lý ảnh trang hợp tác
          </Typography>
          <Button variant='contained' color='primary' onClick={handleUpload}>
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
          }}>
          <Box sx={{ width: "100%" }}>
            <ImageDropzone
              onUpload={(file) => setTopImage(file)}
              defaultUrl={typeof topImage === "string" ? topImage : null}
            />
            <TextField
              fullWidth
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mt: 2, backgroundColor: "#fff" }}
            />
            <TextField
              fullWidth
              label='Description'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2, backgroundColor: "#fff" }}
            />
            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{ mt: 2, color: "#fff" }}>
              {title}
            </Typography>
            <Typography variant='body1' sx={{ mt: 1, color: "#fff" }}>
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
          }}>
          {/* Floating decorative images */}
          {!isMobile && (
            <>
              <Box
                component='img'
                src={khangia1}
                alt='decor1'
                sx={{
                  position: "absolute",
                  bottom: 50,
                  left: 0,
                }}
              />
              <Box
                component='img'
                src={khangia2}
                alt='decor2'
                sx={{
                  position: "absolute",
                  top: 50,
                  left: 100,
                }}
              />
            </>
          )}

          <Typography variant={isMobile ? "h6" : "h3"} fontWeight='500' mb={4}>
            Khán giả chính của{" "}
            <span style={{ color: "#f2784b", fontStyle: "italic" }}>
              Pam-Media
            </span>
            <span style={{ color: "#f2784b" }}>✨</span>
          </Typography>

          <Container maxWidth='lg'>
            <Grid container spacing={4} justifyContent='center'>
              {updatedAudienceData.map((audience, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,

                      boxShadow: 3,
                      position: "relative",
                    }}>
                    {index === 0 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage1(file)}
                          defaultUrl={
                            typeof image1 === "string" ? image1 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title1}
                          onChange={(e) => setTitle1(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage2(file)}
                          defaultUrl={
                            typeof image2 === "string" ? image2 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title2}
                          onChange={(e) => setTitle2(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage3(file)}
                          defaultUrl={
                            typeof image3 === "string" ? image3 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title3}
                          onChange={(e) => setTitle3(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant={isMobile ? "h6" : "h3"}
              fontWeight='500'
              mt={4}
              mb={4}>
              Nội dung hàng đầu
              <span style={{ color: "#f2784b", fontStyle: "italic" }}>
                Pam-Media
              </span>
              <span style={{ color: "#f2784b" }}>✨</span>
            </Typography>
            <Grid container spacing={4} justifyContent='center'>
              {updatedAudienceData.map((audience, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,

                      boxShadow: 3,
                      position: "relative",
                    }}>
                    {index === 0 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage4(file)}
                          defaultUrl={
                            typeof image4 === "string" ? image4 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title4}
                          onChange={(e) => setTitle4(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage5(file)}
                          defaultUrl={
                            typeof image5 === "string" ? image5 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title5}
                          onChange={(e) => setTitle5(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage6(file)}
                          defaultUrl={
                            typeof image6 === "string" ? image6 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title6}
                          onChange={(e) => setTitle6(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={4} mt={3} justifyContent='center'>
              {updatedAudienceData.map((audience, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,

                      boxShadow: 3,
                      position: "relative",
                    }}>
                    {index === 0 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage7(file)}
                          defaultUrl={
                            typeof image7 === "string" ? image7 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title7}
                          onChange={(e) => setTitle7(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage8(file)}
                          defaultUrl={
                            typeof image8 === "string" ? image8 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title8}
                          onChange={(e) => setTitle8(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <ImageDropzone
                          onUpload={(file) => setImage9(file)}
                          defaultUrl={
                            typeof image9 === "string" ? image9 : null
                          }
                        />
                        <TextField
                          fullWidth
                          label='Title'
                          value={title9}
                          onChange={(e) => setTitle9(e.target.value)}
                          sx={{
                            mt: 2,
                            backgroundColor: "#fff",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
                      </>
                    )}
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
