import React, { useState, useEffect } from "react";
import "../criteria/criteria.css"; 
import DatatableComp from "../datatable/datatable";
import ApiLoader from "../loader/loader"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Criteria = () => {
  const [salesTableData, setSalesTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  /**
   * Export as Excel Method
   */
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(salesTableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "tableData");
    });
  };

  /**
   * Save table data as excel method
   * @param {*} buffer 
   * @param {*} fileName 
   */
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  useEffect(() => {
    setSalesTableData([]);
    const InputCriteria = fetch('https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } 
      toast.error("Internal server error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    setIsLoading(true); 
    Promise.all([InputCriteria])
      .then((InputCriteriaData) => { 
        setSalesTableData([]);
        setIsLoading(false); 
        let dataWithBatch = InputCriteriaData[0].records.filter((eachdata) =>
        eachdata.hasOwnProperty("batch") && eachdata.hasOwnProperty("PO")
        );
        let flag = 0; 
        let finalData = dataWithBatch.map((eachbatchData,indexOuter) => {
          return eachbatchData.batch.map((eachBatch,index) => {
           // debugger
            flag++; 
            return {
              id: flag,
              feedStockStype:  eachbatchData.FeedStockType || '',
              BatchNo: eachBatch.BatchNo || '',
              RefineryCertID: eachBatch.RefineryCertID || '',
              origin: eachBatch.origin || '',
              quantity: eachbatchData.LoadedQuantity || '',
              UoM: eachbatchData.UoM,
              po: eachbatchData.PO || '',
              Plant:eachbatchData.Plant || '',
              POdate:eachbatchData.POdate || '',
              POItem:eachbatchData.POItem || '',
              carbonIntensity: eachBatch.carbonIntensity || ''
            };
          });
        });
        setSalesTableData(finalData.flat(Infinity)); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <> 
    <ApiLoader isLoading={isLoading}/> 

    
    <main className="criteria-wrapper"> 
      <div className="content-columns">
      <div className="btnContainer">
        <span className="downloadBtn" onClick={exportExcel}>
          <i className="fa fa-download" aria-hidden="true"></i>Download to Excel
        </span>
      </div> 
        <DatatableComp 
        salesTableData={salesTableData}
        setSalesTableData={setSalesTableData}
         isLoading={isLoading} /> 
  
      </div>
  
    </main>
   
    </>
  );
};

export default Criteria;
