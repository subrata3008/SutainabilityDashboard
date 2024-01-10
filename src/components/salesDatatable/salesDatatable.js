import React, { useState,useEffect } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const SalesDatatable = (props) => {
  const { salesTableData, isLoading,setselectedSales } = props; 
  const [selectedDatas, setSelectedDatas] = useState(null); 
  const [filters, setFilters] = useState({
    SalesOrder: { value: null, matchMode: FilterMatchMode.EQUALS },
    SalesOrderItem: { value: null, matchMode: FilterMatchMode.EQUALS },
    SalesOrderDate: { value: null, matchMode: FilterMatchMode.EQUALS },
    SoldToParty: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Material: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
      <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
      <Column
        filter
        filterPlaceholder="Search by PO"
        sortable
        field="SalesOrder"
        header="Sales Order"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by POItem"
        sortable
        field="SalesOrderItem"
        header="Sales order item"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by SalesOrderDate"
        sortable
        field="SalesOrderDate"
        header="Sales order date"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Customer number"
        sortable
        field="SoldToParty"
        header="Customer number"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Material"
        sortable
        field="Material"
        header="Material"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Requested quantity"
        sortable
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