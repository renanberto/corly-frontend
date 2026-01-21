import { Document, DocumentStatus } from '@/domain/models';

export interface DocumentsRepository {
  requestUploadUrl(documentId: string): Promise<{ presignedUrl: string; storageKey: string }>;
  confirmUpload(documentId: string, payload: { storageKey: string; sha256: string }): Promise<void>;
  transition(documentId: string, status: DocumentStatus): Promise<Document>;
}
