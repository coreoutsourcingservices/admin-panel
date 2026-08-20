import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        company: {
            type: String,
            default: "",
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },
        websiteName: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            default: "",
            trim: true,
        },

        service: {
            type: String,
            required: true,
            enum: [
                "SEO",
                "Website Development",
                "Social Media Marketing",
                "App Development",
                "Google Ads Management",
                "Meta Ads Management",
                "Designing Services",
                "CRM Software",
                "Graphic Designing",
                "UI/UX Designing",
            ],
        },

        message: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["new", "contacted", "closed"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);