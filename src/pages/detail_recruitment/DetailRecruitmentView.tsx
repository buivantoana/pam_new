import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import IPCardSection from './IPCardSection'
import JobApplicationForm from './JobApplicationForm'

type Props = {}

const DetailRecruitmentView = (props: Props) => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #fff5f0, white)' }}>

      <Container maxWidth="md" >
        <Box pt={{xs:"100px", md:"200px"}}>
          <Typography variant='h1' color='#FF6119' fontWeight={"700"} mb={3}>Chuyên viên nhân sự</Typography>
          <Typography  fontSize={{xs:"12px",md:"22px"}}>
            I. Mô tả công việc:<br />

            Vận hành công tác lương, thưởng, chế độ chính sách tại công ty<br />
            Vận hành công tác BHXH tại công ty<br />
            Vận hành và triển khai hệ thống đánh giá tại công ty<br />
            Tổng hợp, theo dõi và làm các chế độ thanh toán phát sinh<br />
            Xây dựng, ban hành và quản lý hệ thống văn bản (Quyết định, công văn, thông báo,…) tại công ty<br />
            Tổng hợp và phân tích báo cáo theo yêu cầu công việc<br />
            Các công việc khác theo yêu cầu của Trưởng Bộ Phận. <br />
            II. Yêu cầu ứng viên<br />

            Có tối thiểu 2 năm kinh nghiệm ở vị trí Chuyên viên/Nhân viên C&B hoặc tương đương.<br />
            Kỹ năng vi tính văn phòng tốt, Excel tốt<br />
            Kỹ năng phân tích, đánh giá, kiểm soát<br />
            Giao tiếp, đàm phán tốt, tỉ mỉ, chi tiết trong công việc<br />
            Nhanh nhẹn, giải quyết vấn đề tốt<br />
            Ưu tiên ứng viên đã làm trong môi trường hoặc loại hình doanh nghiệp dịch vụ về nhân sự năm sinh từ 2000 đến 1994.<br />
            III. Quyền lợi được hưởng<br />
            <br />
            Mức lương từ 10 – 12 triệu + Thưởng + phụ cấp. Tổng thu nhập từ 15 – 17 triệu/ tháng <br />
            Du lịch: 2 lần/năm (trong nước và nước ngoài)<br />
            Phụ cấp trang phục: 2.000.000 đồng/2 lần/năm<br />
            Phụ cấp đi lại: 300.000 đồng/tháng.<br />
            Phụ cấp ăn trưa: 50.000 đồng/ ngày<br />
            Phụ cấp nhà ở: 500.000 đồng/tháng <br />
            Lương tháng thứ 13, thưởng tết âm lịch<br />
            Các chế độ thưởng phúc lợi: lễ tết, sinh nhật, ốm đau, bệnh tật, hiếu, hỷ.. theo quy định của công ty: 500.000 đồng/ lần<br />
            Xét tăng lương theo quý<br />
            Tham gia BHXH đầy đủ theo quy định của nhà nước<br />
            Môi trường làm việc trẻ trung, năng động, có cơ hội thăng tiến và ổn định lâu dài
          </Typography>
        </Box>
      </Container>
      <JobApplicationForm />
      <IPCardSection />
    </Box>
  )
}

export default DetailRecruitmentView