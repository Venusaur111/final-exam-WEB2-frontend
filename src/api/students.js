import { apiFetch } from "./apiFetch";

export const getStudents = () => apiFetch("/students");

export const createStudent = (student) =>
  apiFetch("/students", {
    method: "POST",
    body: JSON.stringify(student),
  });

export const updateStudent = (id, student) =>
  apiFetch(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(student),
  });

export const disableStudent = (id) =>
  apiFetch(`/students/${id}`, {
    method: "DELETE",
  });

export const enableStudent = (id) =>
  apiFetch(`/students/${id}/activate`, {
    method: "PATCH",
  });