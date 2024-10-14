import React, { useState } from "react";
import "../datatable/datatable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, } from "primereact/api";

const DatatableComp = (props) => {
  const { salesTableData,setSalesTableData, isLoading } = props;
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [filters,] = useState({
    po: { value: null, matchMode: FilterMatchMode.EQUALS },
    POItem: { value: null, matchMode: FilterMatchMode.EQUALS },
    POdate: { value: null, matchMode: FilterMatchMode.EQUALS },
    Plant: { value: null, matchMode: FilterMatchMode.EQUALS },
    BatchNo: { value: null, matchMode: FilterMatchMode.EQUALS },
    RefineryCertID: { value: null, matchMode: FilterMatchMode.CONTAINS },
    feedStockStype: { value: null, matchMode: FilterMatchMode.CONTAINS },
    origin: { value: null, matchMode: FilterMatchMode.EQUALS },
    carbonIntensity: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
    UoM: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
 

  const onRowEditComplete = (e) => {
    let _salesTableData = [...salesTableData];
    let { newData, index } = e;
    debugger;
    _salesTableData[index] = newData;
    setSalesTableData(_salesTableData);
};

  const allowEdit = (rowData) => {
    return rowData.name !== 'Blue Band';
};
  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

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
      paginator
      rows={15}
      rowsPerPageOptions={[5, 10, 25, 50]} 
      dataKey="id"
      tableStyle={{
        minWidth: "20rem",
        backgroundColor: "var(--green-200)",
        fontSize: "12px",
        height: "95vh"
      }}
      onRowEditComplete={onRowEditComplete}
      editMode="row"
      emptyMessage={isLoading ? "Loading..." : "No data found"}
    >
      <Column
        filter
        filterPlaceholder="Search by PO"
        sortable
        field="po"
        header="Purchase Order"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by POItem"
        sortable
        field="POItem"
        editor={(options) => textEditor(options)}
        header="Po Item"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by POdate"
        sortable
        field="POdate"
        editor={(options) => textEditor(options)}
        header="Purchase order date"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Plant"
        sortable
        field="Plant"
        editor={(options) => textEditor(options)}
        header="Plant"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Certificate"
        sortable
        field="RefineryCertID"
        editor={(options) => textEditor(options)}
        header="Certificate ID"
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Feed Stock"
        sortable
        field="feedStockStype"
        header="Feed Stock"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Country of Origin"
        sortable
        field="origin"
        header="Country of Origin"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Carbon Intensity"
        sortable
        field="carbonIntensity"
        header="Carbon Intensity"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Quantity"
        sortable
        align='right'
        field="quantity"
        header="Quantity"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Unit of Measure"
        sortable
        field="UoM"
        header="Unit of Measure"
        editor={(options) => textEditor(options)}
      ></Column>
      <Column
        filter
        filterPlaceholder="Search by Batch Number"
        sortable
        field="BatchNo"
        header="Batch Number"
        editor={(options) => textEditor(options)}
      ></Column>
      {/* <Column rowEditor={allowEdit}
       headerStyle={{ width: '10%', minWidth: '8rem' }}
       bodyStyle={{ textAlign: 'center' }}>
      </Column> */}
    </DataTable>
  );
};

export default DatatableComp;
