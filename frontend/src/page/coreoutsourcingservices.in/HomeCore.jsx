import React from "react";
import Header from "../../componente/Header";
import "../../style/page/core-web-page/coreHome.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Download } from "lucide-react";

import * as XLSX from "xlsx";
import { Trash2 } from "lucide-react";

import { handleError, handleSuccess, handlePromise } from "../../utils/Toast";

function HomeCore() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [careers, setCareers] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [teamDescr, setTeamDescr] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [partnerData, setPartnerData] = useState([]);
  const [partnerImagePop, setPartnerImagePop] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerImage, setPartnerImage] = useState(null);
  const [ourImagePop, setOurImagePop] = useState(null);
  const [loading, setLoading] = useState(false);

  // top state
  const [homePopup, setHomePopup] = useState(false);
  const [partnerPopup, setpartnerPopup] = useState(false);
  const [AddOurTeamPopup, setAddOurTeamPopup] = useState(false);
  const [aboutMePopup, setAboutMePopup] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamStatus, setTeamStatus] = useState("");
  const [teamImage, setTeamImage] = useState(null);

  const date = new Date();

  const downloadMessagesExcel = () => {
    const excelData = messages.map((item) => ({
      Name: item.name,

      Phone: item.number,

      Email: item.work,

      Company: item.company_name,

      Job_Title: item.job_title,

      Industry: item.industry_work,

      Outsourcing: item.currenty_out,

      Contact_Center: item.contect_center,

      Message: item.how_work,

      Date: new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Messages");

    XLSX.writeFile(workbook, "contact_messages.xlsx");
  };

  const downloadExcel = () => {
    const excelData = careers.map((item) => ({
      Name: item.name,

      Email: item.email,

      Phone: item.number,

      Job_Title: item.job_title,

      Resume: item.resume,

      Applied_Date: new Date(item.createdAt).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Careers Data");
    XLSX.writeFile(workbook, "careers_messages.xlsx");
  };

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const currentDate = date.getDate();

  const year = date.getFullYear();

  let userName = localStorage.getItem("loggedInName");

  const getMessages = async () => {
    try {
      const response = await axios.get("https://admin-panel-fawn-iota.vercel.app/contact/form");

      setMessages(response.data.data);
    } catch (error) {
      console.log(error)
      // handleError(error);
    }
  };
  // get api data
  const getCareers = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/careers/fromdata",
      );

      // console.log(response.data);

      setCareers(response.data.data);
    } catch (error) {
      // handleError(error);
      console.log(error)
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `https://admin-panel-fawn-iota.vercel.app/contact/form/${id}`,
      );

      // console.log(response.data);

      // remove ui
      setMessages(messages.filter((item) => item._id !== id));

      handleSuccess(response.data.message || "Message Deleted Successfully");
    } catch (error) {
      // console.log(error);

      handleError(error.response?.data?.message || "Delete Failed");
    }
  };
  // delete career
  const deleteCareer = async (id) => {
    try {
      const response = await axios.delete(
        `https://admin-panel-fawn-iota.vercel.app/careers/fromdata/${id}`,
      );

      // console.log(response.data);

      // ui update
      setCareers(careers.filter((item) => item._id !== id));

      handleSuccess(response.data.message || "Career Deleted Successfully");
    } catch (error) {
      // console.log(error);

      handleError(error.response?.data?.message || "Delete Failed");
    }
  };
  const handlePartnerSubmit = async () => {
    try {
      if (!partnerName || !partnerImage) {
        return handleError("All fields are required");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("name", partnerName);
      formData.append("image", partnerImage);

      const promise = axios.post(
        "https://admin-panel-fawn-iota.vercel.app/partners/create-partner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      handlePromise(promise, {
        loading: "Uploading Partner...",
        success: "Partner Added Successfully 😎",
        error: "Failed To Add Partner 💀",
      });

      const response = await promise;

      // console.log(response.data);

      handleSuccess("Partner Saved");

      // reset
      setPartnerName("");
      setPartnerImage(null);

      setpartnerPopup(false);
    } catch (error) {
      // console.log(error);

      handleError(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleOurTeamSubmit = async () => {
    try {
     if (!teamName || !teamStatus || !teamDescr || !teamImage){
        return handleError("All fields are required");
      }

      const formData = new FormData();

      formData.append("name", teamName);
      formData.append("status", teamStatus);
      formData.append("image", teamImage);
      formData.append("descr", teamDescr);

      const promise = axios.post(
        "https://admin-panel-fawn-iota.vercel.app/ourteam/create-team",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      handlePromise(promise);

      const response = await promise;

      // console.log(response.data);

      handleSuccess("Team Member Added 😎");

      // reset
      setTeamName("");
      setTeamStatus("");
      setTeamImage(null);

      setAddOurTeamPopup(false);
    } catch (error) {
      // console.log(error);

      handleError(error?.response?.data?.message || "Server Error 💀");
    }
  };

  const getTeamData = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/ourteam/get-team",
      );

      
      setTeamData(response.data.data.team);
    } catch (error) {
     console.log(error);
      // handleError(error);
    }
  };
  const getPartners = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/partners/get-partners",
      );

      // console.log(response.data);

      setPartnerData(response.data.data.partners);
    } catch (error) {
      console.log(error);
      // handleError(error);
    }
  };

  useEffect(() => {
    getMessages();
   
    getCareers();
  }, []);
  useEffect(()=>{
 getTeamData();
    getPartners();
  },[partnerPopup,AddOurTeamPopup,])

  let name = "Coreoutsourcingservices.in";
  return (
    <div>
      <Header web={name} />
      <div className="core-container">
        <div className="core-button-list">
          <h3>Header section or page</h3>
          <div className="line"></div>
          <div className="list-of-page">
            <button onClick={() => setHomePopup(true)}>Home</button>
            {/* <button>Services</button> */}
            <button onClick={() => setAboutMePopup(true)}>About Us</button>
            <button>Blogs</button>
            {/* <button>Contacts</button>  */}
            <button>Gallery</button>
            <button>Careers</button>
            <button>Add header or page</button>
          </div>
        </div>

        <div className="core-main">
          <div className="dashboard-header">
            <h5 className="date-text">
              <span>{day}</span>
              <span>{month}</span>
              <span>{currentDate}</span>
              <span>{year}</span>
            </h5>

            <h3 className="welcome-text">
              Welcome back, <span>{userName}</span>
            </h3>
          </div>

          <div className="line"></div>

          <div className="message-wrapper">
            {/* HOME POPUP */}
            {aboutMePopup && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setAboutMePopup(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage Website</h3>

                    <button onClick={() => setAddOurTeamPopup(true)}>
                      Add Our Team
                    </button>

                    <button>Show Our Team</button>
                  </div>

                  {/* right content */}
                  <div className="popup-content">
                    {partnerPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Partner</h2>

                          {/* image */}
                          <div className="input-group">
                            <label>Upload Partner Image</label>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setPartnerImage(e.target.files[0])
                              }
                            />
                          </div>

                          {/* name */}
                          <div className="input-group">
                            <label>Partner Name</label>

                            <input
                              type="text"
                              placeholder="Enter partner name"
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                            />
                          </div>

                          {/* buttons */}
                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setpartnerPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handlePartnerSubmit}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {AddOurTeamPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Employe</h2>

                          {/* image */}
                          <div className="input-group">
                            <label>Upload Employe Image</label>

                            <input type="file" accept="image/*" />
                          </div>

                          {/* name */}
                          <div className="input-group">
                            <label>Employe Name</label>

                            <input
                              type="text"
                              placeholder="Enter partner name"
                            />
                          </div>
                          <div className="input-group">
                            <label>Employe status</label>

                            <input
                              type="text"
                              placeholder="Enter partner name"
                            />
                          </div>

                          {/* buttons */}
                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setAddOurTeamPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={() => setAddOurTeamPopup(false)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="popup-card">
                      <h2>100 Partner photo</h2>
                    </div>

                    <div className="popup-card">
                      <h2>100 Our Team photo </h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {ourImagePop && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                {/* main popup box */}
                <div
                  style={{
                    width: "80%",
                    height: "80vh",
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "20px",
                    position: "relative",
                    overflowY: "auto",
                  }}
                >
                  {/* close button */}
                  <button
                    onClick={() => setOurImagePop(false)}
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </button>

                  {/* image container */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "20px",
                      marginTop: "50px",
                    }}
                  >
                    {teamData.map((item) => (
                      <div
                        key={item._id}
                        style={{
                          background: "#f5f5f5",
                          borderRadius: "15px",
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />

                        <h3
                          style={{
                            marginTop: "10px",
                            fontSize: "20px",
                          }}
                        >
                          {item.name}
                        </h3>

                        <p
                          style={{
                            color: "gray",
                            marginTop: "5px",
                          }}
                        >
                          {item.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {partnerImagePop && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                {/* main popup */}
                <div
                  style={{
                    width: "80%",
                    height: "80vh",
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "20px",
                    position: "relative",
                    overflowY: "auto",
                  }}
                >
                  {/* close button */}
                  <button
                    onClick={() => setPartnerImagePop(false)}
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </button>

                  {/* image container */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "20px",
                      marginTop: "50px",
                    }}
                  >
                    {partnerData.map((item) => (
                      <div
                        key={item._id}
                        style={{
                          background: "#f5f5f5",
                          borderRadius: "15px",
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />

                        <h3
                          style={{
                            marginTop: "10px",
                            fontSize: "20px",
                          }}
                        >
                          {item.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {homePopup && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setHomePopup(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage Website</h3>

                    <button onClick={() => setpartnerPopup(true)}>
                      Add Partner
                    </button>

                    <button onClick={() => setPartnerImagePop(true)}>
                      Show Partner
                    </button>

                    <button onClick={() => setOurImagePop(true)}>
                      Add Our Team
                    </button>

                    <button onClick={() => setOurImagePop(true)}>
                      Show Our Team
                    </button>
                  </div>

                  {/* right content */}
                  <div className="popup-content">
                    {partnerPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Partner</h2>

                          {/* image */}
                          <div className="input-group">
                            <label>Upload Partner Image</label>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setPartnerImage(e.target.files[0])
                              }
                            />
                          </div>

                          {/* name */}
                          <div className="input-group">
                            <label>Partner Name</label>

                            <input
                              type="text"
                              placeholder="Enter partner name"
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                            />
                          </div>

                          {/* buttons */}
                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setpartnerPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handlePartnerSubmit}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* our team pop hai */}
                    {AddOurTeamPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Employe</h2>

                          {/* image */}
                          <div className="input-group">
                            <label>Upload Employe Image</label>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setTeamImage(e.target.files[0])}
                            />
                          </div>

                          {/* name */}
                          <div className="input-group">
                            <label>Employe Name</label>

                            <input
                              type="text"
                              placeholder="Enter Employe name"
                              value={teamName}
                              onChange={(e) => setTeamName(e.target.value)}
                            />
                          </div>

                          {/* status */}
                          <div className="input-group">
                            <label>Employe status</label>

                            <input
                              type="text"
                              placeholder="Enter Employe status"
                              value={teamStatus}
                              onChange={(e) => setTeamStatus(e.target.value)}
                            />
                          </div>
                          <div className="input-group">
                            <label>Employe Description</label>

                            <textarea
                              placeholder="Enter Employe Description"
                              value={teamDescr}
                              onChange={(e) => setTeamDescr(e.target.value)}
                            />
                          </div>

                          {/* buttons */}
                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setAddOurTeamPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handleOurTeamSubmit}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <div className="popup-card">
                      <h2>100 Partner photo</h2>
                    </div>

                    <div className="popup-card">
                      <h2>100 Our Team photo </h2>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
            {/* popup modal */}
            {selectedMessage && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    width: "600px",
                    maxWidth: "90%",
                    padding: "25px",
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  {/* close button */}
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "red",
                      color: "#fff",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </button>

                  <h2>{selectedMessage.name}</h2>

                  <hr />

                  <p>
                    <strong>Phone:</strong> {selectedMessage.number}
                  </p>

                  <p>
                    <strong>Email:</strong> {selectedMessage.work}
                  </p>

                  <p>
                    <strong>Company:</strong> {selectedMessage.company_name}
                  </p>

                  <p>
                    <strong>Job Title:</strong> {selectedMessage.job_title}
                  </p>

                  <p>
                    <strong>Industry:</strong> {selectedMessage.industry_work}
                  </p>

                  <p>
                    <strong>Outsourcing:</strong> {selectedMessage.currenty_out}
                  </p>

                  <p>
                    <strong>Contact Center:</strong>{" "}
                    {selectedMessage.contect_center}
                  </p>

                  <p>
                    <strong>Message:</strong> {selectedMessage.how_work}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* popup modal */}
            {selectedCareer && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    width: "650px",
                    maxWidth: "90%",
                    padding: "25px",
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  {/* close */}
                  <button
                    onClick={() => setSelectedCareer(null)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "red",
                      color: "#fff",
                      padding: "6px 12px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    X
                  </button>

                  <h2>{selectedCareer.name}</h2>

                  <hr />

                  <p>
                    <strong>Email:</strong> {selectedCareer.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {selectedCareer.number}
                  </p>

                  <p>
                    <strong>Job Title:</strong> {selectedCareer.job_title}
                  </p>

                  <p>
                    <strong>Applied Date:</strong>{" "}
                    {new Date(selectedCareer.createdAt).toLocaleString()}
                  </p>

                  {/* resume download */}
                  <a
                    href={selectedCareer.resume}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "20px",
                      background: "#111",
                      color: "#fff",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      textDecoration: "none",
                    }}
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            )}
            {/* Contact Box */}
            <div className="message-card">
              {/* header */}
              <div
                className="card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Contact Messages</h4>

                {/* excel icon */}
                <button
                  onClick={downloadMessagesExcel}
                  style={{
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Download size={20} />
                </button>
              </div>

              {/* messages list */}
              <div className="message-list">
                {messages.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      position: "relative",
                      marginBottom: "10px",
                    }}
                    className="message-item"
                  >
                    <button
                      className="main-btn"
                      onClick={() => setSelectedMessage(item)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <span>{item.name}</span>

                      <span>
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </button>

                    {/* delete icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        deleteMessage(item._id);
                      }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "red",
                        color: "#fff",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "none",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="delete-btn"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Box */}
            <div className="message-card">
              {/* header */}
              <div
                className="card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Careers Messages</h4>

                {/* excel download icon */}
                <button
                  onClick={downloadExcel}
                  style={{
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Download size={20} />
                </button>
              </div>

              {/* careers list */}
              <div className="button-group">
                {careers.map((item) => (
                  <button
                    key={item._id}
                    className="main-btn"
                    onClick={() => setSelectedCareer(item)}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                      cursor: "pointer",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{item.name}</span>

                      <span>{item.job_title}</span>

                      {new Date(item.createdAt).toLocaleString()}

                      <Trash2
                        size={18}
                        className="c_btm"
                        onClick={() => deleteCareer(item._id)}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCore;
