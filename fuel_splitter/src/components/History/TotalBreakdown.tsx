import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { FuelBill } from "../../model";

interface Props {
  bill: FuelBill;
}

const TotalBreakdown: React.FC<Props> = ({ bill }) => {
  return (
    <div className="history__single__tripDetails">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Total Price Paid</TableCell>
              <TableCell align="right">Total KM's</TableCell>
              <TableCell align="right">Cost Per L</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="left"
                colSpan={2}
                data-testid="total_price"
              >
                ${bill.totalPrice}
              </TableCell>
              <TableCell align="right" data-testid="total_km">
                {bill.totalKM}
              </TableCell>
              <TableCell align="right" data-testid="cost_L">
                {bill.costPerLitre}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TotalBreakdown;
