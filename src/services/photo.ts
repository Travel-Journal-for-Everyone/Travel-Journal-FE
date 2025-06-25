// services/photo.ts

import axiosInstance from "@/lib/axiosInstance";

export interface UploadPhotoResponse {
  uploadId: string;
  uploadFilename: string;
}

/**
 * 여러 장의 사진 파일을 업로드하는 함수
 * @param files 업로드할 이미지 파일 배열
 * @returns 각 파일의 uploadId 및 uploadFilename
 */
export async function uploadPhotos(
  files: File[]
): Promise<UploadPhotoResponse[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await axiosInstance.post<UploadPhotoResponse[]>(
    "/v1/photo/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
}
