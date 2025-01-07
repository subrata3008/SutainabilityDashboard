import React, { useState, useEffect } from "react";
import "../criteria/criteria.css";
import DatatableComp from "../datatable/datatable";
import ApiLoader from "../loader/loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Criteria = () => {
  const [salesTableData, setSalesTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
console.log(expanded);

  const options = {
    animationEnabled: true,
    exportEnabled: false,
    width: 395,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Feed Stocks"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: 20, label: "Feed Stock 1" },
        { y: 24, label: "Feed Stock 2" },
        { y: 20, label: "Feed Stock 3" },
        { y: 14, label: "Feed Stock 4" },
        { y: 12, label: "Feed Stock 5" },
        { y: 10, label: "Feed Stock 6" }
      ]
    }]
  }

  const options2 = {
    animationEnabled: true,
    exportEnabled: false,
    width: 395,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Country"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 71 },
        { x: 60, y: 68 },
        { x: 70, y: 38 },
        { x: 80, y: 92, indexLabel: "Highest" },
        { x: 90, y: 54 },
        { x: 100, y: 60 },
        { x: 110, y: 21 },
        { x: 120, y: 49 },
        { x: 130, y: 36 }
      ]
    }]
  }
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
        let finalData = dataWithBatch.map((eachbatchData, indexOuter) => {
          return eachbatchData.batch.map((eachBatch, index) => {
            // debugger
            flag++;
            return {
              id: flag,
              feedStockStype: eachbatchData.FeedStockType || '',
              BatchNo: eachBatch.BatchNo || '',
              RefineryCertID: eachBatch.RefineryCertID || '',
              origin: eachBatch.origin || '',
              quantity: eachbatchData.LoadedQuantity || '',
              UoM: eachbatchData.UoM,
              po: eachbatchData.PO || '',
              Plant: eachbatchData.Plant || '',
              POdate: eachbatchData.POdate || '',
              POItem: eachbatchData.POItem || '',
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
      <ApiLoader isLoading={isLoading} />

      <main className={"criteria-wrapper " + (!expanded ? "expandedCriteriaDiv" : '')}>
        {expanded ||
          <div className="chartSection">
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
            <br />
            <CanvasJSChart options={options2}
            /* onRef={ref => this.chart = ref} */
            />
          </div>
        }
        <div className={"content-columns " + (expanded ? "expandedDiv" : '')}>
          <div className="btnContainer">
            <button className="downloadBtn" title='Download to Excel' onClick={exportExcel}>
              <i className="fa fa-download" aria-hidden="true" alt="Download to Excel"></i>Download to Excel
            </button>
            {!expanded || <i class="fa fa-expand zoomBtn" title="Expand" aria-hidden="true" onClick={() => setExpanded(!expanded)}></i>}
            {expanded || <i class="fa fa-compress zoomBtn" title="Compress" aria-hidden="true" onClick={() => setExpanded(!expanded)}></i>}
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
