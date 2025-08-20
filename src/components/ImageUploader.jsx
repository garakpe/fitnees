import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const ImageUploader = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 6) {
      setUploadMessage('최대 6개의 파일만 업로드할 수 있습니다.');
      setFiles([]);
    } else {
      setUploadMessage('');
      setFiles(selectedFiles);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadMessage('업로드할 파일을 선택해주세요.');
      return;
    }
    setIsUploading(true);
    setUploadMessage('');

    try {
      const uploadPromises = files.map(file => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      });
      await Promise.all(uploadPromises);
      setUploadMessage('업로드가 완료되었습니다!');
      setFiles([]);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error uploading files: ", error);
      setUploadMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
    setIsUploading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">사진 업로드</h2>
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          disabled={isUploading}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '업로드하기'}
        </button>
      </div>
      {uploadMessage && (
        <p className={`text-center mt-4 ${uploadMessage.includes('완료') ? 'text-green-500' : 'text-red-500'}`}>
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;