import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";



// ================= RESUME =================

const storageResume = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "resume_images",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadResume = multer({
  storage: storageResume,
});



// ================= PARTNER =================

const storagePartnerImage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const username = req.body.name || "partner";

    const imageName = username
      .replace(/\s+/g, "_")
      .toLowerCase();

    return {
      folder: "partners",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: imageName,
    };
  },
});

export const uploadPartner = multer({
  storage: storagePartnerImage,
});



// ================= OUR TEAM =================

const storageOurTeamImage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const username = req.body.name || "team";

    const imageName = username
      .replace(/\s+/g, "_")
      .toLowerCase();

    return {
      folder: "our_team",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: imageName,
    };
  },
});

export const uploadOurTeam = multer({
  storage: storageOurTeamImage,
});