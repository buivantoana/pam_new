import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Container,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { RiCheckFill } from "react-icons/ri";

// Images for Banner
import icon_left from "../../../images/icon-left.png";
import icon_left1 from "../../../images/icon-left1.png";
import vector from "../../../images/Vector-left.png";
import icon_right from "../../../images/icon-right.png";
import icon_right1 from "../../../images/icon-right2.png";

// Images for ChannelSlider
import img1 from "../../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img2 from "../../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img3 from "../../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img4 from "../../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";

// Images for AboutSection
import AboutImage1 from "../../../images/imagereq.png";
import AboutImage2 from "../../../images/imagereq2.png";
import AboutImage3 from "../../../images/Group 1171275690.png";
import AboutImage4 from "../../../images/Group 1171275691.png";
import vector1 from "../../../images/Vectorabout1.png";
import vector2 from "../../../images/Vectorabout2.png";
import vector3 from "../../../images/khangia1.png";
import group from "../../../images/Group.png";
import { useDropzone } from "react-dropzone";
import Slider from "react-slick";
import { uploadImage } from "../../../service/uploadService";
import {
  createImage,
  getImageByName,
  updateImage,
} from "../../../service/manage_image";
import Loading from "../../../components/Loading";

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
        color: "black",
      }}>
      <input {...getInputProps()} />
      {displayImage ? (
        <img
          src={displayImage}
          alt='preview'
          style={{ width: "100%", borderRadius: 8 }}
        />
      ) : (
        <Typography>Kéo ảnh vào đây hoặc click để chọn ảnh</Typography>
      )}
    </Box>
  );
};

