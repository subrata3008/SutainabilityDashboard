import React, { useState, useEffect } from "react";
import "../criteria/criteria.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import DatatableComp from "../datatable/datatable";

const Criteria = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [filters, setFilters] = useState({
    BatchNo: { value: null, matchMode: FilterMatchMode.EQUALS },
    CertID: { value: null, matchMode: FilterMatchMode.CONTAINS },
    feedStockStype: { value: null, matchMode: FilterMatchMode.CONTAINS },
    origin: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

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
    const InputCriteria = fetch(
      "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria"
    ).then((response) => response.json());
    const SalesOrder = fetch(
      "https://q4iwdm3yqc.execute-api.us-east-1.amazonaws.com/SalesOrder"
    ).then((response) => response.json());
    Promise.all([InputCriteria, SalesOrder])
      .then(([InputCriteriaData, SalesOrderData]) => {
        let dataWithBatch = InputCriteriaData.records.filter((eachdata) =>
          eachdata.hasOwnProperty("batch")
        );
        let finalData = dataWithBatch.map((eachbatchData) => {
          return eachbatchData.batch.map((eachBatch) => {
            return {
              feedStockStype: !eachbatchData.FeedStockType
                ? ""
                : eachbatchData.FeedStockType,
              //.length > 1 ? eachbatchData.FeedStockType.join(): eachbatchData.FeedStockType,
              BatchNo: eachBatch.BatchNo,
              CertID: eachBatch.CertID,
              origin: eachBatch.origin,
              quantity: eachBatch.quantity,
            };
          });
        });
        setIsLoading(false);
        setTableData(finalData.flat(Infinity));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="card">
      <div className="btnContainer">
        <span className="downloadBtn" onClick={exportExcel}>
          <i className="fa fa-download" aria-hidden="true"></i>Download to Excel
        </span>
      </div>
      <DatatableComp tableData={tableData} isLoading={isLoading} />
    </div>
  );
};

export default Criteria;
