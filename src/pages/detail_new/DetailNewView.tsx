import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import { motion } from "framer-motion";

import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";

type Props = {};

const dummyNews = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: "Lorem Ipsum is simply dummy text...",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "05/06/2025",
  image: img1,
}));

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DetailNewView = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
      }}>
      {/* Animate các hình vector */}
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

      <Container maxWidth='lg'>
        <Box pt={{ xs: "100px", md: "200px" }}>
          {/* Animate tiêu đề */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeSlideUp}>
            <Typography variant='h1' color='#FF6119' fontWeight={"700"} mb={3}>
              Chuyên viên nhân sự
            </Typography>
          </motion.div>

          {/* Không animation cho phần nội dung mô tả công việc */}
          <Typography fontSize={{ xs: "12px", md: "22px" }}>
            I. Mô tả công việc:
            <br />
            Vận hành công tác lương, thưởng, chế độ chính sách tại công ty
            <br />
            Vận hành công tác BHXH tại công ty
            <br />
            Vận hành và triển khai hệ thống đánh giá tại công ty
            <br />
            Tổng hợp, theo dõi và làm các chế độ thanh toán phát sinh
            <br />
            Xây dựng, ban hành và quản lý hệ thống văn bản (Quyết định, công
            văn, thông báo,…) tại công ty
            <br />
            Tổng hợp và phân tích báo cáo theo yêu cầu công việc
            <br />
            Các công việc khác theo yêu cầu của Trưởng Bộ Phận. <br />
            II. Yêu cầu ứng viên
            <br />
            Có tối thiểu 2 năm kinh nghiệm ở vị trí Chuyên viên/Nhân viên C&B
            hoặc tương đương.
            <br />
            Kỹ năng vi tính văn phòng tốt, Excel tốt
            <br />
            Kỹ năng phân tích, đánh giá, kiểm soát
            <br />
            Giao tiếp, đàm phán tốt, tỉ mỉ, chi tiết trong công việc
            <br />
            Nhanh nhẹn, giải quyết vấn đề tốt
            <br />
            Ưu tiên ứng viên đã làm trong môi trường hoặc loại hình doanh nghiệp
            dịch vụ về nhân sự năm sinh từ 2000 đến 1994.
            <br />
            III. Quyền lợi được hưởng
            <br />
            <br />
            Mức lương từ 10 – 12 triệu + Thưởng + phụ cấp. Tổng thu nhập từ 15 –
            17 triệu/ tháng <br />
            Du lịch: 2 lần/năm (trong nước và nước ngoài)
            <br />
            Phụ cấp trang phục: 2.000.000 đồng/2 lần/năm
            <br />
            Phụ cấp đi lại: 300.000 đồng/tháng.
            <br />
            Phụ cấp ăn trưa: 50.000 đồng/ ngày
            <br />
            Phụ cấp nhà ở: 500.000 đồng/tháng <br />
            Lương tháng thứ 13, thưởng tết âm lịch
            <br />
            Các chế độ thưởng phúc lợi: lễ tết, sinh nhật, ốm đau, bệnh tật,
            hiếu, hỷ.. theo quy định của công ty: 500.000 đồng/ lần
            <br />
            Xét tăng lương theo quý
            <br />
            Tham gia BHXH đầy đủ theo quy định của nhà nước
            <br />
            Môi trường làm việc trẻ trung, năng động, có cơ hội thăng tiến và ổn
            định lâu dài
          </Typography>
        </Box>

        {/* Animate phần tiêu đề bài viết liên quan */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}>
          <Typography
            variant='h5'
            fontWeight={"700"}
            my={4}
            textAlign={"center"}>
            Các bài viết liên quan
          </Typography>
        </motion.div>

        {/* Animate các Card bài viết */}
        <Grid container spacing={3}>
          {dummyNews.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeSlideUp}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    padding: "0 !important",
                  }}>
                  <CardMedia
                    component='img'
                    height='200'
                    image={item.image}
                    alt='news image'
                  />
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      fontWeight={600}
                      gutterBottom
                      noWrap>
                      {item.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ minHeight: 48 }}>
                      {item.content}
                    </Typography>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ display: "block", mt: 1 }}>
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailNewView;
