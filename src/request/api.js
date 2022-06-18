import request from "./request";

export const RegisterApi = (params) => request.post("/register", params);

export const LoginApi = (params) => request.post("/login", params);

export const ListApi = (params) => request.get("/article", { params });

export const ArticleAddApi = (params) => request.post("/article/add", params);

export const ArticleGetApi = (params) => request.get(`/article/${params.id}`);

export const ArticleUpdateApi = (params) =>
  request.put("/article/update", params);

export const ArticleDelApi = (params) =>
  request.post("/article/remove", params);

export const GetUserApi = (params) => request.get(`/info`);
