import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";
import { toast } from "react-hot-toast";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (doctorId, status) => {
    try {
      const normalizedStatus = status.toLowerCase();
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",

        { doctorId, status : normalizedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating account status:", error.response?.data || error);
      toast.error(error.response?.data?.message ||  "Something Went Wrong");
    }
    console.log("Doctor ID:", doctorId, "Status:", status);

  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record._id, "Approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger"onClick={() => handleAccountStatus(record._id, "Rejected")}>Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center m-2">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} rowKey={(record) => record._id} />
    </Layout>
  );
};

export default Doctors;
