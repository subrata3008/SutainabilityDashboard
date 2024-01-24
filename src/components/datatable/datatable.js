import React, { useState } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const DatatableComp = (props) => {
  const { salesTableData, isLoading } = props; 
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [filters, setFilters] = useState({
    po: { value: null, matchMode: FilterMatchMode.EQUALS },
    POItem: { value: null, matchMode: FilterMatchMode.EQUALS },
    POdate: { value: null, matchMode: FilterMatchMode.EQUALS },
    BatchNo: { value: null, matchMode: FilterMatchMode.EQUALS },
    CertID: { value: null, matchMode: FilterMatchMode.CONTAINS },
    feedStockStype: { value: null, matchMode: FilterMatchMode.CONTAINS },
    origin: { value: null, matchMode: FilterMatchMode.EQUALS },
    carbonIntensity: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
    UoM: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

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
      selection={selectedDatas}
      onSelectionChange={(e) => { 
        setSelectedDatas(e.value);
      }}
      dataKey="id"
      tableStyle={{
        minWidth: "40rem",
        backgroundColor: "var(--green-200)",
        fontSize: "12px",
      }}
      emptyMessage={isLoading ? "Loading..." : "No data found"}
    >
       <Column
        filter
        filterPlaceholder="Search by PO"
        sortable
        field="po"
        header="Purchase Order"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by POItem"
        sortable
        field="POItem"
        header="Po Item"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by POdate"
        sortable
        dataType="date"
        field="POdate"
        header="Purchase order date"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Certificate"
        sortable
        field="RefineryCertID"
        header="Certificate ID"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Feed Stock"
        sortable
        field="feedStockStype"
        header="Feed Stock"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Country of Origin"
        sortable
        field="origin"
        header="Country of Origin"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Carbon Intensity"
        sortable
        field="carbonIntensity"
        header="Carbon Intensity"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Quantity"
        sortable
        align='right'
        field="quantity"
        header="Quantity"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Unit of Measure"
        sortable
        field="UoM"
        header="Unit of Measure"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Batch Number"
        sortable
        field="BatchNo"
        header="Batch Number"
      ></Column>
    </DataTable>
  );
};

export default DatatableComp;
