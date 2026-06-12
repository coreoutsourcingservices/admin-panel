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
      resource_type:  "auto",
      allowed_formats: ["jpg", "jpeg", "png" , "svg"],
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


const storageteamSecondImage = new CloudinaryStorage({
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

export const uploadTeamSecond = multer({
  storage: storageteamSecondImage,
});


// Cloudinary Storage
const storageGallery =
  new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {
      const isVideo =
        file?.mimetype?.startsWith(
          "video"
        );

      return {
        folder: "gallery_media",

        resource_type: isVideo
          ? "video"
          : "image",

        allowed_formats: isVideo
          ? [
              "mp4",
              "mov",
              "avi",
              "webm",
              "mkv",
            ]
          : [
              "jpg",
              "jpeg",
              "png",
              "webp",
            ],
      };
    },
  });

// Multer Upload
export const uploadGallery = multer({
  storage: storageGallery,
});


const storageBlogPhoto = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "resume_images",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadBlogPhoto = multer({
  storage: storageBlogPhoto,
});


const storageResumeWishlanPhoto = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "resume_images",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadResumWishlanPhoto = multer({
  storage: storageResumeWishlanPhoto,
});


const storageBlogWishlanPhoto = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "wishlenBlgeImages",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadBlogeWishlanPhoto = multer({
  storage: storageBlogWishlanPhoto,
});