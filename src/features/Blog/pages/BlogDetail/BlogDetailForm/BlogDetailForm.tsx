import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BreadCrumb from "../../../../../components/BreadCrumb/BreadCrumb";
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const schema = yup
  .object({
    commenter: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("This field is required"),
    content: yup.string().required("This field is required"),
  })
  .required();

const BlogDetailForm: React.FC<{ detailBlog: any, handleAddComment: any, customer?: any }> = (props) => {
  const { detailBlog, handleAddComment } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    handleAddComment(data);
    reset({ commenter: "", email: "", content: "" });
  };

  return (
    <div className="detail-blog-main">
      <BreadCrumb prevPage="blog" currentPage={detailBlog.TieuDe} />
      <div className="blog-detail">
        <div className="container">
          <h1 className="blog-title">
            {detailBlog.TieuDe}
          </h1>

          <div className="blog-meta">
            <span className="blog-author">
              <PersonIcon /><span>Đăng bởi: </span>
              {detailBlog.TaiKhoan?.TenNhanVien}
            </span>

            <span className="blog-cat">
              <CategoryIcon /><span>Danh mục: </span>
              {detailBlog.DanhMucBlog?.TenDanhMucBlog}
            </span>

            <span className="blog-created">
              <AccessTimeIcon /><span>Cập nhật lúc: </span>
              <time className="date">
                {detailBlog.updatedAt ? moment(detailBlog.updatedAt).format('lll') : "???"}
              </time>
            </span>
          </div>

          <div className="blog-image">
            <img
              src={detailBlog.IDAnh?.source}
              title={detailBlog.TieuDe}
              className="img-fluid" />
          </div>

          <div className="blog-description" dangerouslySetInnerHTML={{ __html: detailBlog.NoiDung }}>
          </div>

          <div className="blog-comment-block clearfix">
            <h3>Comments</h3>

            <div className="comments clearfix">
              {detailBlog.Comments?.map((comment: any) => {
                return (
                  <div className="comment-item" key={comment._id}>
                    <PersonOutlineIcon />
                    <div className="comment-wrap">
                      <div className="comment-meta">
                        <span className="comment-infor">
                          <span className="comment-created">
                            Lúc:
                            <span>{comment.date ? moment(comment.date).format('lll') : "???"}</span>
                          </span>
                          <span className="comment-postedby">
                            Tên:
                            <span>{comment.commenter}</span>
                          </span>
                        </span>
                      </div>

                      <div className="comment-content">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pagination clearfix pagination-comments">
                Đang hiện {detailBlog.Comments?.length} comments
              </div>
            </div>

            <h3 className="title-comment">Để lại bình luận của bạn</h3>
            <form
              className="form-horizontal"
              id="commnt_form"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group row">
                <div className="col-lg-3">
                  <label className="control-label" htmlFor="inputFullName">Tên</label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    id="inputFullName"
                    className="form-control"
                    {...register("commenter")}
                    defaultValue={props.customer?.TenKhachHang}
                  />
                  <p className="error-field">
                    {errors.commenter ? errors.commenter.message : ""}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-3">
                  <label className="control-label" htmlFor="inputEmail">Email</label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    id="inputEmail"
                    className="form-control"
                    {...register("email")}
                    defaultValue={props.customer?.email}
                  />
                  <p className="error-field">
                    {errors.email ? errors.email.message : ""}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-3">
                  <label className="control-label" htmlFor="inputComment">Nội dung</label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    itemType={"text"}
                    rows={6}
                    placeholder="Enter your comment"
                    id="inputComment"
                    className="form-control"
                    {...register("content")}
                  >

                  </textarea>
                  <p className="error-field">
                    {errors.content ? errors.content.message : ""}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-3"></div>
                <div className="col-lg-9 col-lg-offset-3">
                  <button className="btn btn-secondary btn-outline btn-submit-comment-wrapper" name="submitcomment" type="submit">
                    <span className="btn-submit-comment">Submit</span>
                    <span className="leoblog-cssload-container cssload-speeding-wheel"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailForm;
