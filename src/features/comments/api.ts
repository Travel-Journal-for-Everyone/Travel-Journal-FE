// src/features/comments/api.ts
import axiosInstance from "@/lib/axiosInstance";
import type { CommentDTO, CommentListPageDTO } from "./types/comment";

export const getCommentsByJournal = (journalId: number, page = 0, size = 20, signal?: AbortSignal) =>
  axiosInstance
    .get<CommentListPageDTO>(`/v1/comments/journal/${journalId}`, { params: { page, size }, signal })
    .then((r) => r.data);

export const getCommentDetail = (commentId: number, signal?: AbortSignal) =>
  axiosInstance.get<CommentDTO>(`/v1/comments/${commentId}`, { signal }).then((r) => r.data);

export const createComment = (payload: { journalId: number; content: string; parentId?: number }) =>
  axiosInstance.post<CommentDTO>(`/v1/comments`, payload).then((r) => r.data);

export const updateComment = (commentId: number, content: string) =>
  axiosInstance.put<CommentDTO>(`/v1/comments/${commentId}`, { content }).then((r) => r.data);

export const hideComment = (commentId: number) =>
  axiosInstance.delete<void>(`/v1/comments/${commentId}`).then((r) => r.data);

export const toggleLike = (commentId: number) =>
  axiosInstance.post<CommentDTO>(`/v1/comments/${commentId}/like`).then((r) => r.data);

export const getReplies = (commentId: number, signal?: AbortSignal) =>
  axiosInstance.get<CommentDTO[]>(`/v1/comments/${commentId}/replies`, { signal }).then((r) => r.data);
