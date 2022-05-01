import axiosClient from "./axiosClient";

export const getAllOrder = (params: any) => {
    const url = '/donhangs';
    return axiosClient.get(url, { params })
}

export const getOrderById = (id: any) => {
    const url = `/donhangs/${id}`
    return axiosClient.get(url)
}

export const createOrder = (params: any) => {
    let url = '/donhangs'
    console.log(params, 'param')
    return axiosClient.post(url, params)
}