import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DocumentsRepositoryHttp } from '@/infrastructure/repositories/DocumentsRepositoryHttp';
import { transitionDocument, uploadDocumentVersion } from '@/usecases/documents';
import { uploadFileToPresignedUrl } from '@/infrastructure/http/upload';

const uploadUsecase = uploadDocumentVersion(DocumentsRepositoryHttp, uploadFileToPresignedUrl);
const transition = transitionDocument(DocumentsRepositoryHttp);

export const useDocumentUploadVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadUsecase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });
};

export const useDocumentTransitionVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, status }: { documentId: string; status: any }) =>
      transition(documentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });
};
