import React, { useState,useEffect } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const SalesDatatable = (props) => {
  const { salesTableData, isLoading, setselectedSales } = props; 
  const [selectedDatas, setSelectedDatas] = useState(null); 
  const [filters, ] = useState({
    SalesOrder: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SalesOrderItem: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SalesOrderDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    SoldToParty: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Material: { value: null, matchMode: FilterMatchMode.CONTAINS },
    RequestedQuantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ProductDescription: { value: null, matchMode: FilterMatchMode.CONTAINS },
    CustomerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    RequestedQuantityUnit: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
      <Column selectionMode="single" headerStyle={{ width: "4rem" }}></Column>
      <Column
        filter
        filterPlaceholder="Search by Sales Order"
        sortable
        field="SalesOrder"
        header="Sales Order"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Sales Order Item"
        sortable
        field="SalesOrderItem"
        header="Sales order item"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Sales Order Date"
        sortable
        field="SalesOrderDate"
        header="Sales order date"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Customer Name"
        sortable
        field="CustomerName"
        header="Customer name"
      ></Column> 
      <Column
        filter
        filterPlaceholder="Search by Product Description"
        sortable
        field="ProductDescription"
        align="right"
        header="Product Description"
      ></Column>
      
      <Column
        filter
        filterPlaceholder="Search by Requested quantity"
        sortable
        align="right"
        field="RequestedQuantity"
        header="Requested quantity"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Requested quantity unit"
        sortable
        field="RequestedQuantityUnit"
        header="Requested quantity unit"
      ></Column>
    </DataTable>
  );
};

export default SalesDatatable;
