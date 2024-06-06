import React, { useState, useRef, useEffect } from 'react';
import { PaperPlaneTilt, PlusCircle, File, X } from '@phosphor-icons/react';

interface ChatInputProps {
  onSendMessage: (message: string, files: File[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = message; // Sync the ref value with message state
    }
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && files.length === 0) {
      return; // Do not send if both message and files are empty
    }

    console.log('Sending message:', trimmedMessage, 'Files:', files);
    onSendMessage(trimmedMessage, files);
    setMessage(''); // Clear the message state
    setFiles([]);
    setFilePreviews([]);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the textarea manually
    }
    console.log('Message and files cleared');
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
    console.log('Files added:', newFiles);
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
    console.log('File removed at index:', indexToRemove);
  };

  console.log('Current message:', message); // Move this outside of the JSX return

  return (
    <div className="chat-bar">
      <div className={`file-preview ${filePreviews.length > 0 ? 'fill' : ''}`}>
        {filePreviews.map((preview, index) => (
          <div key={index} className="file-preview-item">
            {files[index].type.startsWith('image/') ? (
              <img src={preview} alt={files[index].name} />
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
      <div className="rce-container-input">
        <div className="rce-input-buttons">
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
        </div>
        <textarea
          placeholder="Type here..."
          className="rce-input rce-input-textarea"
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="rce-input-buttons">
          <div>
            <button
              onClick={handleSend}
              disabled={!message.trim() && files.length === 0}
            >
              <PaperPlaneTilt size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
