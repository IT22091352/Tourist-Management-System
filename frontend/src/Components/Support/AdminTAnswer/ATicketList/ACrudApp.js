import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ACrudApp.css";

const URL = "http://localhost:5000/tickets";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ACrudApp() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      setRecords(data.tickets);
      setFilteredRecords(data.tickets);
    });
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.ticketID,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const formattedDate = new Date(row.dateCreated).toLocaleDateString();
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.touristInfo.email,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.answer ? true : false}
          disabled
          className="form-check-input"
        />
      ),
      button: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="btn btn-primary">
          <Link
            to={`/ATicketDetails/${row._id}`}
            className="text-decoration-none text-white"
          >
            Answer
          </Link>
        </button>
      ),
      button: true,
    },
  ];

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = records.filter((row) =>
      Object.values(row).some(
        (val) =>
          (typeof val === "string" && val.toLowerCase().includes(value)) ||
          (typeof val === "object" &&
            Object.values(val).some(
              (innerVal) =>
                typeof innerVal === "string" &&
                innerVal.toLowerCase().includes(value)
            ))
      )
    );
    setFilteredRecords(filteredData);
  };

  return (
    <div className="container-md">
      <div className="text-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search..."
          className="form-control"
        />
      </div>
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={filteredRecords}
          selectableRows
          fixedHeader
          pagination
          className="table table-bordered"
        />
      </div>
    </div>
  );
}

export default ACrudApp;
