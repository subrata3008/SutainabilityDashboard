import React,{useState} from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const DatatableComp = (props) => { 
    const {tableData,isLoading} = props;
    const [selectedDatas, setSelectedDatas] = useState(null); 
    const [filters, setFilters] = useState({
      po: { value: null, matchMode: FilterMatchMode.EQUALS },
      POItem: { value: null, matchMode: FilterMatchMode.EQUALS },
      BatchNo: { value: null, matchMode: FilterMatchMode.EQUALS },
        CertID: { value: null, matchMode: FilterMatchMode.CONTAINS },
        feedStockStype: { value: null, matchMode: FilterMatchMode.CONTAINS },
        origin: { value: null, matchMode: FilterMatchMode.EQUALS },
        carbonIntensity: { value: null, matchMode: FilterMatchMode.EQUALS },
        quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
      });

    
  return (
    <DataTable
    value={tableData}
    stripedRows
    scrollable
    scrollHeight="400px"
    size={"normal"}
    filters={filters}
    filterDisplay="menu"
    removableSort
    selectionMode={"checkbox"}
    selection={selectedDatas} 
    onSelectionChange={(e) => {console.log(e.value); setSelectedDatas(e.value)}}
    dataKey="id"
    tableStyle={{
      minWidth: "40rem",
      backgroundColor: "var(--green-200)",
      fontSize:"12px"
    }}
    emptyMessage={isLoading ? <div className="loader"></div>  : "No data found"}
  >
    <Column
      selectionMode="multiple"
      headerStyle={{ width: "4rem" }}
    ></Column>
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
      field="POdate"
      header="Purchase order date"
    ></Column>
    <Column
      filter
      filterPlaceholder="Search by Certificate"
      sortable
      field="CertID"
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
