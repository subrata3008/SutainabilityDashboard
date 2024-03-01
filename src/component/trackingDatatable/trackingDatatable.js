import React, { useState,useEffect } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const TrackingDatatable = (props) => {
  const { salesTableData, isLoading, setselectedSales } = props; 
  const [selectedDatas, setSelectedDatas] = useState(null); 
  const [filters, ] = useState({
    SalesOrder: { value: null, matchMode: FilterMatchMode.EQUALS },
    SalesOrderItem: { value: null, matchMode: FilterMatchMode.EQUALS },
    SalesOrderDate: { value: null, matchMode: FilterMatchMode.EQUALS },
    SoldToParty: { value: null, matchMode: FilterMatchMode.EQUALS },
    Material: { value: null, matchMode: FilterMatchMode.EQUALS },
    RequestedQuantity: { value: null, matchMode: FilterMatchMode.EQUALS },
    RequestedQuantityUnit: { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  
  useEffect(() => { 
    setselectedSales(selectedDatas);
  }, [setselectedSales, selectedDatas]);

  return (
    <DataTable
      value={salesTableData}
      stripedRows
      scrollable
      scrollHeight="400px"
      size={"normal"}
      filters={filters}
      filterDisplay="menu"
      removableSort
      selectionMode={"checkbox"}
      selection={selectedDatas}
      onSelectionChange={(e) => { 
        console.log(e.value);
        setSelectedDatas(e.value);
      }}
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
        filterPlaceholder="Search by Material"
        sortable
        field="Material"
        align="right"
        header="Material"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Volume"
        sortable
        field="Volume"
        header="Volume"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Units"
        sortable
        field="Uom"
        header="Units"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Purchase order number"
        sortable
        align="right"
        field="Purchase"
        header="Purchase"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Total Cl"
        sortable
        field="TotalCI"
        header="Total CI"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Savings %"
        sortable
        field="savings"
        header="Savings %"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Userid"
        sortable
        field="Userid"
        header="Userid"
      ></Column>
    </DataTable>
  );
};

export default TrackingDatatable;
