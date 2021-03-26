import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { LAUNCH_API } from "../../constants/apiUrls";

import Header from "./Header";
import PaginationRounded from "./Pagination";

export default function Dashboard() {
  let { pageNo } = useParams();
  const [tableData, setTableData] = useState([]);
  const [tableDisplayData, setTableDisplayData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState("");

  // Function to differentiate and display each launch status
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

  // Function to slice array according to page number
  const paginateArray = (array, page_number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * 12, page_number * 12);
  };

  // Function to handle change of pagination
  const handleChange = (event, value) => {
    // To chenge url according to page number
    window.history.replaceState(null, "New Page Title", `/page=${value}`);

    setTableDisplayData(paginateArray(tableData, value));
    setPageNumber(value);
  };

  // Function to fetch all launches from LAUNCH_API
  const getLaunches = () => {
    axios
      .get(LAUNCH_API)
      .then((response) => {
        setTableData(response.data);
        setTableDisplayData(paginateArray(response.data, pageNo ? pageNo : 1));
        const pageCount = response.data.length / 12;
        setTotalPages(Math.ceil(pageCount));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPageNumber(pageNo ? parseInt(pageNo) : 1);
    getLaunches();
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
            {tableDisplayData.map((object, index) => {
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
                  <TableCell scope="row">
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
      {totalPages && (
        <PaginationRounded
          pageNumber={pageNumber}
          handleChange={handleChange}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
