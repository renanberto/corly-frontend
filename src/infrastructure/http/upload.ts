export const uploadFileToPresignedUrl = async (url: string, file: File) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: file
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }
};
