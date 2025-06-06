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

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
        <Route path='' element={<HomeComtroller />} />
        <Route path='/cooperate' element={<CooperateController />} />
        <Route path='/recruitment' element={<RecruitmentController />} />
        <Route path='/detail-recruitment' element={<DetailRecruitmentController />} />
        <Route path='/news' element={<NewsController />} />
        <Route path='/detail-new' element={<DetailNewController />} />
        <Route path='/chanel' element={<ChanelController />} />
        
      </Route>
      <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='' element={<DashBoardController />} />
      </Route>
      {/* <Route path='reset-password' element={<ResetPasswordController />} /> */}
    
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
