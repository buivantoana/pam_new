import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDropzone } from "react-dropzone";
import Slider from "react-slick";
import AboutImage3 from "../../../images/Group 1171275685.png";
import AboutImage4 from "../../../images/Header.png";
import { uploadImage } from "../../../service/uploadService";
import {
  createImage,
  getImageByName,
  updateImage,
} from "../../../service/manage_image";
import Loading from "../../../components/Loading";

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
    <Box py={6} px={2} sx={{ backgroundColor: "#fff" }}>
      <Typography
        textAlign='center'
        variant={isMobile ? "h5" : "h3"}
        fontWeight={500}
        mb={4}>
        Hệ thống kênh của{" "}
        <Box
          component='span'
          sx={{ fontFamily: `"Courgette", cursive` }}
          fontWeight={600}
          fontStyle='italic'
          color='#f26522'>
          Pam-Media
        </Box>
      </Typography>

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

const HomeController = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rightImage, setRightImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [name, setName] = useState(null);
  const [slideImages, setSlideImages] = useState({});
  const [loading, setLoading] = useState(false);
  // Load dữ liệu ban đầu
  useEffect(() => {
    getImage();
  }, []);

  let getImage = async () => {
    try {
      let result = await getImageByName("home");
      if (result && result.status == 0) {
        setName(result.data.name);
        if (result.data.homeBanner?.rightImage1)
          setRightImage(result.data.homeBanner.rightImage1);
        if (result.data.homeBanner?.leftImage2)
          setLeftImage(result.data.homeBanner.leftImage2);

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
  console.log("slideImages", slideImages);
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

      // Upload ảnh slide
      // Upload ảnh slide
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
        name: "home",
        homeBanner,
        channelSliderImages,
      };
      let result;
      if (name) {
        result = await updateImage("home", resultBody);
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
      <Container maxWidth='lg' sx={{ background: "white", py: 3 }}>
        <Box
          display={"flex"}
          my={3}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography variant='h4' fontWeight={"bold"}>
            Quản lý ảnh trang chủ
          </Typography>
          <Button variant='contained' color='primary' onClick={handleUpload}>
            Upload Dữ Liệu
          </Button>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Container maxWidth='lg' sx={{ position: "relative" }}>
            <Box py={isMobile ? 2 : 8}>
              <Grid container spacing={isMobile ? 6 : 5} alignItems='center'>
                <Grid item xs={12} md={6}>
                  <Box mb={2} width='60%'>
                    <img src={AboutImage3} width={"100%"} />
                  </Box>
                  <Typography color='textSecondary' mb={3}>
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
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
                    Liên Hệ Ngay
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
                  <Box mb={2} width='60%'>
                    <img src={AboutImage4} width={"100%"} />
                  </Box>
                  <Typography color='textSecondary' mb={3}>
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
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
                    Liên Hệ Ngay
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        <ChannelSlider
          slideImages={slideImages}
          setSlideImages={setSlideImages}
          defaultUrls={
            Object.values(slideImages) ? Object.values(slideImages) : []
          }
        />
      </Container>
    </>
  );
};

export default HomeController;
