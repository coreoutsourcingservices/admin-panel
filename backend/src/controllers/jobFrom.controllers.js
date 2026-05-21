import { JobFrom } from "../models/jobForm.models";

export const job_application_from = async (req, res) => {
    try {
        const { name, number, email, job_title, resume } = req.body
        if (!name || !number || !email || !job_title || !resume) {
            return res.status(500)
                .json({
                    message: "all fild requed",
                    success: false
                })
            const job_from = await JobFrom.create({
                name,
                number,
                email,
                job_title,
                resume,

            })

            res.status(201)
                .json({
                    message: "Job Form Submitted Successfully",
                    success: true,
                    data: job_from

                })
        }

    } catch (e) {
         return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}