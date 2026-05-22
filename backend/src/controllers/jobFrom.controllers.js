import { JobFrom } from "../models/jobForm.models.js";

export const job_application_from = async (req, res) => {
    try {
        const { name, email, job_title, number} = req.body
        if (!name || !email || !job_title || !number) {
            return res.status(500)
                .json({
                    message: "all fild requed",
                    success: false
                })
        }

        const resume = req.file.path;
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


    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const get_all_job_application = async (req, res) => {

    try {

        const jobs = await JobFrom
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "All Job Applications",
            success: true,
            total: jobs.length,
            data: jobs

        });

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            message: "Internal Server Error",
            success: false

        });

    }

}


// DELETE JOB APPLICATION
export const delete_job_application = async (req, res) => {

    try {

        const { id } = req.params;

        // check job application
        const job = await JobFrom.findById(id);

        if (!job) {

            return res.status(404).json({

                message: "Job Application Not Found",
                success: false

            });

        }

        // delete
        await JobFrom.findByIdAndDelete(id);

        return res.status(200).json({

            message: "Job Application Deleted Successfully",
            success: true

        });

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            message: "Internal Server Error",
            success: false

        });

    }

}