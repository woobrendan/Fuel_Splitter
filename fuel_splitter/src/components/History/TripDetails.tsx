import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { FuelBill, IndividualInfo } from "../../model";

// totalPrice: 15.99,
//   totalKM: 25,
//   costPerLitre: 1.45,
//   Brendan: { name: "Brendan", totalKM: 10, totalTrips: 1, billPortion: 0.4 },
//   Lory: { totalKM: 10, totalTrips: 1, billPortion: 0.4 },
//   David: { totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
//   Parco: { totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },

interface Props {
  bill: FuelBill;
}

const TripDetails: React.FC<Props> = ({ bill }) => {
  const { brendan, lory, david, parco } = bill;
  const tripInfo = [brendan, lory, david, parco];

  return (
    <div className="history__single__tripDetails">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Total KM's</TableCell>
              <TableCell align="right"># of Trips</TableCell>
              <TableCell align="right">Bill %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TripDetails;