const SlideImageUploader = ({
  slideIndex,
  onDropImage,
  images,
  defaultUrl,
}) => {
  const onDrop = (acceptedFiles) => {
    const withPreview = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    onDropImage(slideIndex, withPreview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const displayImage = images?.[0]?.preview || images?.[0]?.url || defaultUrl;

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#f0f0f0" : "white",
      }}>
      <input {...getInputProps()} />
      <Typography variant='body2'>
        {isDragActive ? "Thả ảnh vào đây..." : "Kéo/Thả hoặc Click để chọn ảnh"}
      </Typography>

      {displayImage && (
        <Box mt={2}>
          <img
            src={displayImage}
            alt='uploaded'
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const ChannelSlider = ({ slideImages, setSlideImages, defaultUrls = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDropImageForSlide = (index, files) => {
    setSlideImages((prev) => ({
      ...prev,
      [index]: files,
    }));
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Box py={2} px={2} sx={{}}>
      <Slider {...sliderSettings}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} px={2}>
            <Typography variant='h6' textAlign='center' mb={2}>
              Slide {index + 1}
            </Typography>
            <SlideImageUploader
              slideIndex={index}
              images={slideImages[index]}
              onDropImage={handleDropImageForSlide}
              defaultUrl={defaultUrls[index]}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const RecruitmentImageController = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rightImage, setRightImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [slideImages, setSlideImages] = useState({});
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title2, setTitle2] = useState("");
  const [description, setDescription] = useState(
    ""
  );
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");

  const [description2, setDescription2] = useState(
    ""
  );
  const [description3, setDescription3] = useState(
    ""
  );
  // Load dữ liệu ban đầu
  useEffect(() => {
    getImage();
  }, []);

  let getImage = async () => {
    try {
      let result = await getImageByName("recruitment");
      if (result && result.status == 0) {
        setName(result.data.name);
        if (result.data.recruitment?.rightImage1)
          setRightImage(result.data.recruitment.rightImage1);
        if (result.data.recruitment?.leftImage2)
          setLeftImage(result.data.recruitment.leftImage2);
        if (result.data.recruitment?.title2)
          setTitle2(result.data.recruitment.title2);
          if (result.data.recruitment?.title3)
          setTitle3(result.data.recruitment.title3);
          if (result.data.recruitment?.title4)
          setTitle4(result.data.recruitment.title4);
        if (result.data.recruitment?.description)
          setDescription(result.data.recruitment.description);
          if (result.data.recruitment?.description2)
          setDescription2(result.data.recruitment.description2);
          if (result.data.recruitment?.description3)
          setDescription3(result.data.recruitment.description3);

        const mappedSlides: any = {};
        result.data.channelSliderImages?.forEach((url, index) => {
          mappedSlides[index] = url;
        });
        setSlideImages(mappedSlides);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async () => {
    setLoading(true);
    try {
      const homeBanner: any = {};
      const channelSliderImages: string[] = [];

      // Upload ảnh phải nếu là file
      if (rightImage instanceof File) {
        const formData = new FormData();
        formData.append("image", rightImage);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.rightImage1 = upload.url;
      } else {
        homeBanner.rightImage1 = rightImage; // giữ nguyên
      }

      // Upload ảnh trái nếu là file
      if (leftImage instanceof File) {
        const formData = new FormData();
        formData.append("image", leftImage);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.leftImage2 = upload.url;
      } else {
        homeBanner.leftImage2 = leftImage; // giữ nguyên
      }
      homeBanner.title2 = title2;
      homeBanner.title3 = title3;
      homeBanner.title4 = title4;
      homeBanner.description = description;
      homeBanner.description2 = description2;
      homeBanner.description3 = description3;

      for (let i = 0; i < 5; i++) {
        const slide = slideImages[i];

        // Nếu là File (được drop mới)
        if (slide && slide[0] instanceof File) {
          const formData = new FormData();
          formData.append("image", slide[0]);
          const upload = await uploadImage(formData);
          if (upload?.url) {
            channelSliderImages.push(upload.url);
          }
        } else if (typeof slide === "string") {
          // Nếu là link cũ (ban đầu load từ mockData)
          channelSliderImages.push(slide);
        } else if (slide?.[0]?.url) {
          // Nếu là object đã có url
          channelSliderImages.push(slide[0].url);
        } else {
          channelSliderImages.push("");
        }
      }

      const resultBody = {
        name: "recruitment",
        recruitment: homeBanner,
        channelSliderImages,
      };
      let result;
      if (name) {
        result = await updateImage("recruitment", resultBody);
      } else {
        result = await createImage(resultBody);
      }
      if (result && result.status == 0) {
        getImage();
      }
      console.log("Body gửi về:", resultBody);
    } catch (error) {
      console.error("Upload thất bại:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Container sx={{ width: "90%" }}>
        <Box
          display={"flex"}
          my={4}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography variant='h4' fontWeight={"bold"}>
            Quản lý ảnh trang tuyển dụng
          </Typography>
          <Button variant='contained' color='primary' onClick={handleUpload}>
            Upload Dữ Liệu
          </Button>
        </Box>
        <Box
          px={2}
          pb={2}
          textAlign='center'
          sx={{
            overflow: "hidden",
            background: "linear-gradient(to bottom, #fff5f0, white)",
          }}
          position='relative'>
          {/* Background Images */}
          <img
            src={icon_left}
            alt='Left Icon'
            style={{
              position: "absolute",
              top: isMobile ? 80 : 120,
              left: 0,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={icon_left1}
            alt='Left Icon 2'
            style={{
              position: "absolute",
              bottom: isMobile ? 80 : 20,
              left: "2vw",
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={vector}
            alt='Vector Left'
            style={{
              position: "absolute",
              bottom: isMobile ? 80 : 200,
              left: 0,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={icon_right1}
            alt='Right Icon'
            style={{
              position: "absolute",
              top: isMobile ? 80 : 100,
              right: isMobile ? -20 : 360,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={icon_right}
            alt='Right Icon 2'
            style={{
              position: "absolute",
              top: isMobile ? 80 : 350,
              right: 0,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />

          {/* Title */}

          {/* ChannelSlider Section */}
          <Container maxWidth='lg'>
          <Box sx={{ position: "relative", zIndex: 5 }}>
              <TextField
                fullWidth
                label='Title'
                value={title2}
                onChange={(e) => setTitle2(e.target.value)}
                sx={{ mx: "auto", mt: 2,mb:1,bgcolor:"white" }}
              />
            </Box>

            <Box sx={{ position: "relative", zIndex: 5 }}>
              <TextField
                fullWidth
                label='Description'
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mx: "auto", mb: 2,bgcolor:"white" }}
              />
            </Box>
            <Box >
              <ChannelSlider
                slideImages={slideImages}
                setSlideImages={setSlideImages}
                defaultUrls={
                  Object.values(slideImages) ? Object.values(slideImages) : []
                }
              />
            </Box>
            
          </Container>

          {/* Button */}
          <Box mt={2}>
            <Button
              variant='contained'
              size='large'
              sx={{
                backgroundColor: "#f26522",
                borderRadius: 999,
                px: isMobile ? 2 : 4,
                py: isMobile ? 1 : 1.5,
                fontWeight: 600,
                fontSize: isMobile ? ".8rem" : "1rem",
                boxShadow: "0 4px 14px rgba(242, 101, 34, 0.4)",
                "&:hover": {
                  backgroundColor: "#e6541b",
                },
              }}
              endIcon={<ArrowForwardIcon />}>
              Liên Hệ Ngay
            </Button>
          </Box>
        </Box>

        {/* AboutSection */}
        <Box sx={{ position: "relative", my: 10 }}>
          {/* Background Images */}
          <img
            src={vector1}
            alt='Vector 1'
            style={{
              position: "absolute",
              top: isMobile ? 80 : 200,
              right: 0,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={vector2}
            alt='Vector 2'
            style={{
              position: "absolute",
              bottom: isMobile ? 80 : 100,
              right: "5vw",
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={group}
            alt='Group'
            style={{
              position: "absolute",
              top: isMobile ? 80 : 20,
              left: "48vw",
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />
          <img
            src={vector3}
            alt='Vector 3'
            style={{
              position: "absolute",
              bottom: isMobile ? 80 : "20%",
              left: 0,
              width: isMobile ? 100 : "unset",
              display: isMobile ? "none" : "block",
            }}
          />

          <Container maxWidth='lg' sx={{ position: "relative" }}>
            <Box py={isMobile ? 2 : 8} sx={{ position: "relative" }}>
              <Grid container spacing={isMobile ? 6 : 5} alignItems='center'>
                <Grid item xs={12} md={6}>
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <TextField
                      fullWidth
                      label='Title'
                      value={title3}
                      onChange={(e) => setTitle3(e.target.value)}
                      sx={{ mx: "auto", mb: 2 }}
                    />
                  </Box>

                  <Box sx={{ position: "relative", zIndex: 2 }}>
                    <TextField
                      fullWidth
                      label='Description'
                      multiline
                      rows={4}
                      value={description2}
                      onChange={(e) => setDescription2(e.target.value)}
                      sx={{ mx: "auto", mb: 2 }}
                    />
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{
                      borderRadius: 20,
                      color: "#f26522",
                      borderColor: "#f26522",
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f26522",
                        color: "white",
                      },
                    }}
                    endIcon={<ArrowForwardIcon />}>
                    Tìm Việc Ngay
                  </Button>
                </Grid>

                <Grid item xs={12} md={6} textAlign='center'>
                  <ImageDropzone
                    onUpload={(file) => setRightImage(file)}
                    defaultUrl={
                      typeof rightImage === "string" ? rightImage : null
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  textAlign='center'
                  order={{ xs: 3, md: 2 }}>
                  <ImageDropzone
                    onUpload={(file) => setLeftImage(file)}
                    defaultUrl={
                      typeof leftImage === "string" ? leftImage : null
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <TextField
                      fullWidth
                      label='Title'
                      value={title4}
                      onChange={(e) => setTitle4(e.target.value)}
                      sx={{ mx: "auto", mb: 2 }}
                    />
                  </Box>

                  <Box sx={{ position: "relative", zIndex: 2 }}>
                    <TextField
                      fullWidth
                      label='Description'
                      multiline
                      rows={4}
                      value={description3}
                      onChange={(e) => setDescription3(e.target.value)}
                      sx={{ mx: "auto", mb: 2 }}
                    />
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{
                      borderRadius: 20,
                      color: "#f26522",
                      borderColor: "#f26522",
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f26522",
                        color: "white",
                      },
                    }}
                    endIcon={<ArrowForwardIcon />}>
                    Tham Gia Ngay
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default RecruitmentImageController;
