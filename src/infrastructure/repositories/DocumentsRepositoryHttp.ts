import { httpClient } from '@/infrastructure/http/client';
import { DocumentsRepository } from '@/usecases/ports/DocumentsRepository';

export const DocumentsRepositoryHttp: DocumentsRepository = {
  async requestUploadUrl(documentId) {
    return httpClient(`/documents/${documentId}/upload-url`, { method: 'POST' });
  },
  async confirmUpload(documentId, payload) {
    await httpClient(`/documents/${documentId}/versions/confirm`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  async transition(documentId, status) {
    return httpClient(`/documents/${documentId}/transition`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  }
};
