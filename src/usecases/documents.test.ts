import { uploadDocumentVersion } from '@/usecases/documents';
import { DocumentsRepository } from '@/usecases/ports/DocumentsRepository';

describe('uploadDocumentVersion', () => {
  it('executa fluxo presigned completo', async () => {
    const repo: DocumentsRepository = {
      requestUploadUrl: vi.fn(async () => ({ presignedUrl: 'https://s3', storageKey: 'key-1' })),
      confirmUpload: vi.fn(async () => undefined),
      transition: vi.fn()
    };
    const uploader = vi.fn(async () => undefined);
    const usecase = uploadDocumentVersion(repo, uploader);
    const file = new File(['conteudo'], 'rg.pdf', { type: 'application/pdf' });

    await usecase({ documentId: 'doc-1', file });

    expect(repo.requestUploadUrl).toHaveBeenCalledWith('doc-1');
    expect(uploader).toHaveBeenCalledWith('https://s3', file);
    expect(repo.confirmUpload).toHaveBeenCalledWith('doc-1', {
      storageKey: 'key-1',
      sha256: 'pending'
    });
  });
});
