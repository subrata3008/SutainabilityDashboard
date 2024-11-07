// src/FileInput.js

import {React,useState} from 'react'; 
import "./fileInput.css";  
import axios from 'axios';
import * as XLSX from 'xlsx';
import ApiLoader from '../loader/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileInput() { 
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEmptyCountry, setEmptyCountry] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const items = { ...localStorage };
  let userDataIndex = Object.keys(items).findIndex(e=>e.endsWith('userData')); 
   const loggedInuserName = JSON.parse(items[Object.keys(items)[userDataIndex]])
   .UserAttributes.filter(e=>
    String(e.Value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
   )[0].Value; 
   
    console.log(loggedInuserName);

 
  /**
   * Hand;e file change method
   * @param {*} event 
   */
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    event.preventDefault();

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      const emptyCountryField = sheetData.filter(eachRow=>{
          if(!eachRow.Country || !eachRow.CountryIsoCode || !eachRow.CountryText){ 
            return eachRow
          }
      })
      setEmptyCountry(emptyCountryField.length > 0 ? true : false);
      setData(sheetData);
    };

    reader.readAsBinaryString(event.target.files[0]);
  };

  // API Gateway url to invoke function to generate presigned url
  const API_ENDPOINT = "https://sg4y8kewp0.execute-api.us-east-1.amazonaws.com/DEV/getPresignedUrl?bucketname=gl-spl-api-data&filename=";;



  /**
   * Function to generate the presigned url
   * @param {*} selectedFile 
   * @returns 
   */

  const getPresignedUrl = async (selectedFile) => {
    let selectedFineName = selectedFile.name.split('.')[0];
    // GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT+selectedFineName+'&userid='+loggedInuserName,
    }); 
    const presignedUrl = JSON.parse(response.data.body).presignedUrl; 
    return presignedUrl;
  };


  /**
   * Function to upload the selected
   * file using 
   * the generated presigned url
   * @param {*} presignedUrl 
   */

  const uploadToPresignedUrl = async (presignedUrl) => {
    // Upload file to pre-signed URL
    //console.log(selectedFile)
    
    const uploadResponse = await axios.put(presignedUrl, selectedFile, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
        toast.success("File Uploaded Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
           });   
        console.log(`Upload Progress: ${percentCompleted}%`);
           
        setIsLoading(false);
      },
    });
   // console.log(uploadResponse);
  };



  /**
   * Function to orchestrate the upload process
   * @returns 
   */

  const handleUpload = async () => {
    if(isEmptyCountry){ 
      toast.error("One of the mandetory field in the file is empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
         });  
      return;
    }   
    setIsLoading(true);
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
    <>
    <ToastContainer/>
    <ApiLoader isLoading={isLoading} />
    <div className="wrapper"> 
      <h1  onClick={getPresignedUrl}>File Selection</h1>
      
      <input type="file" onChange={handleFileChange} 
              aria-label="file"/>
      <button className='saveBtn upload' title='Upload' onClick={handleUpload}>Upload</button> 
      
  </div>
  </>
  );
}

export default FileInput;