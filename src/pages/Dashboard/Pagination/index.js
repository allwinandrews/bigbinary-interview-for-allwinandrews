import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      position: "relative",
      // width: "240px",
      height: "40px",
      left: "957px",
      top: "180px",
    },
  },
}));

export default function PaginationRounded(props) {
  const { pageNumber, handleChange, totalPages } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        page={pageNumber}
        variant="outlined"
        onChange={handleChange}
        shape="rounded"
      />
    </div>
  );
}
