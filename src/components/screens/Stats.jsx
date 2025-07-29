import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Link } from "react-router-dom";

function Stats() {
  const [selectedStatus, setSelectedStatus] = useState("Connection Realeased");
  const [chartData, setChartData] = useState({ labels: [], total_requests: [] });
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    fetchData(selectedStatus);
  }, [selectedStatus]);

  const fetchData = async (status) => {
    try {
      const url = `/api/connectionrequestdata/?status=${encodeURIComponent(status)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setChartData(data);
      updateCharts(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const updateCharts = (data) => {
    if (chartRef1.current) {
      chartRef1.current.destroy();
    }
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    const ctx1 = canvasRef1.current.getContext("2d");
    const ctx2 = canvasRef2.current.getContext("2d");

    chartRef1.current = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Number of Connection Requests by Month",
            data: data.total_requests,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    chartRef2.current = new Chart(ctx2, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Trend of Connection Requests",
            data: data.total_requests,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="container m-3 p-2 card">
      <div className="row">
        <div className="col-md-3">
          <Link to="/" className="btn btn-dark my-1">
            Go Back
          </Link>
        </div>
      </div>
      <br />
      <h5>Number of Connection Requests in Every Month (Visualization)</h5>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="status" className="form-label">
            Filter By Connection Status
          </label>
          <select
            className="form-select"
            id="status"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="">-- Select Status --</option>
            <option value="Connection Realeased">Connection Realeased</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <canvas ref={canvasRef1} width="100" height="50" />
        </div>
        <div className="col-md-6">
          <canvas ref={canvasRef2} width="100" height="50" />
        </div>
      </div>
    </div>
  );
}

export default Stats;
