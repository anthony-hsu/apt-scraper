import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { PropTypes } from "prop-types";
import TableHeader from "./TableHeader";
import { useMemo, useState } from "react";

function ApartmentDataTable(props) {
  // States
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [selected, setSelected] = useState([]);

  // Props
  const { aptData } = props;

  // Helper Functions
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () => stableSort(aptData, getComparator(order, orderBy)),
    [order, orderBy, aptData]
  );

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, id) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // Helper Data
  const headCells = [
    { id: "apt", numeric: false, disablePadding: true, label: "Apartment" },
    { id: "model", numeric: false, disablePadding: true, label: "Model" },
    { id: "unit", numeric: false, disablePadding: true, label: "Unit" },
    { id: "bed", numeric: false, disablePadding: true, label: "Beds" },
    { id: "bath", numeric: false, disablePadding: true, label: "Baths" },
    { id: "price", numeric: true, disablePadding: true, label: "Price" },
    { id: "sqft", numeric: true, disablePadding: true, label: "Sq. Ft." },
    { id: "ratio", numeric: true, disablePadding: true, label: "Value" },
    {
      id: "availability",
      numeric: false,
      disablePadding: false,
      label: "Availability",
    },
  ];

  // Render
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            // onSelectAllClick={handleSelectAllClick}
            // numSelected={selected.length}
            // rowCount={aptData.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              // const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  // selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.aptName}
                  </TableCell>
                  <TableCell align="right">{row.modelName}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{row.beds}</TableCell>
                  <TableCell align="right">{row.baths}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.sqft}</TableCell>
                  <TableCell align="right">{Math.round(row.ratio * 1000)/100}</TableCell>
                  <TableCell align="right">{row.availability}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

ApartmentDataTable.propTypes = {
  aptData: PropTypes.array,
};

export default ApartmentDataTable;
