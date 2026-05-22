import { Contact } from "../models/contacts.models.js";


// CREATE CONTACT
export const createContact = async (req, res) => {
  try {
    const {
      name,
      number,
      work,
      company_name,
      job_title,
      industry_work,
      currenty_out,
      contect_center,
      how_work,
    } = req.body;

    // validation
    if (
      !name ||
      !number ||
      !work ||
      !company_name ||
      !job_title ||
      !how_work
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // create data
    const newContact = await Contact.create({
      name,
      number,
      work,
      company_name,
      job_title,
      industry_work,
      currenty_out,
      contect_center,
      how_work,
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: newContact,
    });

  } catch (error) {
    console.log("Create Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// GET ALL CONTACTS
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
    });

  } catch (error) {
    console.log("Get Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// DELETE CONTACT BY ID
export const deleteContact = async (req, res) => {

  try {

    const { id } = req.params;

    // check contact
    const contact = await Contact.findById(id);

    if (!contact) {

      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });

    }

    // delete
    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {

    console.log("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};