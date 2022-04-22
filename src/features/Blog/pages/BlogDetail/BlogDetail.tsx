import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentByBlogId, getBlogBySlug } from "../../../../api/blogApi";
import DetailBlogForm from "./BlogDetailForm/BlogDetailForm";

interface SlugParam {
  slug: string,
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<SlugParam>();

  console.log(slug);

  const [commentList, setCommentList] = useState([]);

  const [detailBlog, setDetailBlog]: any = useState({});

  useEffect(() => {
    const fetchDetailBlog = async () => {
      try {
        const response = await getBlogBySlug(slug);
        setDetailBlog(response.data);
        setCommentList(response.data.Comments);
      } catch (error) { }
    };
    fetchDetailBlog();
  }, []);

  console.log(detailBlog);

  const handleAddComment = async (data: any) => {
    const result = await addCommentByBlogId(detailBlog?._id, data);
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
      <DetailBlogForm
        detailBlog={detailBlog}
        handleAddComment={handleAddComment}
      />
    </>
  );
}

export default BlogDetail;
