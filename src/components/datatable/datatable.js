import React,{useState} from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const DatatableComp = (props) => { 
    const {tableData,isLoading} = props;
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [rowClick, setRowClick] = useState(false);
    const [filters, setFilters] = useState({
        BatchNo: { value: null, matchMode: FilterMatchMode.EQUALS },
        CertID: { value: null, matchMode: FilterMatchMode.CONTAINS },
        feedStockStype: { value: null, matchMode: FilterMatchMode.CONTAINS },
        origin: { value: null, matchMode: FilterMatchMode.EQUALS },
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
    dataKey="po"
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
      filterPlaceholder="Search by Certificate"
      sortable
      field="CertID"
      header="Certificate ID"
    ></Column>
    <Column
      filter
      filterPlaceholder="Search by Feed Stocks type"
      sortable
      field="feedStockStype"
      header="Feed Stocks type"
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
      filterPlaceholder="Search by Quantity"
      sortable
      field="quantity"
      header="Quantity"
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
