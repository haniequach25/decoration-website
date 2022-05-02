import axiosClient from "./axiosClient";
// get tat ca blog
export const getAllBlog = (params: object) => {
  const url = "/blogs";
  return axiosClient.get(url, { params });
};
// lay 1 bai viet theo slug
export const getBlogBySlug = (slug: string) => {
  const url = `/blogs/${slug}`;
  return axiosClient.get(url);
};
// lay 1 bai viet theo id

export const getBlogById = (id: number) => {
  const url = `/blogs/${id}`;
  return axiosClient.get(url);
};

// lay cac bai viet theo category
export const getBlogsByCategory = (idCategory: number) => {
  const url = "/blogs";
  const param: object = {
    category: idCategory
  }
  return axiosClient.get(url, param);
};

export const postCommentBlog = (id: any, params: any) => {
  const url = `/blogs/comment/${id}`
  return axiosClient.put(url, params)
}
