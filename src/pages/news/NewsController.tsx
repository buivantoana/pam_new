import React, { useEffect, useState } from 'react'
import NewsView from './NewsView'
import { getAllPosts } from '../../service/post';

type Props = {}

const NewsController = (props: Props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetchAll()
  },[])
  const fetchAll = async () => {
    setLoading(true);

   const resPosts = await getAllPosts();
  if ( resPosts&& resPosts.status === 0) setPosts(resPosts.data);
    setLoading(false);
  };
  return (
    <NewsView loading={loading} posts={posts} />
  )
}

export default NewsController