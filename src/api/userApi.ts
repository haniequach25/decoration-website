import axiosClient from "./axiosClient";

export const login = (params: any) => {
  const url = "/khachhangs/login";
  return axiosClient.post(url, params);
};

export const getUserById = (id: any) => {
  const url = `/khachhangs/${id}`;
  return axiosClient.get(url);
};

export const saveUser = (params: any) => {
  const id = params._id;
  let url = "/khachhangs";
  // let urlRegister = "/khachhangs/register";
  if (id == 0) {
    return axiosClient.post(url, params);
  } else {
    url = url + `/${id}`;
    return axiosClient.put(url, params);
  }
};

export const me = () => {
  const url = "/khachhangs/me";
  return axiosClient.get(url);
};
