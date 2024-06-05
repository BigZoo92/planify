import React, { useState, useRef } from 'react';
import { Input } from 'react-chat-elements';
import {
  PaperPlaneTilt,
  PlusCircle,
  File,
  X,
} from '@phosphor-icons/react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    console.log('Send message:', message);
    console.log('Send files:', files);
    setMessage('');
    setFiles([]);
    setFilePreviews([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const newPreviews = newFiles.map((file) => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      } else {
        return file.name;
      }
    });

    setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleFileRemove = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
    if (files[indexToRemove]?.type.startsWith('image/')) {
      URL.revokeObjectURL(filePreviews[indexToRemove]);
    }
  };

  return (
    <div className="chat-bar">
      <div className={`file-preview ${filePreviews.length > 0 ? 'fill' : ''}`}>
        {filePreviews.map((preview, index) => (
          <div key={index} className="file-preview-item">
            {files[index].type.startsWith('image/') ? (
              <img src={preview} alt="Image preview" />
            ) : (
              <div className="file-preview-file">
                <File size={16} />
                <p>{preview}</p>
              </div>
            )}
            <div
              className="preview-delete"
              onClick={() => handleFileRemove(index)}
            >
              <X size={16} color="#fff" />
            </div>
          </div>
        ))}
      </div>
      <Input
        placeholder="Type here..."
        multiline={true}
        maxHeight={200}
        leftButtons={
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <button
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <PlusCircle size={20} />
            </button>
          </div>
        }
        rightButtons={
          <div>
            <button onClick={handleSend}>
              <PaperPlaneTilt size={20} />
            </button>
          </div>
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
    </div>
  );
};

export default ChatInput;
