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
                <TableCell align="right">{trip.billPortion * 100}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TripDetails;
