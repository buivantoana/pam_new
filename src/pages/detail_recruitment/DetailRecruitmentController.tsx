import React, { useEffect, useState } from 'react'
import DetailRecruitmentView from './DetailRecruitmentView'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllPosts, getPostByID } from '../../service/post';

type Props = {}

const DetailRecruitmentController = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState([]);
  const [postRelato, setPostRelato] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  
  useEffect(()=>{
    if(id){
      fetchAll()
    }
  },[id])
  const fetchAll = async () => {
    setLoading(true);
   const resPosts = await getPostByID(id);
   if ( resPosts&& resPosts.status === 0) {
    setPostDetail(resPosts.data);
  }
  
    setLoading(false);
 };
  return (
    <DetailRecruitmentView id={id} postDetail={postDetail} />
  )
}

export default DetailRecruitmentController