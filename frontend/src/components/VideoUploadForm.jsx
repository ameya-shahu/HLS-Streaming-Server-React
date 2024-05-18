import React, { useState, useRef  } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { uploadFile } from '../services/apiServices';

const VideoUploadForm = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileRef = useRef();

    const handleReset = () => {
        fileRef.current.value = null;
    };

    const validateFileType = (file) => {
        const allowedExtensions = ["mp4", "mkv"];
        const fileNameParts = file.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    
        return allowedExtensions.includes(fileExtension);
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
  
        if (selectedFile) {
        if (validateFileType(selectedFile)){
            setFile(selectedFile);
        }else{
            setFile(null);
            event.target.value = '';
            alert("Only mp4 and mkv is allowed.");
        }      
        }
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setIsUploading(true);
    
        if (file) {
            const uploadFileResult = await uploadFile(file);
            handleReset();
            setFile(null);
            setIsUploading(false);
            window.location.reload();
        }else{
          alert("Select a valid video file.")
          setIsUploading(false);
        }
      }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>
          <h5 className="text-center">Upload your video file with maximum quality. (Recommended 1080p)</h5>
        </Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control type="file" className="me-3" ref={fileRef} onChange={handleFileChange}/>
          <Button variant="primary" type="submit" className="ms-auto" disabled = {isUploading}>
            {isUploading ? "Uploading.." : "Submit"}
          </Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default VideoUploadForm