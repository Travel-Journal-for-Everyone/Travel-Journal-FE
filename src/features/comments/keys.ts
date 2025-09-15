export const commentKeys = {
  all: ["comments"] as const,
  journal: (journalId: number, size: number) => [...commentKeys.all, "journal", journalId, { size }] as const,
  detail: (commentId: number) => [...commentKeys.all, "detail", commentId] as const,
  replies: (commentId: number) => [...commentKeys.all, "replies", commentId] as const,
};
