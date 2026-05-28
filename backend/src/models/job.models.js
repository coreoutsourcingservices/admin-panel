import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
    },

    jobSummary: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    jobTime: {
      type: String,
      default: "Full Time",
    },

    experience: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "E2 Sector 63, Noida, 201301",
    },

    qualification: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    keyResponsibilities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;