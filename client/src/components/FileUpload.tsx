import { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  category: 'team-photo' | 'marketing-asset' | 'content' | 'other';
  teamMemberId?: string;
  onUploadSuccess?: (fileData: any) => void;
  onUploadError?: (error: string) => void;
}

export default function FileUpload({
  category,
  teamMemberId,
  onUploadSuccess,
  onUploadError,
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setUploadStatus('uploading');
    setStatusMessage('Uploading...');

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileData = e.target?.result as string;
        const base64Data = fileData.split(',')[1]; // Remove data:image/png;base64, prefix

        // TODO: Call the API endpoint to upload the file
        // For now, we'll simulate the upload
        console.log('File ready to upload:', {
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size,
          category,
          teamMemberId,
        });

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUploadStatus('success');
        setStatusMessage(`Successfully uploaded ${file.name}`);
        onUploadSuccess?.({
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size,
        });

        // Reset after 3 seconds
        setTimeout(() => {
          setUploadStatus('idle');
          setStatusMessage('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadStatus('error');
      setStatusMessage(errorMessage);
      onUploadError?.(errorMessage);

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
        setStatusMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="w-full px-4 py-3 border-2 border-dashed border-primary/50 rounded-lg hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-primary hover:bg-primary/5"
        >
          <Upload size={20} />
          <span>{isLoading ? 'Uploading...' : 'Click to upload file'}</span>
        </button>
      </div>

      {/* Status Messages */}
      {uploadStatus !== 'idle' && (
        <div
          className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
            uploadStatus === 'success'
              ? 'bg-green-500/10 text-green-400'
              : uploadStatus === 'error'
              ? 'bg-red-500/10 text-red-400'
              : 'bg-blue-500/10 text-blue-400'
          }`}
        >
          {uploadStatus === 'success' && <CheckCircle size={18} />}
          {uploadStatus === 'error' && <AlertCircle size={18} />}
          {uploadStatus === 'uploading' && (
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          )}
          <span className="text-sm">{statusMessage}</span>
        </div>
      )}
    </div>
  );
}
