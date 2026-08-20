import { useEffect, useState } from "react";
import Header from "../../componente/Header";
import "../../style/page/core-web-page/coreHome.css";

import axios from "axios";
import { Download } from "lucide-react";

import JoditEditor from "jodit-react";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { backendUrl } from "../../utils/api.js";
import * as XLSX from "xlsx";
import { handleError, handleSuccess } from "../../utils/Toast";


function HomeWishlan() {

  const [wishlanBlogHeading, setWishlanBlogHeading] = useState("");
  const [wishlanBlogWriter, setWishlanBlogWriter] = useState("");
  const [wishlanBlogImage, setWishlanBlogImage] = useState(null);
  const [wishlanBlogContent, setWishlanBlogContent] = useState("");
  const [wishlanSavingBlog, setWishlanSavingBlog] = useState(false);

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [resumeDownloadUrl, setResumeDownloadUrl] = useState(null);
  const [resumeViewUrl, setResumeViewUrl] = useState(null);
  const [showBlogPopup, setShowBlogPopup] = useState(false);
  const [savingBlge, setSavingBloge] = useState(false);
  const [wishlenBlge, setWishlenBlge] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [jobPop, setJobPop] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [WLPgetdata, setWLPgetdata] = useState(false);
  const [wlpData, setWlpData] = useState([]);
  const [wlpLoading, setWlpLoading] = useState(false);
  const [wlpError, setWlpError] = useState("");
  const [addBlogPopup, setAddBlogPopup] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [showJobsPopup, setShowJobsPopup] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [blogPopup, setBlgePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobPopup, setJobPopup] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [salary, setSalary] = useState("");
  const [jobTime, setJobTime] = useState("Full Time");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("E2 Sector 63, Noida, 201301");
  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const date = new Date();

  const downloadMessagesExcel = () => {
    const excelData = messages.map((item) => ({
      Name: item.name,

      Email: item.email,

      Message: item.message,

      Date: new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Contact Messages"
    );

    XLSX.writeFile(workbook, "contact_messages.xlsx");
  };



  const downloadExcel = () => {
    const excelData = careers.map((item) => ({
      Name: item.name,
      Email: item.email,
      Phone: item.number,
      Position: item.position,
      Resume_Link: item.rusume,
      Applied_Date: new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Career Applications"
    );

    XLSX.writeFile(workbook, "career_applications.xlsx");
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
        `${backendUrl}/wishlan/content`,
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
        `${backendUrl}/wishlan/get-career`,
      );

      // console.log(response.data);

      setCareers(response.data.data);
    } catch (error) {
      // handleError(error);
      console.log(error);
    }
  };
  const getWhiteLabelPartnerData = async () => {
    try {
      setWlpLoading(true);
      setWlpError("");

      const response = await axios.get(
        "https://pk.coreoutsourcingservices.in/wishlan/enquiry"
      );

      if (response.data.success) {
        setWlpData(response.data.data || []);
      }
    } catch (error) {
      console.log(error);

      setWlpError(
        error.response?.data?.message ||
        "White Label Partner data load nahi ho paya"
      );
    } finally {
      setWlpLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/wishlan/content/${id}`,
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
        `${backendUrl}/wishlan/detate-career/${id}`,
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
        `${backendUrl}/wishlan/get-blogs`,
      );

      setBlogData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  const getBlogsOne = async (id) => {
    try {

      const response = await axios.get(
        `${backendUrl}/wishlan/get-blogs/${id}`,
      );




      setSelectedBlog(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(selectedBlog)




  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/wishlan/delete-blog/${id}`,
      );

      handleSuccess(response.data.message || "Blog Deleted Successfully");

      setBlogData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      handleError(error.response?.data?.message || "Delete Failed");
    }
  };
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog._id);

    setWishlanBlogHeading(blog.BlogHeading || "");
    setWishlanBlogWriter(blog.BlogWriter || "");
    setWishlanBlogContent(blog.BlogContent || "");

    // Important:
    // Existing image ko file input mein set nahi kar sakte.
    // Isliye null rakhenge.
    // Agar new image select nahi ki to backend old image preserve karega.
    setWishlanBlogImage(null);

    // Show Blogs close
    setShowBlogPopup(false);

    // Add/Edit Blog popup open
    setAddBlogPopup(true);
  };

  const handleJobSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/job/add-job", {
        jobName,
        jobSummary,
        salary,
        jobTime,
        experience,
        location,
        qualification,
        skills: skills.split(",").map((item) => item.trim()),
        keyResponsibilities: keyResponsibilities
          .split(",")
          .map((item) => item.trim()),
      });

      if (data.success) {
        alert("Job Added Successfully");

        setJobName("");
        setJobSummary("");
        setSalary("");
        setJobTime("Full Time");
        setExperience("");
        setLocation("E2 Sector 63, Noida, 201301");
        setQualification("");
        setSkills("");
        setKeyResponsibilities("");

        setJobPopup(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getJobs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/job/get-jobs`);

      setJobsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteJob = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/job/delete-job/${id}`,
      );

      setJobsData((prev) => prev.filter((item) => item._id !== id));

      handleSuccess(response.data.message || "Job Deleted Successfully");
    } catch (error) {
      handleError(error.response?.data?.message || "Delete Failed");
    }
  };

  // <------- no delete

  useEffect(() => {
    if (showJobsPopup) {
      getJobs();
    }
  }, [showJobsPopup]);

  useEffect(() => {
    getBlogs();
  }, [showBlogPopup]);





  useEffect(() => {
    getMessages();


    getCareers();
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      placeholder: "Write your blog here...",

      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "paragraph",
        "|",
        "image",
        "link",
        "table",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "fullsize"
      ],

      uploader: {
        insertImageAsBase64URI: true
      }
    }),
    []
  );

  const handleWishlanBlogSubmit = async () => {
    try {
      setWishlanSavingBlog(true);

      const formData = new FormData();

      const wishlanBlogHeadingURL = wishlanBlogHeading
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      formData.append("BlogHeading", wishlanBlogHeading);
      formData.append("BlogHeadingURL", wishlanBlogHeadingURL);
      formData.append("BlogWriter", wishlanBlogWriter);
      formData.append("BlogContent", wishlanBlogContent);

      // New image selected hai tabhi image bhejo
      if (wishlanBlogImage) {
        formData.append("BlogImage", wishlanBlogImage);
      }

      let response;

      if (editingBlogId) {
        // EDIT BLOG
        response = await axios.put(
          `${backendUrl}/wishlan/update-blog/${editingBlogId}`,
          formData
        );
      } else {
        // ADD BLOG
        response = await axios.post(
          `${backendUrl}/wishlan/create-blog`,
          formData
        );
      }

      handleSuccess(
        response.data.message ||
        (editingBlogId
          ? "Blog Updated Successfully"
          : "Blog Created Successfully")
      );

      // Form reset
      setWishlanBlogHeading("");
      setWishlanBlogWriter("");
      setWishlanBlogImage(null);
      setWishlanBlogContent("");

      // Edit mode reset
      setEditingBlogId(null);

      // Popup close
      setAddBlogPopup(false);

      // Updated blogs reload
      await getBlogs();

    } catch (error) {
      console.log(error);

      handleError(
        error.response?.data?.message ||
        (editingBlogId
          ? "Blog Update Failed"
          : "Blog Creation Failed")
      );
    } finally {
      setWishlanSavingBlog(false);
    }
  };


  const getResumeDownloadUrl = (url) => {
    if (!url) return "";

    // Cloudinary image URL
    if (url.includes("res.cloudinary.com")) {
      return url.replace(
        "/image/upload/",
        "/image/upload/fl_attachment/"
      );
    }

    return url;
  };
  const deleteWhiteLabelPartner = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    const response = await axios.delete(
      `https://pk.coreoutsourcingservices.in/wishlan/enquiry/${id}`
    );

    setWlpData((prev) =>
      prev.filter((item) => item._id !== id)
    );

    handleSuccess(
      response.data.message || "Enquiry deleted successfully"
    );
  } catch (error) {
    console.log(error);

    handleError(
      error.response?.data?.message ||
      "Enquiry delete failed"
    );
  }
};


  let name = "Wishlan.in";
  return (
    <div>
      <Header web={name} />
      <div className="core-container">
        <div className="core-button-list">
          <h3>Header section or page</h3>
          <div className="line"></div>
          <div className="list-of-page">





            <button onClick={() => setJobPop(true)}>Careers</button>
            <button onClick={() => setWishlenBlge(true)}>bloge </button>
            <button
              onClick={() => {
                setWLPgetdata(true);
                getWhiteLabelPartnerData();
              }}
            >
              White Label Partner
            </button>
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

            {wishlenBlge && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setWishlenBlge(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage Blog</h3>

                    <button
                      onClick={() => {
                        setEditingBlogId(null);
                        setWishlanBlogHeading("");
                        setWishlanBlogWriter("");
                        setWishlanBlogImage(null);
                        setWishlanBlogContent("");
                        setAddBlogPopup(true);
                      }}
                    >
                      Add Blogs
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
                          <div className="wishlan-blog-container">

                            <h2>
                              {editingBlogId ? "Edit Wishlan Blog" : "Wishlan Blog Editor"}
                            </h2>

                            <input
                              className="wishlan-input"
                              type="text"
                              placeholder="Blog Heading"
                              value={wishlanBlogHeading}
                              onChange={(e) =>
                                setWishlanBlogHeading(e.target.value)
                              }
                            />

                            <input
                              className="wishlan-input"
                              type="text"
                              placeholder="Writer Name"
                              value={wishlanBlogWriter}
                              onChange={(e) =>
                                setWishlanBlogWriter(e.target.value)
                              }
                            />

                            <input
                              className="wishlan-file"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setWishlanBlogImage(
                                  e.target.files[0]
                                )
                              }
                            />

                            <JoditEditor
                              value={wishlanBlogContent}
                              config={config}
                              onBlur={(newContent) =>
                                setWishlanBlogContent(newContent)
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                gap: "30px"
                              }}
                            >



                              <button
                                className="wishlan-save-btn"
                                onClick={() => {
                                  setAddBlogPopup(false);
                                  setEditingBlogId(null);
                                  setWishlanBlogHeading("");
                                  setWishlanBlogWriter("");
                                  setWishlanBlogImage(null);
                                  setWishlanBlogContent("");
                                }}
                                style={{
                                  backgroundColor: "#c8c8c8",
                                  color: "black",
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                className="wishlan-save-btn"
                                onClick={handleWishlanBlogSubmit}
                              >
                                {wishlanSavingBlog
                                  ? editingBlogId
                                    ? "Updating..."
                                    : "Saving..."
                                  : editingBlogId
                                    ? "Update Blog"
                                    : "Save Blog"}
                              </button>
                            </div>



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
                            {blogData?.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => {
                                  getBlogsOne(item._id);
                                }}
                                style={{
                                  background: "#f5f5f5",
                                  borderRadius: "15px",
                                  padding: "15px",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                {/* Blog Actions */}
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    display: "flex",
                                    gap: "8px",
                                    zIndex: 10,
                                  }}
                                >
                                  {/* Edit Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditBlog(item);
                                    }}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      border: "none",
                                      background: "#2563eb",
                                      color: "#fff",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "18px",
                                    }}
                                    title="Edit Blog"
                                  >
                                    ✏
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      if (
                                        window.confirm(
                                          `Delete "${item.BlogHeading}" ?`
                                        )
                                      ) {
                                        deleteBlog(item._id);
                                      }
                                    }}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      border: "none",
                                      background: "#ef4444",
                                      color: "#fff",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    title="Delete Blog"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>

                                <img
                                  src={item.BlogImage}
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
                                  {item.BlogHeading}
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
                              {selectedBlog.BlogHeading}
                            </h1>



                            <img
                              src={
                                selectedBlog.BlogImage
                              }
                              alt={selectedBlog.BlogHeading}
                              style={{
                                marginLeft: "0px", marginRight: "0px"
                              }}
                              style={{
                                width: "85%",
                                marginLeft: "70px"
                              }}
                            />



                            <h3 className="blog-writer">
                              Written By :{" "}
                              {selectedBlog.BlogWriter}
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


                            <div
                              dangerouslySetInnerHTML={{
                                __html: selectedBlog.BlogContent,
                              }}
                              style={
                                {
                                  marginLeft: "80px",
                                  marginRight: "80px"
                                }
                              }
                            />




                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}







            {jobPop && (
              <div className="home-popup-overlay">
                <div className="home-popup">
                  {/* close */}
                  <button
                    className="popup-close-btn"
                    onClick={() => setJobPop(false)}
                  >
                    X
                  </button>

                  {/* left menu */}
                  <div className="popup-sidebar">
                    <h3>Manage job both website
                      <p style={{ fontSize: "10px", fontWeight: "100", color: "#B0B0B0" }}>1-coreoutsourcingservices</p>
                      <p style={{ fontSize: "10px", fontWeight: "100", color: "#B0B0B0" }}>2-wishlen</p>
                    </h3>

                    <button onClick={() => setJobPopup(true)}>Add job</button>

                    <button onClick={() => setShowJobsPopup(true)}>
                      Show Jobs
                    </button>
                  </div>

                  {/* right content */}
                  <div className="popup-content">
                    {jobPopup && (
                      <div className="inner-popup-overlay">
                        <div className="inner-popup">
                          <h2>Add Job</h2>

                          <div className="input-group">
                            <label>Job Name</label>
                            <input
                              type="text"
                              placeholder="Enter Job Name"
                              value={jobName}
                              onChange={(e) => setJobName(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Job Summary</label>
                            <textarea
                              rows="4"
                              placeholder="Enter Job Summary"
                              value={jobSummary}
                              onChange={(e) => setJobSummary(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Salary</label>
                            <input
                              type="text"
                              placeholder="Enter Salary"
                              value={salary}
                              onChange={(e) => setSalary(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Job Type</label>
                            <select
                              value={jobTime}
                              onChange={(e) => setJobTime(e.target.value)}
                            >
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Remote">Remote</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>

                          <div className="input-group">
                            <label>Experience</label>
                            <input
                              type="text"
                              placeholder="1-2 Years"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Location</label>
                            <input
                              type="text"
                              placeholder="Enter Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Qualification</label>
                            <input
                              type="text"
                              placeholder="B.Tech / MCA / BCA"
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>Skills (Comma Separated)</label>
                            <textarea
                              rows="3"
                              placeholder="React, Node.js, Express, MongoDB"
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                            />
                          </div>

                          <div className="input-group">
                            <label>
                              Key Responsibilities (Comma Separated)
                            </label>
                            <textarea
                              rows="4"
                              placeholder="Build APIs, Create UI, Database Management"
                              value={keyResponsibilities}
                              onChange={(e) =>
                                setKeyResponsibilities(e.target.value)
                              }
                            />
                          </div>

                          <div className="popup-btn-group">
                            <button
                              className="cancel-btn"
                              onClick={() => setJobPopup(false)}
                            >
                              Cancel
                            </button>

                            <button
                              className="save-btn"
                              onClick={handleJobSubmit}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save Job"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showJobsPopup && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100vh",
                          background: "rgba(0,0,0,0.7)",
                          zIndex: 9999,
                          overflowY: "auto",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            height: "90vh",
                            background: "#fff",
                            margin: "50px auto",
                            borderRadius: "20px",
                            padding: "20px",
                            position: "relative",
                            overflowY: "auto",
                          }}
                        >
                          <button
                            onClick={() => setShowJobsPopup(false)}
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                              background: "red",
                              color: "#fff",
                              border: "none",
                              padding: "10px 15px",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                          >
                            X
                          </button>

                          <h2>All Jobs</h2>

                          <div
                            style={{
                              display: "grid",

                              gap: "20px",
                              marginTop: "30px",
                            }}
                          >
                            {jobsData?.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => setSelectedJob(item)}
                                style={{
                                  background: "#f5f5f5",
                                  padding: "20px",
                                  borderRadius: "15px",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    deleteJob(item._id);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "#ef4444",
                                    color: "#fff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 10,
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                                <h3>{item.jobName}</h3>

                                <p>
                                  <strong>Salary:</strong> ₹{item.salary}
                                </p>

                                <p>
                                  <strong>Date:</strong>{" "}
                                  {new Date(
                                    item.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedJob && (
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
                          zIndex: 10000,
                        }}
                      >
                        <div
                          style={{
                            width: "70%",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            background: "#fff",
                            padding: "30px",
                            borderRadius: "20px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => setSelectedJob(null)}
                            style={{
                              position: "absolute",
                              right: "20px",
                              top: "20px",
                              background: "red",
                              color: "#fff",
                              border: "none",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            X
                          </button>

                          <h1>{selectedJob.jobName}</h1>

                          <hr />

                          <p>
                            <strong>Summary:</strong> {selectedJob.jobSummary}
                          </p>

                          <p>
                            <strong>Salary:</strong> ₹{selectedJob.salary}
                          </p>

                          <p>
                            <strong>Job Type:</strong> {selectedJob.jobTime}
                          </p>

                          <p>
                            <strong>Experience:</strong>{" "}
                            {selectedJob.experience} Years
                          </p>

                          <p>
                            <strong>Location:</strong> {selectedJob.location}
                          </p>

                          <p>
                            <strong>Qualification:</strong>{" "}
                            {selectedJob.qualification}
                          </p>

                          <p>
                            <strong>Posted On:</strong>{" "}
                            {new Date(selectedJob.createdAt).toLocaleString()}
                          </p>

                          <h3>Skills</h3>

                          <ul>
                            {selectedJob.skills?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>

                          <h3>Key Responsibilities</h3>

                          <ul>
                            {selectedJob.keyResponsibilities?.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
           {WLPgetdata && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 20000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "90%",
        maxWidth: "1200px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "30px",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setWLPgetdata(false)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "red",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <h2
        style={{
          marginBottom: "5px",
          color: "#111827",
        }}
      >
        White Label Partner
      </h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "25px",
        }}
      >
        Total Enquiries: {wlpData.length}
      </p>

      {wlpLoading && (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "18px",
          }}
        >
          Loading...
        </div>
      )}

      {wlpError && !wlpLoading && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          {wlpError}
        </div>
      )}

      {!wlpLoading &&
        !wlpError &&
        wlpData.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#777",
            }}
          >
            No White Label Partner enquiries found.
          </div>
        )}

      {!wlpLoading &&
        !wlpError &&
        wlpData.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {wlpData.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "20px",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.05)",
                  position: "relative",
                }}
              >
                {/* Delete Button */}
                <button
                  onClick={() =>
                    deleteWhiteLabelPartner(item._id)
                  }
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#ef4444",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  title="Delete Enquiry"
                >
                  <Trash2 size={18} />
                </button>

                {/* Name */}
                <h3
                  style={{
                    margin: "0 50px 15px 0",
                    color: "#0ea5e9",
                  }}
                >
                  {item.name}
                </h3>

                {/* Email */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </p>

                {/* Company */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Company:</strong>{" "}
                  {item.company || "N/A"}
                </p>

                {/* Website */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Website:</strong>{" "}
                  {item.websiteName || "N/A"}
                </p>

                {/* Phone */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${item.phone}`}>
                    {item.phone}
                  </a>
                </p>

                {/* Address */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Address:</strong>{" "}
                  {item.address || "N/A"}
                </p>

                {/* Service */}
                <p style={{ margin: "8px 0" }}>
                  <strong>Service:</strong>{" "}
                  {item.service || "N/A"}
                </p>

                {/* Requirement */}
                <div
                  style={{
                    marginTop: "15px",
                    background: "#ffffff",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <strong>Requirement:</strong>

                  <p
                    style={{
                      marginTop: "7px",
                      marginBottom: 0,
                      color: "#4b5563",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.message || "No message"}
                  </p>
                </div>

                {/* Date */}
                <p
                  style={{
                    marginTop: "15px",
                    marginBottom: 0,
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
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
                    <strong>Job Title:</strong> {selectedCareer.position}
                  </p>

                  <p>
                    <strong>Applied Date:</strong>{" "}
                    {new Date(selectedCareer.createdAt).toLocaleString()}
                  </p>

                  {/* Resume Download Button */}
                  {/* Resume Preview Button */}
                  <button
                    onClick={() => {
                      setResumeViewUrl(selectedCareer.rusume);
                    }}
                    style={{
                      display: "inline-block",
                      marginTop: "20px",
                      background: "#111",
                      color: "#fff",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            )}
            {/* Resume Download Confirmation Popup */}
            {/* Resume Preview Popup */}
            {resumeViewUrl && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.75)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 20000,
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    maxWidth: "1200px",
                    height: "90vh",
                    background: "#fff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >

                  {/* Header */}
                  <div
                    style={{
                      height: "88px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 25px",
                      borderBottom: "1px solid #ddd",
                      flexShrink: 0,
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        color: "#16213e",
                        fontSize: "28px",
                      }}
                    >
                      Resume - {selectedCareer?.name}
                    </h2>

                    <button
                      onClick={() => setResumeViewUrl(null)}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "none",
                        background: "red",
                        color: "#fff",
                        fontSize: "24px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>

                  {/* Resume Preview */}
                  <div
                    style={{
                      flex: 1,
                      overflow: "auto",
                      background: "#f3f3f3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    {/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(resumeViewUrl) ? (
                      <img
                        src={resumeViewUrl}
                        alt={`Resume - ${selectedCareer?.name}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "1000px",
                          display: "block",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <iframe
                        src={resumeViewUrl}
                        title={`Resume - ${selectedCareer?.name}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          background: "#fff",
                        }}
                      />
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div
                    style={{
                      minHeight: "98px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "15px",
                      borderTop: "1px solid #ddd",
                      background: "#fff",
                      flexShrink: 0,
                    }}
                  >

                    {/* Download Resume */}
                    <a
                      href={getResumeDownloadUrl(resumeViewUrl)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#111",
                        color: "#fff",
                        padding: "15px 30px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Download Resume
                    </a>

                    {/* Close */}
                    <button
                      onClick={() => setResumeViewUrl(null)}
                      style={{
                        padding: "15px 30px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#ddd",
                        color: "#111",
                        fontSize: "18px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>

                  </div>

                </div>
              </div>
            )}
            {selectedMessage && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
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
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      border: "none",
                      background: "red",
                      color: "#fff",
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </button>

                  <h2>{selectedMessage.name}</h2>

                  <hr />

                  <p>
                    <strong>Email:</strong> {selectedMessage.email}
                  </p>

                  <p>
                    <strong>Message:</strong>
                  </p>

                  <div
                    style={{
                      background: "#f5f5f5",
                      padding: "12px",
                      borderRadius: "8px",
                      marginTop: "8px",
                    }}
                  >
                    {selectedMessage.message}
                  </div>

                  <p style={{ marginTop: "15px" }}>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      selectedMessage.createdAt
                    ).toLocaleString()}
                  </p>
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

              <div className="message-list">
                {messages?.map((item) => (
                  <div
                    key={item._id}
                    className="message-item"
                    onClick={() => setSelectedMessage(item)}
                    style={{
                      position: "relative",
                      marginBottom: "12px",
                      padding: "15px",
                      border: "1px solid #2b2929",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: "#0ea5e9",
                    }}
                  >
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(item._id);
                      }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        border: "none",
                        background: "red",
                        color: "#fff",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>

                    <h4 style={{ marginBottom: "8px", color: "#f5eeee" }}>
                      {item.name}
                    </h4>

                    <p style={{ margin: "4px 0", color: "#dedcdc" }}>
                      {item.email}
                    </p>

                    <small style={{ color: "#979494" }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </small>
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
                {careers?.map((item) => (
                  <button
                    key={item._id}
                    className="main-btn"
                    onClick={() => setSelectedCareer(item)}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",

                      padding: "12px",
                      cursor: "pointer",
                      flexDirection: "row",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "start",

                      }}
                    >
                      <span style={{ color: "white", paddingBottom: "3px", fontWeight: "700" }}>
                        {item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
                      </span>

                      <span style={{ color: "#F2EDED", paddingBottom: "3px", fontWeight: "400" }}>
                        {item.position?.charAt(0).toUpperCase() + item.position?.slice(1)}
                      </span>
                      <span style={{ color: "#B0B0B0", fontWeight: "100" }}>
                        {new Date(item.createdAt).toLocaleString()}

                      </span>



                    </div>
                    <div style={{
                      alignSelf: "flex-start", // 👈 icon top par
                      padding: "10px",
                      backgroundColor: "red",
                      borderRadius: "50px",
                    }}>


                      <Trash2
                        size={18}
                        className="c_btm"
                        style={{
                          display: "flex",
                          alignItems: "top",
                        }}
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
    </div >
  );
}

export default HomeWishlan;
