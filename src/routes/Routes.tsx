import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import LayoutWebsite from "../components/layouts/LayoutWebsite";

import PrivateRouter from "../components/PrivateRouter";
import NotFound from "../components/NotFound";

import DashBoardController from "../pages/admin/dashboard/DashBoardController";
import LayoutAdmin from "../components/layouts/LayoutAdmin";
import HomeComtroller from "../pages/home/HomeComtroller";
import CooperateController from "../pages/cooperate/CooperateController";
import RecruitmentController from "../pages/recruitment/RecruitmentController";
import DetailRecruitmentController from "../pages/detail_recruitment/DetailRecruitmentController";
import NewsController from "../pages/news/NewsController";
import DetailNewController from "../pages/detail_new/DetailNewController";
import ChanelController from "../pages/chanel/ChanelController";
import ScrollToTop from "../components/ScrollToTop";
import CategoryController from "../pages/admin/category/CategoryController";
import PostsController from "../pages/admin/posts/PostsController";
import ImageFetcher from "../pages/admin/image/HomeController";
import HomeController from "../pages/admin/image/HomeController";
import RecruitmentImageController from "../pages/admin/image/RecruitmentImageController";
import CooperateImageController from "../pages/admin/image/CooperateImageController";
import ContactController from "../pages/contact/ContactController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<HomeComtroller />} />
          <Route path='/cooperate' element={<CooperateController />} />
          <Route path='/contact' element={<ContactController />} />
          <Route path='/recruitment' element={<RecruitmentController />} />
          <Route
            path='/detail-recruitment'
            element={<DetailRecruitmentController />}
          />
          <Route path='/news' element={<NewsController />} />
          <Route path='/detail-new' element={<DetailNewController />} />
          <Route path='/chanel' element={<ChanelController />} />
        </Route>
        <Route
          path='/admin'
          element={
            <PrivateRouter>
              <LayoutAdmin />
            </PrivateRouter>
          }>
          <Route path='category' element={<CategoryController />} />
          <Route path='post' element={<PostsController />} />
          <Route path='home-image' element={<HomeController />} />
          <Route
            path='recruitment-image'
            element={<RecruitmentImageController />}
          />
          <Route
            path='cooperate-image'
            element={<CooperateImageController />}
          />
        </Route>
        <Route path='login' element={<DashBoardController />} />
        {/* <Route path='reset-password' element={<ResetPasswordController />} /> */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
