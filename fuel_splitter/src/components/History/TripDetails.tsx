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
              <TableCell align="right">KM's</TableCell>
              <TableCell align="right"># of Trips</TableCell>
              <TableCell align="right">Bill %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tripInfo.map((trip, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {trip.name}
                </TableCell>
                <TableCell align="right">{trip.totalKM}</TableCell>
                <TableCell align="right">{trip.totalTrips}</TableCell>
                <TableCell align="right">
                  {(trip.billPortion * 100).toFixed()}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
              <TableCell component="th" scope="row" align="left" colSpan={2}>
                ${bill.totalPrice}
              </TableCell>
              <TableCell align="right">{bill.totalKM}</TableCell>
              <TableCell align="right">{bill.costPerLitre}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TripDetails;
