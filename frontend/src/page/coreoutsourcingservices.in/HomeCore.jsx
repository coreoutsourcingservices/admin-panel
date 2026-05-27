import React from "react";
import Header from "../../componente/Header";
import "../../style/page/core-web-page/coreHome.css";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Download } from "lucide-react";

import * as XLSX from "xlsx";
import { Trash2 } from "lucide-react";

import { handleError, handleSuccess, handlePromise } from "../../utils/Toast";

function HomeCore() {
  const [messages, setMessages] = useState([]);
  const [galleryData, setGalleryData] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [careers, setCareers] = useState([]);
  const [teamProperty, setTeamProperty] = useState("about_us");
  const [teamData, setTeamData] = useState([]);
  const [partnerProperty, setPartnerProperty] = useState("about_us");
  const [teamDescr, setTeamDescr] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [partnerData, setPartnerData] = useState([]);
  const [partnerImagePop, setPartnerImagePop] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerImage, setPartnerImage] = useState(null);
  const [ourImagePop, setOurImagePop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teamSecondName, setTeamSecondName] = useState("");
  const [teamSecondStatus, setTeamSecondStatus] = useState("");
  const [teamSecondImage, setTeamSecondImage] = useState(null);
  const [showBlogPopup, setShowBlogPopup] = useState(false);
  const [savingBlge, setSavingBloge] = useState(false);
  const [blogData, setBlogData] = useState([]);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [teamSecondPopup, setTeamSecondPopup] = useState(false);
  const [teamSecondData, setTeamSecondData] = useState([]);
  const [blogHeading, setBlogHeading] = useState("");
  const [writerName, setWriterName] = useState("");
  const [blogImages, setBlogImages] = useState([]);

  const [descriptionImage, setDescriptionImage] = useState("");
  const [descriptions, setDescriptions] = useState([
    {
      description_heading: "",
      description_text: "",
    },
  ]);

  const [faqs, setFaqs] = useState([
    {
      Question: "",
      answering: "",
    },
  ]);
  const [galleryName, setGalleryName] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [addGalleryPopup, setAddGalleryPopup] = useState(false);
  const [addBlogPopup, setAddBlogPopup] = useState(false);

  const [allGalleryPhotos, setAllGalleryPhotos] = useState([]);

  // top state
  const [homePopup, setHomePopup] = useState(false);
  const [blogPopup, setBlgePopup] = useState(false);
  const [galleryPopup, setGalleryPopup] = useState(false);
  const [partnerPopup, setpartnerPopup] = useState(false);
  const [AddOurTeamPopup, setAddOurTeamPopup] = useState(false);
  const [aboutMePopup, setAboutMePopup] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamStatus, setTeamStatus] = useState("");
  const [teamImage, setTeamImage] = useState(null);

  const [showAllGalleryPopup, setShowAllGalleryPopup] = useState(false);

  const [singleGalleryPopup, setSingleGalleryPopup] = useState(false);

  const [allGalleryData, setAllGalleryData] = useState([]);

  const [selectedGallery, setSelectedGallery] = useState(null);

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
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/contact/form",
      );

      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

      formData.append("property", partnerProperty);

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

      console.log(response);

      handleSuccess("Partner Saved");

      // reset
      setPartnerName("");
      setPartnerImage(null);
      setPartnerProperty("about_us");

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
      if (!teamName || !teamStatus || !teamDescr || !teamImage) {
        return handleError("All fields are required");
      }

      const formData = new FormData();

      formData.append("name", teamName);
      formData.append("status", teamStatus);
      formData.append("image", teamImage);
      formData.append("descr", teamDescr);
      formData.append("property", teamProperty);

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
      setTeamProperty("about_us");

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

  const handleTeamSecondSubmit = async () => {
    try {
      if (!teamSecondName || !teamSecondStatus || !teamSecondImage) {
        return handleError("All fields are required");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("name", teamSecondName);
      formData.append("status", teamSecondStatus);
      formData.append("image", teamSecondImage);

      const promise = axios.post(
        "https://admin-panel-fawn-iota.vercel.app/teamsecond/create-team-second",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      handlePromise(promise, {
        loading: "Uploading Employee...",
        success: "Employee Added Successfully 😎",
        error: "Failed To Add Employee 💀",
      });

      const response = await promise;

      handleSuccess(response.data.message);

      // reset
      setTeamSecondName("");
      setTeamSecondStatus("");
      setTeamSecondImage(null);

      setAddOurTeamPopup(false);
    } catch (error) {
      console.log(error);

      handleError(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const getTeamSecondData = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/teamsecond/get-team-second",
      );

      setTeamSecondData(response.data.data);
    } catch (error) {
      console.log(error);

      handleError("Failed To Fetch Team Data");
    }
  };

  // gallary data
  const onDropGallery = useCallback((acceptedFiles) => {
    setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },

    multiple: true,

    maxFiles: 50,

    onDrop: onDropGallery,
  });

  const handleGallerySubmit = async () => {
    try {
      if (!galleryName || galleryFiles.length === 0) {
        return handleError("All fields are required");
      }

      setLoading(true);

      // SINGLE FORMDATA
      const formData = new FormData();

      // multiple files
      galleryFiles.forEach((file) => {
        formData.append("media", file);
      });

      // text data
      formData.append("galleryName", galleryName);

      formData.append("description", galleryDescription);

      // api
      const response = await axios.post(
        "https://admin-panel-fawn-iota.vercel.app/gallery/add-gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      handleSuccess("Gallery Uploaded 😎");

      // reset
      setGalleryName("");
      setGalleryDescription("");
      setGalleryFiles([]);

      setAddGalleryPopup(false);
    } catch (error) {
      console.log(error);

      handleError(error?.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GET ALL GALLERY
  // =========================================

  const getAllGallery = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/gallery/get-gallery",
      );

      // console.log(response.data);

      setAllGalleryData(response.data.data);
      setGalleryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addDescription = () => {
    setDescriptions([
      ...descriptions,
      {
        description_heading: "",
        description_text: "",
      },
    ]);
  };
  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        Question: "",
        answering: "",
      },
    ]);
  };

  const handleBlogSubmit = async () => {
    try {
      setSavingBloge(true);
      const formData = new FormData();

      formData.append("heading", blogHeading);

      formData.append(
        "blag",
        JSON.stringify({
          writer_name: writerName,

          description_imga: descriptionImage,

          description: descriptions,

          FAQ: faqs,
        }),
      );

      blogImages.forEach((img) => {
        formData.append("image", img);
      });

      const response = await axios.post(
        "https://admin-panel-fawn-iota.vercel.app/bloge/add-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      handleSuccess("Blog Added Successfully 😎");

      console.log(response.data);

      setBlgePopup(false);

      setBlogHeading("");
      setWriterName("");
      setBlogImages([]);
      setDescriptionImage("");
    } catch (error) {
      console.log(error);

      handleError(error?.response?.data?.message || "Blog Upload Failed");
    }
    finally {
    setSavingBloge(false);
  }
  };

  const renderContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    const bulletLines = lines.filter(
      (line) => line.trim().startsWith("•") || line.trim().startsWith("-"),
    );

    if (bulletLines.length > 0) {
      return (
        <>
          {lines
            .filter(
              (line) =>
                !line.trim().startsWith("•") && !line.trim().startsWith("-"),
            )
            .map((line, index) =>
              line.trim() ? <p key={index}>{line}</p> : null,
            )}

          <ul className="blog-list">
            {bulletLines.map((item, index) => (
              <li key={index}>{item.replace(/^[-•]\s*/, "")}</li>
            ))}
          </ul>
        </>
      );
    }

    return <p>{text}</p>;
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(
        "https://admin-panel-fawn-iota.vercel.app/bloge/get-blogs",
      );

      setBlogData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [showBlogPopup]);

  useEffect(() => {}, [galleryPopup]);

  useEffect(() => {
    getTeamSecondData();
  }, [teamSecondPopup]);

  useEffect(() => {
    getMessages();
    getAllGallery();

    getCareers();
  }, []);
  useEffect(() => {
    getTeamData();
    getPartners();
  }, [partnerPopup, AddOurTeamPopup]);

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
            <button onClick={() => setBlgePopup(true)}>Blogs</button>
            {/* <button>Contacts</button>  */}
            <button onClick={() => setGalleryPopup(true)}>Gallery</button>

            <button disabled>Careers</button>
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

                    <button onClick={() => setTeamSecondPopup(true)}>
                      Show Our Team
                    </button>
                  </div>

                  {/* right content */}
                  <div className="popup-content">
                    {/* hhhhhhhhhhhhhhhhhhhhhhhh */}
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
                              onChange={(e) =>
                                setTeamSecondImage(e.target.files[0])
                              }
                            />
                          </div>

                          {/* name */}
                          <div className="input-group">
                            <label>Employe Name</label>

                            <input
                              type="text"
                              placeholder="Enter Employe name"
                              value={teamSecondName}
                              onChange={(e) =>
                                setTeamSecondName(e.target.value)
                              }
                            />
                          </div>
                          <div className="input-group">
                            <label>Employe status</label>

                            <input
                              type="text"
                              placeholder="Enter Employe status"
                              value={teamSecondStatus}
                              onChange={(e) =>
                                setTeamSecondStatus(e.target.value)
                              }
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
                              onClick={handleTeamSecondSubmit}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {teamSecondPopup && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100vh",
                          background: "rgba(0,0,0,0.5)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 9999,
                        }}
                      >
                        {/* MAIN BOX */}
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
                          {/* CLOSE BUTTON */}
                          <button
                            onClick={() => setTeamSecondPopup(false)}
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                              background: "red",
                              color: "#fff",
                              border: "none",
                              padding: "10px 18px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            Close
                          </button>

                          {/* GRID */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                              gap: "20px",
                              marginTop: "60px",
                            }}
                          >
                            {teamSecondData.map((item) => (
                              <div
                                key={item._id}
                                style={{
                                  background: "#f5f5f5",
                                  borderRadius: "15px",
                                  overflow: "hidden",
                                  padding: "15px",
                                  textAlign: "center",
                                }}
                              >
                                {/* IMAGE */}
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

                                {/* NAME */}
                                <h2
                                  style={{
                                    marginTop: "15px",
                                    fontSize: "22px",
                                  }}
                                >
                                  {item.name}
                                </h2>

                                {/* STATUS */}
                                <p
                                  style={{
                                    marginTop: "8px",
                                    color: "gray",
                                    fontSize: "16px",
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
            {partnerPopup && (
              <div className="inner-popup-overlay">
                <div className="inner-popup">
                  <h2>Add Partner</h2>

                  <div className="input-group">
                    <label>Upload Partner Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPartnerImage(e.target.files[0])}
                    />
                  </div>

                  <div className="input-group">
                    <label>Partner Name</label>
                    <input
                      type="text"
                      placeholder="Enter partner name"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Property</label>

                    <select
                      value={partnerProperty}
                      onChange={(e) => setPartnerProperty(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        marginTop: "10px",
                      }}
                    >
                      <option value="home">Home</option>

                      <option value="about_us">About Us</option>
                    </select>
                  </div>

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

                    <button onClick={() => setAddOurTeamPopup(true)}>
                      Add Our Team Manager
                    </button>

                    <button onClick={() => setOurImagePop(true)}>
                      Show Our Team Manager
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
                          {/* property dropdown */}
                          <div className="input-group">
                            <label>Property</label>

                            <select
                              value={partnerProperty}
                              onChange={(e) =>
                                setPartnerProperty(e.target.value)
                              }
                              style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                              }}
                            >
                              <option value="home">Home</option>

                              <option value="about_us">About Us</option>
                            </select>
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
                          <div className="input-group">
                            <label>Select Page</label>

                            <select
                              value={teamProperty}
                              onChange={(e) => setTeamProperty(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                              }}
                            >
                              <option value="home">Home</option>
                              <option value="about_us">About Us</option>
                            </select>
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

            {galleryPopup && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setGalleryPopup(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage Gallery</h3>

                    <button onClick={() => setAddGalleryPopup(true)}>
                      Add Gallary
                    </button>

                    <button onClick={() => setShowAllGalleryPopup(true)}>
                      Show All Gallary collection
                    </button>
                  </div>

                  {/* right content */}

                  <div className="popup-content">
                    {addGalleryPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Gallery</h2>

                          {/* Gallery Name */}
                          <div className="input-group">
                            <label>Gallery Name</label>

                            <input
                              type="text"
                              placeholder="Enter Gallery Name"
                              value={galleryName}
                              onChange={(e) => setGalleryName(e.target.value)}
                            />
                          </div>

                          {/* Description */}
                          <div className="input-group">
                            <label>Description</label>

                            <textarea
                              placeholder="Enter Description"
                              value={galleryDescription}
                              onChange={(e) =>
                                setGalleryDescription(e.target.value)
                              }
                            />
                          </div>

                          {/* Drag Drop */}
                          <div className="input-group">
                            <label>Upload Images/Videos</label>

                            <div {...getRootProps()} className="drag-drop-box">
                              <input {...getInputProps()} />

                              <p>
                                {isDragActive
                                  ? "Drop Files Here 😎"
                                  : "Drag & Drop Images/Videos Here"}
                              </p>

                              <span className="upload-limit">
                                Max Upload 50 Files
                              </span>
                            </div>
                          </div>

                          {/* Preview */}
                          {/* Preview */}
                          <div style={{ width: "100%", height: "500px" }}>
                            <div className="gallery-preview-grid">
                              {galleryFiles?.map((file, index) => {
                                const previewUrl = URL.createObjectURL(file);

                                return (
                                  <div className="preview-card" key={index}>
                                    {/* REMOVE */}
                                    <button
                                      type="button"
                                      className="remove-file-btn"
                                      onClick={() => {
                                        setGalleryFiles((prev) =>
                                          prev.filter((_, i) => i !== index),
                                        );
                                      }}
                                    >
                                      ✕
                                    </button>

                                    {/* IMAGE */}
                                    {file.type?.startsWith("image") ? (
                                      <img src={previewUrl} alt="preview" />
                                    ) : (
                                      <video src={previewUrl} controls />
                                    )}

                                    {/* FILE NAME */}
                                    <p className="file-name">{file.name}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setAddGalleryPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handleGallerySubmit}
                              disabled={loading}
                            >
                              {loading ? "Uploading..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showAllGalleryPopup && (
                      <div className="gallery-main-popup">
                        <div className="gallery-main-popup-inner">
                          {/* CLOSE */}
                          <button
                            className="gallery-close-btn"
                            onClick={() => setShowAllGalleryPopup(false)}
                          >
                            ✕
                          </button>

                          <h2>Show All Collection</h2>

                          {/* CARD WRAPPER */}
                          <div className="gallery-card-wrapper">
                            {allGalleryData?.map((item, index) => {
                              // first media
                              const firstMedia = item.gallery?.[0];

                              return (
                                <div
                                  key={index}
                                  className="gallery-card"
                                  onClick={() => {
                                    setSelectedGallery(item);

                                    setSingleGalleryPopup(true);
                                  }}
                                >
                                  {/* IMAGE */}
                                  {firstMedia?.image ? (
                                    <img src={firstMedia.image} />
                                  ) : (
                                    <video src={firstMedia?.video} />
                                  )}

                                  {/* INFO */}
                                  <div className="gallery-card-info">
                                    <h3>{item.galleryName}</h3>

                                    <p>
                                      Photos:
                                      {item.totalPhotos}
                                    </p>

                                    <p>
                                      Videos:
                                      {item.totalVideos}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {singleGalleryPopup && (
                      <div className="gallery-main-popup">
                        <div className="gallery-single-popup-inner">
                          {/* CLOSE */}
                          <button
                            className="gallery-close-btn"
                            onClick={() => setSingleGalleryPopup(false)}
                          >
                            ✕
                          </button>

                          <h2>{selectedGallery?.galleryName}</h2>

                          {/* MEDIA */}
                          <div className="single-gallery-grid">
                            {selectedGallery?.gallery?.map((item, index) => (
                              <div key={index} className="single-gallery-card">
                                {item.image ? (
                                  <img src={item.image} alt="" />
                                ) : (
                                  <video src={item.video} controls />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* =========================================
ALL PHOTO POPUP
========================================= */}

                    <div className="gallery-stats-card">
                      <h2>{galleryData?.totalGallery}</h2>

                      <p>Total Gallery</p>
                    </div>

                    <div className="gallery-stats-card">
                      <h2>{galleryData?.totalPhotos}</h2>

                      <p>Total Photos</p>
                    </div>

                    <div className="gallery-stats-card">
                      <h2>{galleryData?.totalVideos}</h2>

                      <p>Total Videos</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {blogPopup && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setBlgePopup(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage Bloge</h3>

                    <button onClick={() => setAddBlogPopup(true)}>
                      Add Blog
                    </button>

                    <button onClick={() => setShowBlogPopup(true)}>
                      Show Blogs
                    </button>
                  </div>

                  {/* right content */}
                  <div className="popup-content">
                    {addBlogPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Blog</h2>

                          <div className="input-group">
                            <label>Blog Heading</label>

                            <input
                              type="text"
                              value={blogHeading}
                              onChange={(e) => setBlogHeading(e.target.value)}
                              placeholder="Enter Blog Heading"
                            />
                          </div>

                          <div className="input-group">
                            <label>Writer Name</label>

                            <input
                              type="text"
                              value={writerName}
                              onChange={(e) => setWriterName(e.target.value)}
                              placeholder="Enter Writer Name"
                            />
                          </div>

                          <div className="input-group">
                            <label>Blog Images</label>

                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) =>
                                setBlogImages([...e.target.files])
                              }
                            />
                          </div>

                          <div className="input-group">
                            <label>Description Image Text</label>

                            <input
                              type="text"
                              value={descriptionImage}
                              onChange={(e) =>
                                setDescriptionImage(e.target.value)
                              }
                            />
                          </div>

                          {descriptions.map((item, index) => (
                            <div key={index}>
                              <div className="input-group">
                                <label>Description Heading {index + 1}</label>

                                <input
                                  type="text"
                                  value={item.description_heading}
                                  onChange={(e) => {
                                    const updated = [...descriptions];

                                    updated[index].description_heading =
                                      e.target.value;

                                    setDescriptions(updated);
                                  }}
                                />
                              </div>

                              <div className="input-group">
                                <label>Description Text {index + 1}</label>

                                <textarea
                                  rows="5"
                                  value={item.description_text}
                                  onChange={(e) => {
                                    const updated = [...descriptions];

                                    updated[index].description_text =
                                      e.target.value;

                                    setDescriptions(updated);
                                  }}
                                />
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="save-btn"
                            onClick={addDescription}
                            style={{ marginBottom: "20px" }}
                          >
                            + Add Description
                          </button>

                          {faqs.map((item, index) => (
                            <div key={index}>
                              <div className="input-group">
                                <label>FAQ Question {index + 1}</label>

                                <input
                                  type="text"
                                  value={item.Question}
                                  onChange={(e) => {
                                    const updated = [...faqs];

                                    updated[index].Question = e.target.value;

                                    setFaqs(updated);
                                  }}
                                />
                              </div>

                              <div className="input-group">
                                <label>FAQ Answer {index + 1}</label>

                                <textarea
                                  rows="4"
                                  value={item.answering}
                                  onChange={(e) => {
                                    const updated = [...faqs];

                                    updated[index].answering = e.target.value;

                                    setFaqs(updated);
                                  }}
                                />
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="save-btn"
                            onClick={addFaq}
                            style={{ marginBottom: "20px" }}
                          >
                            + Add FAQ
                          </button>

                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setAddBlogPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handleBlogSubmit}
                            >
                              {savingBlge ? (
                                <>
                                  <span className="spinner"></span>
                                  Saving...
                                </>
                              ) : (
                                "Save Blog"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showBlogPopup && (
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
                            width: "80%",
                            height: "80vh",
                            background: "#fff",
                            borderRadius: "20px",
                            padding: "20px",
                            position: "relative",
                            overflowY: "auto",
                          }}
                        >
                          <button
                            onClick={() => setShowBlogPopup(false)}
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
                            }}
                          >
                            X
                          </button>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                              gap: "20px",
                              marginTop: "50px",
                            }}
                          >
                            {blogData.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => {
                                  setSelectedBlog(item);
                                }}
                                style={{
                                  background: "#f5f5f5",
                                  borderRadius: "15px",
                                  padding: "15px",
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  src={item?.blag?.[0]?.image?.[0]?.photo}
                                  alt=""
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
                                  }}
                                >
                                  {item.heading}
                                </h3>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBlog && (
                      <div className="blog-details-overlay">
                        <div className="blog-body">
                          <div className="blog-details-popup">
                            <button
                              className="blog-close-btn"
                              onClick={() => setSelectedBlog(null)}
                            >
                              ✕
                            </button>

                            <h1 className="blog-main-heading">
                              {selectedBlog.heading}
                            </h1>

                            <h3 className="blog-writer">
                              Written By :{" "}
                              {selectedBlog?.blag?.[0]?.writer_name}
                              <p className="blog-date">
                                Published On :{" "}
                                {new Date(
                                  selectedBlog.createdAt,
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </h3>

                            <div className="blog-image-grid">
                              {selectedBlog?.blag?.[0]?.image?.length > 0 && (
                                <img
                                  src={
                                    selectedBlog?.blag?.[0]?.image?.[0]?.photo
                                  }
                                  alt={selectedBlog.heading}
                                />
                              )}
                            </div>

                            <p className="blog-intro">
                              {selectedBlog?.blag?.[0]?.description_imga}
                            </p>

                            {selectedBlog?.blag?.[0]?.description?.map(
                              (item) => (
                                <div key={item._id} className="blog-section">
                                  <h2>{item.description_heading}</h2>

                                  <div className="blog-content-text">
                                    {item.description_text}
                                  </div>
                                </div>
                              ),
                            )}

                            <h2 className="blog-faq-title">
                              Frequently Asked Questions
                            </h2>

                            {selectedBlog?.blag?.[0]?.FAQ?.map((faq) => (
                              <div key={faq._id} className="blog-faq-card">
                                <h4>{faq.Question}</h4>

                                <p>{faq.answering}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
