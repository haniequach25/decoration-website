import axiosClient from "./axiosClient";

export const getAllProduct = (params: any) => {
    const url = '/sanphams';
    return axiosClient.get(url, { params })
}

export const getProductBySlug = (slug: any) => {
    const url = `/sanphams/${slug}`
    return axiosClient.get(url)
}


export const getProductById = (id: any) => {
    const url = `/sanphams/${id}`
    return axiosClient.get(url)
}


export const getProductByCategory = (idCategory: any) => {
    const url = '/sanphams';
    const params: any = { DanhMucSP: idCategory };
    return axiosClient.get(url, { params })
}

export const getAllCatProduct = (params?: any) => {
    const url = '/danhmucsps';
    return axiosClient.get(url, { params })
}

export const postComment = (id: any, params: any) => {
    const url = `/sanphams/comment/${id}`
    return axiosClient.put(url, params)
}