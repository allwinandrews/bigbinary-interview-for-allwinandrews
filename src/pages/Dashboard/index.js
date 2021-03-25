import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { LAUNCH_API } from "../../constants/apiUrls";

import Header from "./Header";

export default function Dashboard() {
  const [tableData, setTableData] = useState([]);

  const getLaunchStatus = (boolean) => {
    switch (boolean) {
      case true:
        return <p className="badge success">Success</p>;
      case false:
        return <p className="badge failed">Failed</p>;
      case null:
        return <p className="badge upcoming">Upcoming</p>;
    }
  };

  useEffect(() => {
    axios
      .get(LAUNCH_API)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Table className="table" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No:</TableCell>
              <TableCell align="left">Launched (UTC)</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Mission</TableCell>
              <TableCell align="left">Orbit</TableCell>
              <TableCell align="left">Launch Status</TableCell>
              <TableCell align="left">Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((object, index) => {
              const {
                flight_number,
                launch_date_utc,
                launch_site,
                mission_name,
                rocket,
                launch_success,
              } = object;
              const { rocket_name, second_stage } = rocket;
              const { payloads } = second_stage;
              const launch_status = getLaunchStatus(launch_success);

              return (
                <TableRow key={launch_date_utc + index}>
                  <TableCell component="th" scope="row">
                    {flight_number < 10 ? "0" + flight_number : flight_number}
                  </TableCell>
                  <TableCell align="left">{launch_date_utc}</TableCell>
                  <TableCell align="left">{launch_site.site_name}</TableCell>
                  <TableCell align="left">{mission_name}</TableCell>
                  <TableCell align="left">{payloads[0].orbit}</TableCell>
                  <TableCell align="left">{launch_status}</TableCell>
                  <TableCell align="left">{rocket_name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
