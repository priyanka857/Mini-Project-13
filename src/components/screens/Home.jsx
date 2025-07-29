import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, startDate, endDate, searchQuery]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        search: searchQuery,
        start_date: startDate ? startDate.toISOString().split("T")[0] : "",
        end_date: endDate ? endDate.toISOString().split("T")[0] : "",
      });

      const response = await fetch(`/api/getApplicantsData/?${params.toString()}`);
      const jsonData = await response.json();
      setData(jsonData.data);
      setTotalPages(jsonData.total_pages);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 10;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? "primary" : "outline-primary"}
        >
          {i}
        </Button>
      );
    }

    if (end < totalPages) {
      buttons.push(
        <Button key="dots" variant="outline-secondary" disabled>
          ...
        </Button>
      );
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={currentPage === totalPages ? "primary" : "outline-primary"}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="container mt-3">
      <h2>Applicant Details</h2>
      <hr />
      <p>Filter By Date of Application</p>

      <Row className="mb-3">
        <Col xs={12} sm={6} md={2} className="mb-2">
          <DatePicker
            selected={startDate}
            className="form-control"
            onChange={handleStartDateChange}
            placeholderText="From Date"
          />
        </Col>
        <Col xs={12} sm={6} md={2} className="mb-2">
          <DatePicker
            selected={endDate}
            className="form-control"
            onChange={handleEndDateChange}
            placeholderText="To Date"
          />
        </Col>
        <Col xs={12} md={8} className="mb-2">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search By Applicant ID..."
          />
        </Col>
      </Row>

      <div className="table-wrapper table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              {[
                "ID",
                "Applicant Name",
                "Gender",
                "District",
                "State",
                "Pincode",
                "Ownership",
                "Govt ID Type",
                "ID Number",
                "Category",
                "Load Applied",
                "Date of Application",
                "Status",
                "Reviewer ID",
                "Reviewer Name",
                "Reviewer Comments",
                "Edit",
              ].map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((connection) => (
              <tr key={connection.id}>
                <td>{connection.id}</td>
                <td>{connection.Applicant.Applicant_Name}</td>
                <td>{connection.Applicant.Gender}</td>
                <td>{connection.Applicant.District}</td>
                <td>{connection.Applicant.State}</td>
                <td>{connection.Applicant.Pincode}</td>
                <td>{connection.Applicant.Ownership}</td>
                <td>{connection.Applicant.GovtID_Type}</td>
                <td>{connection.Applicant.ID_Number}</td>
                <td>{connection.Applicant.Category}</td>
                <td>{connection.Load_Applied}</td>
                <td>{connection.Date_of_Application}</td>
                <td>{connection.Status}</td>
                <td>{connection.Reviewer_ID}</td>
                <td>{connection.Reviewer_Name}</td>
                <td>{connection.Reviewer_Comments}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => navigate(`/editApplicant/${connection.id}`)}
                  >
                    Edit
                    <i class="fa-solid fa-pen-to-square"></i>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls mt-3 text-center">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <ButtonGroup>
            <Button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              First
            </Button>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
          </ButtonGroup>

          <div className="d-flex flex-wrap justify-content-center gap-1 mt-2 mt-md-0">
            {renderPageButtons()}
          </div>

          <ButtonGroup>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
            <Button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              Last
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default Home;
