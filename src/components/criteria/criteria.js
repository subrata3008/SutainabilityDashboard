import React, { useState, useEffect } from "react";
import "../criteria/criteria.css"; 
import DatatableComp from "../datatable/datatable";
import ApiLoader from "../loader/loader";

const Criteria = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  /**
   * Export as Excel Method
   */
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "tableData");
    });
  };

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
    setIsLoading(true); 
      fetch(
        "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria"
      ).then((response) => response.json())
      .then((InputCriteriaData) => { 
        setIsLoading(false);
        let dataWithBatch = InputCriteriaData.records.filter((eachdata) =>
        eachdata.hasOwnProperty("batch") && eachdata.hasOwnProperty("PO")
        );
        let finalData = dataWithBatch.map((eachbatchData) => {
          return eachbatchData.batch.map((eachBatch,index) => {
            return {
              id: index,
              feedStockStype: !eachbatchData.FeedStockType
                ? ""
                : eachbatchData.FeedStockType,
              //.length > 1 ? eachbatchData.FeedStockType.join(): eachbatchData.FeedStockType,
              BatchNo: eachBatch.BatchNo,
              CertID: eachBatch.CertID,
              origin: eachBatch.origin,
              quantity: eachBatch.quantity,
              UoM: 'Tons',//eachbatchData.UoM,
              po: eachbatchData.PO,
              POdate:eachbatchData.POdate,
              POItem:eachbatchData.POItem,
              carbonIntensity: eachBatch.carbonIntensity
            };
          });
        });
        setTableData(finalData.flat(Infinity));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <> 
    <ApiLoader isLoading={isLoading}/>
    <div className="card">
      <div className="btnContainer">
        <span className="downloadBtn" onClick={exportExcel}>
          <i className="fa fa-download" aria-hidden="true"></i>Download to Excel
        </span>
      </div>
      <DatatableComp tableData={tableData} isLoading={isLoading} />
    </div>
    </>
  );
};

export default Criteria;
