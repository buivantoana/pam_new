import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    useTheme,
    useMediaQuery,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";

// Images
import banner from "../../../images/1fa47c58664fc06c9fc374d0ccb62914013f9d63.png";
import image1 from "../../../images/1.png";
import image2 from "../../../images/2.png";
import khangia1 from "../../../images/khangia1.png";
import khangia2 from "../../../images/khangia2.png";
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../../../service/uploadService';

const mockData = {
    homeBanner: {
        image1: 'https://res.cloudinary.com/dbmj1ajrv/image/upload/v1749611782/uploads/n9gxzkku1vnckcppvi3k.jpg',
        image2: 'https://res.cloudinary.com/dbmj1ajrv/image/upload/v1749611782/uploads/n9gxzkku1vnckcppvi3k.jpg',
        image3: 'https://res.cloudinary.com/dbmj1ajrv/image/upload/v1749611782/uploads/n9gxzkku1vnckcppvi3k.jpg',
        topImage: 'https://res.cloudinary.com/dbmj1ajrv/image/upload/v1749611782/uploads/n9gxzkku1vnckcppvi3k.jpg'
    },

};

// Reusable Dropzone
const ImageDropzone = ({ onUpload, defaultUrl }) => {
    const [preview, setPreview] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
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
                border: '2px dashed #ccc',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragActive ? '#f5f5f5' : '#fff',
                width:"100%",
                color:'black',
                height:"100%"
               
            }}>
            <input {...getInputProps()} />
            {displayImage ? (
                <img src={displayImage} alt='preview' style={{ width: '100%', borderRadius: 8 }} />
            ) : (
                <Typography>Kéo ảnh vào đây hoặc click để chọn ảnh</Typography>
            )}
           
        </Box>
    );
};
const audienceData = [
    { title: "Trẻ em", image: image1 },
    { title: "Thanh thiếu niên và các thành viên trong gia đình", image: image2 },
    { title: "Gen Z", image: null }, // Sẽ sử dụng fetchedImage
];

const CooperateImageController = (props: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [topImage, setTopImage] = useState(null);

    const handleUpload = async () => {
        try {
            const homeBanner: any = {};
            const channelSliderImages: string[] = [];

            // Upload ảnh phải nếu là file
            if (image1 instanceof File) {
                const formData = new FormData();
                formData.append("image", image1);
                const upload = await uploadImage(formData);
                if (upload?.url) homeBanner.image1 = upload.url;
            } else {
                homeBanner.image1 = image1; // giữ nguyên
            }

            // Upload ảnh trái nếu là file
            if (image2 instanceof File) {
                const formData = new FormData();
                formData.append("image", image2);
                const upload = await uploadImage(formData);
                if (upload?.url) homeBanner.image2 = upload.url;
            } else {
                homeBanner.image2 = image2; // giữ nguyên
            }

            if (image3 instanceof File) {
                const formData = new FormData();
                formData.append("image", image3);
                const upload = await uploadImage(formData);
                if (upload?.url) homeBanner.image3 = upload.url;
            } else {
                homeBanner.image3 = image3; // giữ nguyên
            }
            if (topImage instanceof File) {
                const formData = new FormData();
                formData.append("image", topImage);
                const upload = await uploadImage(formData);
                if (upload?.url) homeBanner.topImage = upload.url;
            } else {
                homeBanner.topImage = topImage; // giữ nguyên
            }




            const resultBody = {
                _id: "homeContent",
                homeBanner,
            };

            console.log("Body gửi về:", resultBody);
        } catch (error) {
            console.error("Upload thất bại:", error);
        }
    };

    // Fetch image from URL


    // Cập nhật audienceData với fetchedImage
    const updatedAudienceData = audienceData.map((item, index) =>
        index === 2 ? { ...item } : item
    );

    return (
        <Container>
            {/* BannerBrandPartners Section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "100%", md: "450px" },
                   
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
                {/* Overlay làm mờ nền */}


                {/* Nội dung */}
                <ImageDropzone
                    onUpload={(file) => setTopImage(file)}
                    defaultUrl={typeof topImage === "string" ? topImage : null}
                />
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

                <Typography
                    variant={isMobile ? "h6" : "h3"}
                    fontWeight='500'
                    mb={4}>
                    Khán giả chính của{" "}
                    <span style={{ color: "#f2784b", fontStyle: "italic" }}>Pam-Media</span>
                    <span style={{ color: "#f2784b" }}>✨</span>
                </Typography>

                <Container maxWidth='lg'>
                    <Grid container spacing={4} justifyContent='center'>
                        {updatedAudienceData.map((audience, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        boxShadow: 3,
                                        position: "relative",
                                    }}>
                                    <CardMedia
                                        component='img'
                                        image={audience.image}
                                        alt={audience.title}
                                        sx={{
                                            height: { xs: 200, md: 400 },
                                            filter: "brightness(0.6)",
                                            borderRadius: "15px",
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            position: "absolute",
                                            bottom: 20,
                                            width: "90%",
                                            color: "white",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            padding: "0px !important",
                                        }}>
                                        <Typography variant='subtitle1' fontWeight='bold'>
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
    );
};

export default CooperateImageController;