import { useEffect, useState } from "react";
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
      }}
    >
      <input {...getInputProps()} />
      {displayImage ? (
        <img
          src={displayImage}
          alt="preview"
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
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body2">
        {isDragActive ? "Thả ảnh vào đây..." : "Kéo/Thả hoặc Click để chọn ảnh"}
      </Typography>

      {displayImage && (
        <Box mt={2}>
          <img
            src={displayImage}
            alt="uploaded"
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
        textAlign="center"
        variant={isMobile ? "h5" : "h3"}
        fontWeight={500}
        mb={4}
      >
        Hệ thống kênh của{" "}
        <Box
          component="span"
          sx={{ fontFamily: `"Courgette", cursive` }}
          fontWeight={600}
          fontStyle="italic"
          color="#f26522"
        >
          Pam-Media
        </Box>
      </Typography>

      <Slider {...sliderSettings}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} px={2}>
            <Typography variant="h6" textAlign="center" mb={2}>
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

const Banner = ({
  bannerLeftTop,
  bannerLeftBottom,
  bannerRightTop,
  bannerRightBottom,
  
  title2,
  description,
  setBannerLeftTop,
  setBannerLeftBottom,
  setBannerRightTop,
  setBannerRightBottom,
  
  setTitle2,
  setDescription,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      px={2}
      pt={isMobile ? 13 : "200px"}
      textAlign="center"
      height="auto"
      pb={isMobile ? 3 : 5}
      sx={{
        overflow: "hidden",
       
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
     

      {/* Banner Image Uploaders */}
      <Box mb={4} sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" mb={1} fontWeight={600}>
              Banner Left Top
            </Typography>
            <ImageDropzone
              onUpload={(file) => setBannerLeftTop(file)}
              defaultUrl={typeof bannerLeftTop === "string" ? bannerLeftTop : null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" mb={1} fontWeight={600}>
              Banner Left Bottom
            </Typography>
            <ImageDropzone
              onUpload={(file) => setBannerLeftBottom(file)}
              defaultUrl={typeof bannerLeftBottom === "string" ? bannerLeftBottom : null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" mb={1} fontWeight={600}>
              Banner Right Top
            </Typography>
            <ImageDropzone
              onUpload={(file) => setBannerRightTop(file)}
              defaultUrl={typeof bannerRightTop === "string" ? bannerRightTop : null}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" mb={1} fontWeight={600}>
              Banner Right Bottom
            </Typography>
            <ImageDropzone
              onUpload={(file) => setBannerRightBottom(file)}
              defaultUrl={typeof bannerRightBottom === "string" ? bannerRightBottom : null}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Text Content */}
      

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title2}
          onChange={(e) => setTitle2(e.target.value)}
          sx={{ maxWidth: 600, mx: "auto", mb: 2 }}
        />
       
      </Box>

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ maxWidth: 600, mx: "auto", mb: 2 }}
        />
      
      </Box>

     
     

    
     
    </Box>
  );
};

const HomeController = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rightImage, setRightImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [bannerLeftTop, setBannerLeftTop] = useState(null);
  const [bannerLeftBottom, setBannerLeftBottom] = useState(null);
  const [bannerRightTop, setBannerRightTop] = useState(null);
  const [bannerRightBottom, setBannerRightBottom] = useState(null);
  const [title1, setTitle1] = useState("PAM MEDIA");
  const [title2, setTitle2] = useState("Passion Awakens <br /> Miracles");
  const [description, setDescription] = useState(
    "Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây dựng một môi trường làm việc tử tế, tích cực và gắn kết."
  );
  const [name, setName] = useState(null);
  const [slideImages, setSlideImages] = useState({});
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      let result = await getImageByName("home");
      if (result && result.status === 0) {
        setName(result.data.name);
        if (result.data.homeBanner?.rightImage1)
          setRightImage(result.data.homeBanner.rightImage1);
        if (result.data.homeBanner?.leftImage2)
          setLeftImage(result.data.homeBanner.leftImage2);
        if (result.data.homeBanner?.bannerLeftTop)
          setBannerLeftTop(result.data.homeBanner.bannerLeftTop);
        if (result.data.homeBanner?.bannerLeftBottom)
          setBannerLeftBottom(result.data.homeBanner.bannerLeftBottom);
        if (result.data.homeBanner?.bannerRightTop)
          setBannerRightTop(result.data.homeBanner.bannerRightTop);
        if (result.data.homeBanner?.bannerRightBottom)
          setBannerRightBottom(result.data.homeBanner.bannerRightBottom);
        if (result.data.homeBanner?.title1)
          setTitle1(result.data.homeBanner.title1);
        if (result.data.homeBanner?.title2)
          setTitle2(result.data.homeBanner.title2);
        if (result.data.homeBanner?.description)
          setDescription(result.data.homeBanner.description);

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

      // Upload right image if it's a file
      if (rightImage instanceof File) {
        const formData = new FormData();
        formData.append("image", rightImage);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.rightImage1 = upload.url;
      } else {
        homeBanner.rightImage1 = rightImage;
      }

      // Upload left image if it's a file
      if (leftImage instanceof File) {
        const formData = new FormData();
        formData.append("image", leftImage);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.leftImage2 = upload.url;
      } else {
        homeBanner.leftImage2 = leftImage;
      }

      // Upload banner images if they're files
      if (bannerLeftTop instanceof File) {
        const formData = new FormData();
        formData.append("image", bannerLeftTop);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.bannerLeftTop = upload.url;
      } else {
        homeBanner.bannerLeftTop = bannerLeftTop;
      }

      if (bannerLeftBottom instanceof File) {
        const formData = new FormData();
        formData.append("image", bannerLeftBottom);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.bannerLeftBottom = upload.url;
      } else {
        homeBanner.bannerLeftBottom = bannerLeftBottom;
      }

      if (bannerRightTop instanceof File) {
        const formData = new FormData();
        formData.append("image", bannerRightTop);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.bannerRightTop = upload.url;
      } else {
        homeBanner.bannerRightTop = bannerRightTop;
      }

      if (bannerRightBottom instanceof File) {
        const formData = new FormData();
        formData.append("image", bannerRightBottom);
        const upload = await uploadImage(formData);
        if (upload?.url) homeBanner.bannerRightBottom = upload.url;
      } else {
        homeBanner.bannerRightBottom = bannerRightBottom;
      }

      // Add text fields to homeBanner
      homeBanner.title2 = title2;
      homeBanner.description = description;

      // Upload slide images
      for (let i = 0; i < 5; i++) {
        const slide = slideImages[i];

        if (slide && slide[0] instanceof File) {
          const formData = new FormData();
          formData.append("image", slide[0]);
          const upload = await uploadImage(formData);
          if (upload?.url) {
            channelSliderImages.push(upload.url);
          }
        } else if (typeof slide === "string") {
          channelSliderImages.push(slide);
        } else if (slide?.[0]?.url) {
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
      if (result && result.status === 0) {
        getImage();
      }
      console.log("Body sent:", resultBody);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Container maxWidth="lg" sx={{ background: "white", py: 3 }}>
        <Box
          display="flex"
          my={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight="bold">
            Quản lý ảnh trang chủ
          </Typography>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload Dữ Liệu
          </Button>
        </Box>

        {/* Banner Component */}
        <Banner
          bannerLeftTop={bannerLeftTop }
          bannerLeftBottom={bannerLeftBottom }
          bannerRightTop={bannerRightTop }
          bannerRightBottom={bannerRightBottom }
          title1={title1}
          title2={title2}
          description={description}
          setBannerLeftTop={setBannerLeftTop}
          setBannerLeftBottom={setBannerLeftBottom}
          setBannerRightTop={setBannerRightTop}
          setBannerRightBottom={setBannerRightBottom}
          setTitle1={setTitle1}
          setTitle2={setTitle2}
          setDescription={setDescription}
        />

        <Box sx={{ position: "relative" }}>
          <Container maxWidth="lg" sx={{ position: "relative" }}>
            <Box py={isMobile ? 2 : 8}>
              <Grid container spacing={isMobile ? 6 : 5} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box mb={2} width="60%">
                    <img src={AboutImage3} width="100%" />
                  </Box>
                  <Typography color="textSecondary" mb={3}>
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
                  <Button
                    variant="outlined"
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
                    endIcon={<ArrowForwardIcon />}
                  >
                    Liên Hệ Ngay
                  </Button>
                </Grid>

                <Grid item xs={12} md={6} textAlign="center">
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
                  textAlign="center"
                  order={{ xs: 3, md: 2 }}
                >
                  <ImageDropzone
                    onUpload={(file) => setLeftImage(file)}
                    defaultUrl={
                      typeof leftImage === "string" ? leftImage : null
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
                  <Box mb={2} width="60%">
                    <img src={AboutImage4} width="100%" />
                  </Box>
                  <Typography color="textSecondary" mb={3}>
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
                  <Button
                    variant="outlined"
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
                    endIcon={<ArrowForwardIcon />}
                  >
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