import axios from "./axios";

export function createNewArticle(request) {
  return axios.post("/article/createArticle", request);
}

export function getArticles() {
  return axios.get("/article/getArticles");
}

export function deleteArticle(id) {
  return axios.delete(`/article/${id}`);
}

export function getArticleByTitle(title) {
  return axios.get(`/article/${title}`);
}

export function editArticle(id, request) {
  return axios.patch(`/article/${id}`, request);
}
