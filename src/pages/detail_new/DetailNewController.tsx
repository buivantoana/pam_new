import React, { useEffect, useState } from 'react'
import DetailNewView from './DetailNewView'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllPosts, getPostByID } from '../../service/post';

type Props = {}

const DetailNewController = (props: Props) => {
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
    const resPostRelato = await getAllPosts({categories:resPosts.data.categories.join(',')})
    if(resPostRelato && resPostRelato.status == 0&& resPostRelato.data.length>0){
      setPostRelato(resPostRelato.data.filter((item)=>item._id != id).slice(0, 3))
    }
    setPostDetail(resPosts.data);
  }
  
    setLoading(false);
 };
  return (
    <DetailNewView postDetail={postDetail} postRelato={postRelato} />
  )
}

export default DetailNewController