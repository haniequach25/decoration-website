import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, postCommentBlog } from "../../../../api/blogApi";
import DetailBlogForm from "./BlogDetailForm/BlogDetailForm";
import { useSelector } from 'react-redux';
import PropagateLoader from "react-spinners/PropagateLoader";

interface SlugParam {
  slug: string,
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<SlugParam>();

  console.log(slug);

  const [commentList, setCommentList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [detailBlog, setDetailBlog]: any = useState({});

  const [blogName, setBlogName] = useState("Blog");

  const customer = useSelector((state: any) => state.user.customer);

  useEffect(() => {
    const fetchDetailBlog = async () => {
      try {
        const response = await getBlogBySlug(slug);
        setDetailBlog(response.data);
        setBlogName(response.data.TieuDe);
        setCommentList(response.data.Comments);
      } catch (error) { }
    };
    fetchDetailBlog();
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = blogName;
  }, [blogName]);

  const handleAddComment = async (data: any) => {
    const result = await postCommentBlog(detailBlog?._id, data);
    if (result) {
      const fetchDetailBlog = async () => {
        try {
          const response = await getBlogBySlug(slug);
          setDetailBlog(response.data);
          setCommentList(response.data.Comments);
        } catch (error) { }
      };
      fetchDetailBlog();
    }
  };
  return (
    <>
      {loading && <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "#FFF",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999
        }}
      >
        <PropagateLoader color={"#9ca19e"} size={15} />
      </div>}
      <DetailBlogForm
        detailBlog={detailBlog}
        handleAddComment={handleAddComment}
        customer={customer}
      />
    </>
  );
}

export default BlogDetail;
