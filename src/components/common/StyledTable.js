import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.table.head,
    color: theme.palette.common.white,
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "20px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.table.body,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
