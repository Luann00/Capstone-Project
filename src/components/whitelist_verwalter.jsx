import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,


} from '@tanstack/react-table';
import mData from '../Mock_data_whitelist_verwalter.json';
import './whitelist.css';

const WhitelistVerwalter = () => {


  const [data, setData] = useState(() => mData, []);
  const [originalData, setOriginalData] = useState(() => mData, []);
  const [editedRows, setEditedRows] = useState({});

  const EditCell = ({ row, table }) => {
    const meta = table.options.meta
    const setEditedRows = (e) => {
      const elName = e.currentTarget.name
      meta?.setEditedRows((old) => ({
        ...old,
        [row.id]: !old[row.id],
      }))
      if (elName !== "edit") {
        meta?.revertData(row.index, e.currentTarget.name === "cancel")
      }

    }
    const removeRow = () => {
      meta?.removeRow(row.index);
    };
    return  (
      <div className="edit-cell-container">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell-action">
          <button onClick={setEditedRows} name="cancel">
            ⚊
          </button>{" "}
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) : (
        <div className="edit-cell-action">
          <button onClick={setEditedRows} name="edit">
            ✐
          </button>
          <button onClick={removeRow} name="remove">
            X
          </button>
        </div>
      )}
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
    )
      
  };
  const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    const onBlur = () => {
      tableMeta?.updateData(row.index, column.id, value);
    };
    const onSelectChange = (e) => {
      setValue(e.target.value);
      tableMeta?.updateData(row.index, column.id, e.target.value);
    };
    if (tableMeta?.editedRows[row.id]) {
      return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
          {columnMeta?.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          // type={columnMeta?.type || "text"}
        />
      );
    }
    return <span>{value}</span>;
  };
  const FooterCell = ({ table }) => {
    const meta = table.options.meta
    const selectedRows = table.getSelectedRowModel().rows

    const removeRows = () => {
      meta.removeSelectedRows(
        table.getSelectedRowModel().rows.map(row => row.index)
      )
      table.resetRowSelection()
    }
    return (
      <div className="footer-buttons">
        {selectedRows.length > 0 ? (
        <button className="remove-button" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
        <button className="add-button" onClick={meta?.addRow}>
          Add New +
        </button>
      </div>
    )
  }



  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: TableCell,
      footer: 'ID',
    },
    {
      header: 'Uni_KIM',
      accessorKey: 'uni_kim',
      cell: TableCell,
      footer: 'Uni_KIM',
    },
    {
      header: 'Vorname',
      accessorKey: 'first_name',
      cell: TableCell,
      footer: 'Vorname',
    },
    {
      header: 'Nachname',
      accessorKey: 'last_name',
      cell: TableCell,
      footer: 'Nachname',
    },
    
    {
      header: 'Status',
      accessorKey: 'status',
      cell: TableCell,
      footer: 'Status',
    },
    {
      id: 'edit',
      header: 'Edit',
      cell: EditCell,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow = {
          id:"",
          Matr_nummer:"",
          first_name: "",
          last_name:"",
          year:"",
          status:"",

          
        };
      
        const setFunc = (old) => [...old, newRow];
      
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex) => {
        const setFilterFunc = (old) =>
          old.filter((_row, index) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      removeSelectedRows: (selectedRows) => {
        const setFilterFunc = (old) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });



  return (
    <><h1 className='title'> Whitelist Verwalter</h1>

      <div className='table-container'>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>

        </table>

      </div>
      <div className= "paging">
        <button onClick={() => table.setPageIndex(0)}>First page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </button>
      </div></>


  )
}

export default WhitelistVerwalter