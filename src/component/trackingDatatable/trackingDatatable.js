import React, { useState,useEffect } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const TrackingDatatable = (props) => {
  const { trackTableData, isLoading, setselectedSales } = props; 
  console.log(trackTableData)
  //const [selectedDatas, setSelectedDatas] = useState(null); 
  const [filters, ] = useState({
    SalesOrder: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SalesOrderItem: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SalesOrderDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SoldToParty: { value: null, matchMode: FilterMatchMode.CONTAINS },
    CustomerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProductDescription: { value: null, matchMode: FilterMatchMode.CONTAINS },
    RequestedQuantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
    RequestedQuantityUnit: { value: null, matchMode: FilterMatchMode.CONTAINS },
    OrderQuantityUnit: { value: null, matchMode: FilterMatchMode.CONTAINS },
    PO: { value: null, matchMode: FilterMatchMode.CONTAINS },
    totalGHG: { value: null, matchMode: FilterMatchMode.CONTAINS },
    MatchedByUser: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  
  // useEffect(() => { 
  //   setselectedSales(selectedDatas);
  // }, [setselectedSales, selectedDatas]);

  return (
    <DataTable
      value={trackTableData}
      stripedRows
      scrollable
      scrollHeight="400px"
      size={"normal"}
      filters={filters}
      filterDisplay="menu"
      removableSort
      selectionMode={"checkbox"}
      //selection={selectedDatas}
      // onSelectionChange={(e) => { 
      //   console.log(e.value);
      //   setSelectedDatas(e.value);
      // }}
      dataKey="id"
      tableStyle={{
        minWidth: "40rem",
        backgroundColor: "var(--green-200)",
        fontSize: "12px",
      }}
      emptyMessage={
        isLoading ? <div className="loader"></div> : "No data found"
      }
    >
      {/* <Column selectionMode="single" headerStyle={{ width: "4rem" }}></Column> */}
      <Column
        filter
        filterPlaceholder="Search by Sales Order"
        sortable
        field="SalesOrder"
        header="Sales Order"
      ></Column> 
      <Column
        filter
        filterPlaceholder="Search by Customer Name"
        sortable
        field="CustomerName" 
        header="Customer Name"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Product Description"
        sortable
        field="ProductDescription"
        align="right"
        header="Material"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Quantity"
        sortable
        field="RequestedQuantity"
        align="right"
        header="Quantity"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Units"
        sortable
        field="OrderQuantityUnit"
        header="Units"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Purchase order number"
        sortable
        align="right"
        field="PO"
        header="Purchase"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Total Cl"
        sortable
        field="totalGHG"
        header="Total CI"
      ></Column> 
      <Column
        filter
        filterPlaceholder="Search by Userid"
        sortable
        field="MatchedByUser"
        header="Userid"
      ></Column>
    </DataTable>
  );
};

export default TrackingDatatable;
