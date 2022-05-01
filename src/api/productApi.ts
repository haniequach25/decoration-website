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

export const saveProduct = (params: any) => {
    const id = params._id
    let url = '/sanphams'
    if (!id) {
        return axiosClient.post(url, params)
    } else {
        url = url + `/${id}`
        return axiosClient.put(url, params)
    }
}

export const removeProduct = (parameter: any) => {
    const url = `/sanphams/${parameter}`
    return axiosClient.delete(url)
}

export const getAllCatProduct = (params?: any) => {
    const url = '/danhmucsps';
    return axiosClient.get(url, { params })
} 