import { v2 as cloudinary } from "cloudinary";
import nextConnect from "next-connect";
import multer from "multer";
import { encode } from "base64-arraybuffer";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
	},
});

apiRoute.use(multer().any());

apiRoute.post((req, res) => {
	const file = req.files[0];
	const encoded_file = encode(file.buffer);

	console.log("Here is file", encoded_file);

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

	const fileToSend = `data:${file.mimetype};base64,${encoded_file}`;

	try {
		const response = cloudinary.uploader.upload(fileToSend, {
			public_id: `workforce_assessment/media/resumes/${file.originalname}`,
			resource_type: "auto",
		});

		response
			.then((data) => {
				console.log(data);
				console.log("Secure url", data.secure_url);
				return res.status(200).json({
					message: "Success",
					url: data.secure_url,
				});
			})
			.catch((err) => {
				console.log("Cloudinary error: ", err);
			});
	} catch (error) {
		return res.status(500).json({ message: "Error", error: error.message });
	}
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};
