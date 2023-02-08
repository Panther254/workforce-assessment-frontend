import { v2 as cloudinary } from "cloudinary";

export default async function handle(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Error", error: "Method Not Allowed" });
	}

	const file = req.body.files.file;
	if (!file) {
		return res
			.status(400)
			.json({ message: "Error", error: "File is required" });
	}

	// Configuration
	cloudinary.config({
		cloud_name: `${process.env.NEXT_PUBLIC_CLOUD_NAME}`,
		api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
		api_secret: `${process.env.NEXT_PUBLIC_API_SECRET}`,
	});

	try {
		const response = cloudinary.uploader.upload(file, {
			public_id: `workforce_assessment/media/resumes/${file.name}`,
			resource_type: "auto",
		});

		response
			.then((data) => {
				console.log(data);
				console.log("Secure url", data.secure_url);
				return res.status(200).json({
					message: "Success",
					data: data.secure_url,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (error) {
		return res.status(500).json({ message: "Error", error: error.message });
	}
}
