import React, { useEffect, useState } from "react";
import NewsView from "./NewsView";
import { getAllPosts } from "../../service/post";
import { useLocation } from "react-router-dom";

const NewsController = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  console.log("type", type);
  useEffect(() => {
    let query: any = {};
    if (type) {
      query.type = type;
    }
    fetchAll(query);
  }, [type]);
  const fetchAll = async (query) => {
    setLoading(true);

    const resPosts = await getAllPosts(query);
    if (resPosts && resPosts.status === 0) setPosts(resPosts.data);
    setLoading(false);
  };
  return <NewsView loading={loading} type={type} posts={posts} />;
};

export default NewsController;
