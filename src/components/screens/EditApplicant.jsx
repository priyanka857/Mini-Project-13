
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import Message from "../Message";

function EditApplicant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState({
    Applicant_Name: "",
    Gender: "",
    District: "",
    State: "",
    Pincode: "",
    Ownership: "",
    GovtID_Type: "",
    ID_Number: "",
    Category: "",
  });

  const [connection, setConnection] = useState({
    Applicant: id,
    Load_Applied: "",
    Date_of_Application: "",
    Date_of_Approval: "",
    Modified_Date: "",
    Status: "",
    Reviewer_ID: "",
    Reviewer_Name: "",
    Reviewer_Comments: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showMessage, setShowMessage] = useState(false);

  const genderOptions = ["Male", "Female"];
  const ownershipOptions = ["Individual", "Joint"];
  const idTypeOptions = ["Aadhar", "Voter_Id", "PAN", "Passport"];
  const categoryOptions = ["Residential", "Commercial"];
  const statusOptions = [
    "Connection Released",
    "Approved",
    "Pending",
    "Rejected",
  ];
  const reviewerCommentOptions = [
    "Installation pending",
    "Documents verification in progress",
    "Installation completed",
    "KYC failed",
  ];

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/update_applicants/${id}`
        );
        if (!response.ok) throw new Error("Data not found");
        const data = await response.json();
        setApplicant(data.applicant);
        setConnection(data.connection);
      } catch (error) {
        setMessageType("error");
        setMessage("Failed to fetch applicant data.");
        setShowMessage(true);
      }
    };

    fetchApplicantData();
  }, [id]);

  const handleApplicantChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleConnectionChange = (e) => {
    const { name, value } = e.target;

    if (name === "Load_Applied") {
      if (value === "") {
        setConnection((prev) => ({ ...prev, [name]: "" }));
        return;
      }

      const numericValue = Number(value);
      if (isNaN(numericValue) || numericValue < 0) return;

      if (numericValue > 200) {
        setMessageType("error");
        setMessage("Load Applied cannot exceed 200");
        setShowMessage(true);
        setConnection((prev) => ({ ...prev, [name]: 200 }));
        return;
      }

      setConnection((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setConnection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/update_applicants/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicant, connection }),
        }
      );

      if (response.ok) {
        setMessageType("success");
        setMessage("Applicant updated successfully!");
        setShowMessage(true);
        setTimeout(() => navigate("/"), 2000); // redirect after 2s
      } else {
        setMessageType("error");
        setMessage("Failed to update applicant.");
        setShowMessage(true);
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Error submitting the form.");
      setShowMessage(true);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Applicant (ID: {id})</h2>

      {showMessage && (
        <Message
          type={messageType}
          message={message}
          onClose={() => setShowMessage(false)}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <h5 className="mt-4">Applicant Info</h5>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Applicant_Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Applicant_Name"
                value={applicant.Applicant_Name}
                onChange={handleApplicantChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="Gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="Gender"
                value={applicant.Gender}
                onChange={handleApplicantChange}
              >
                <option value="">Select</option>
                {genderOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="District">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="District"
                value={applicant.District}
                onChange={handleApplicantChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="State">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="State"
                value={applicant.State}
                onChange={handleApplicantChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="Pincode"
                value={applicant.Pincode}
                onChange={handleApplicantChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="Ownership">
              <Form.Label>Ownership</Form.Label>
              <Form.Select
                name="Ownership"
                value={applicant.Ownership}
                onChange={handleApplicantChange}
              >
                <option value="">Select</option>
                {ownershipOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="GovtID_Type">
              <Form.Label>ID Type</Form.Label>
              <Form.Select
                name="GovtID_Type"
                value={applicant.GovtID_Type}
                onChange={handleApplicantChange}
              >
                <option value="">Select</option>
                {idTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="ID_Number">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                name="ID_Number"
                value={applicant.ID_Number}
                onChange={handleApplicantChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="Category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="Category"
            value={applicant.Category}
            onChange={handleApplicantChange}
          >
            <option value="">Select</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <hr />
        <h5 className="mt-4">Connection Info</h5>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Load_Applied">
              <Form.Label>Load Applied (Max 200)</Form.Label>
              <Form.Control
                type="number"
                name="Load_Applied"
                value={connection.Load_Applied}
                onChange={handleConnectionChange}
                min={0}
                max={200}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="Status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="Status"
                value={connection.Status}
                onChange={handleConnectionChange}
              >
                <option value="">Select</option>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Reviewer_ID">
              <Form.Label>Reviewer ID</Form.Label>
              <Form.Control
                type="number"
                name="Reviewer_ID"
                value={connection.Reviewer_ID}
                onChange={handleConnectionChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="Reviewer_Name">
              <Form.Label>Reviewer Name</Form.Label>
              <Form.Control
                type="text"
                name="Reviewer_Name"
                value={connection.Reviewer_Name}
                onChange={handleConnectionChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="Reviewer_Comments" className="mb-3">
          <Form.Label>Reviewer Comments</Form.Label>
          <Form.Select
            name="Reviewer_Comments"
            value={connection.Reviewer_Comments}
            onChange={handleConnectionChange}
          >
            <option value="">Select</option>
            {reviewerCommentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update Applicant
        </Button>
      </Form>
    </Container>
  );
}

export default EditApplicant;
