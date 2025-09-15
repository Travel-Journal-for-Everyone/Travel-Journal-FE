// API 원본 스키마
export interface CommentDTO {
  id: number;
  journalId: number;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl?: string;
  content: string;
  parentId?: number | null;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  isAuthor: boolean;
  isHidden: boolean;
  createdAt: string; // "2025-08-14 17:07:00"
  updatedAt: string; // same format
}

export interface PageInfoDTO {
  size: number;
  number: number; // 현재 페이지 (0 or 1 시작? 서버 규칙 확인)
  totalElements: number;
  totalPages: number;
}

export interface CommentListPageDTO {
  content: CommentDTO[];
  page: PageInfoDTO;
}

// 앱 내부에서 쓸 정규화 모델 (UI 친화)
export interface Author {
  memberId: number;
  nickname: string;
  profileImage?: string;
}

export interface CommentModel {
  commentId: number;
  journalId: number;
  parentId?: number | null;
  author: Author;
  content: string;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  isMine: boolean;
  isHidden: boolean;
  createdAt: string; // 그대로 두고, UI에서 format
  updatedAt: string;
}

// 매핑 유틸
export const mapDTOtoModel = (d: CommentDTO): CommentModel => ({
  commentId: d.id,
  journalId: d.journalId,
  parentId: d.parentId ?? null,
  author: {
    memberId: d.authorId,
    nickname: d.authorNickname,
    profileImage: d.authorProfileImageUrl,
  },
  content: d.content,
  likeCount: d.likeCount,
  replyCount: d.replyCount,
  isLiked: d.isLiked,
  isMine: d.isAuthor,
  isHidden: d.isHidden,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});
