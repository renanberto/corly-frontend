import { DocumentsRepository } from '@/usecases/ports/DocumentsRepository';

export const requestUploadUrl = (repo: DocumentsRepository) => {
  return repo.requestUploadUrl;
};

export const confirmUpload = (repo: DocumentsRepository) => {
  return repo.confirmUpload;
};

export const transitionDocument = (repo: DocumentsRepository) => {
  return repo.transition;
};

export const uploadDocumentVersion = (
  repo: DocumentsRepository,
  uploader: (url: string, file: File) => Promise<void>
) => {
  return async ({ documentId, file }: { documentId: string; file: File }) => {
    const { presignedUrl, storageKey } = await repo.requestUploadUrl(documentId);
    await uploader(presignedUrl, file);
    await repo.confirmUpload(documentId, { storageKey, sha256: 'pending' });
  };
};
