// src/FileInput.js

import {React,useState} from 'react'; 
import "./fileInput.css";  
import axios from 'axios';

function FileInput() { 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const items = { ...localStorage };
  let userDataIndex = Object.keys(items).findIndex(e=>e.endsWith('userData')); 
  const loggedInuserName = JSON.parse(items[Object.keys(items)[userDataIndex]])
    .UserAttributes[2].Value; 
    //console.log(loggedInuserName);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // API Gateway url to invoke function to generate presigned url
  const API_ENDPOINT = "https://sg4y8kewp0.execute-api.us-east-1.amazonaws.com/DEV/getPresignedUrl?bucketname=gl-spl-api-data&filename=";;

  // Function to generate the presigned url
  const getPresignedUrl = async (selectedFile) => {
    console.log(selectedFile)
    let selectedFineName = selectedFile.name.split('.')[0];
    // GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT+selectedFineName+'&userid='+loggedInuserName,
    }); 
    const presignedUrl = JSON.parse(response.data.body).presignedUrl; 
    return presignedUrl;
  };

  // Function to upload the selected file using the generated presigned url
  const uploadToPresignedUrl = async (presignedUrl) => {
    // Upload file to pre-signed URL
    console.log(selectedFile)
    const uploadResponse = await axios.put(presignedUrl, selectedFile, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
    console.log(uploadResponse);
  };

  // Function to orchestrate the upload process
  const handleUpload = async () => {
    try {
      // Ensure a file is selected
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const presignedUrl = await getPresignedUrl(selectedFile);
      uploadToPresignedUrl(presignedUrl);
    } catch (error) {
      // Handle error
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="wrapper">

  
      <h1 onClick={getPresignedUrl}>File Selection</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> 
      {uploadProgress}

  </div>
  );
}

export default FileInput;