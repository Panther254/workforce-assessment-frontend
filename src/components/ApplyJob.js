import React from 'react';
import { TextField, Button, Container, Box, InputLabel, FormControl, Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";



export default function ApplyJob({ id, job_title, positions }) {
	const formInitialState = {
		name: "",
		email: "",
		role: job_title,
		resume: null,
		cover_letter: "",
		position: "",
		job: id,
		phone_number: "",
	};
	const [values, setValues] = React.useState(formInitialState);
	
	const errorInitialState = {
		name: false,
		email: false,
		role: false,
		resume: false,
		cover_letter: false,
		position: false,
		phone_number: false,
	};
	const [error, setError] = React.useState(errorInitialState);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleFileChange = (event) => {
		setValues({ ...values, resume: event.target.files[0] });
	};

	const validate = (fields) => {
		const {
			name,
			email,
			role,
			resume,
			cover_letter,
			position,
			phone_number,
		} = fields;

		if (name == "") {
			setError({ ...error, name: true });
			return false;
		}
		if (email == "") {
			setError({ ...error, email: true });
			return false;
		}
		if (role == "") {
			setError({ ...error, role: true });
			return false;
		}
		if (resume == null) {
			setError({ ...error, resume: true });
			return false;
		}
		if (cover_letter == "") {
			setError({ ...error, cover_letter: true });
			return false;
		}
		if (position == "") {
			setError({ ...error, position: true });
			return false;
		}
		if (phone_number == "") {
			setError({ ...error, phone_number: true });
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate(values)) {

			const mediaData = new FormData();
			mediaData.append("file", values.resume);

			const response = await axios.post(
				"/api/handleRawFiles",
				mediaData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const { url, message, error } = response.data

			if(url){
				const formData = new FormData();
				formData.append("resume_link", response.data.url);
				formData.append("name", values.name);
				formData.append("email", values.email);
				formData.append("cover_letter", values.cover_letter);
				formData.append("job", values.job);
				formData.append("phone_number", values.phone_number);
				formData.append("position", values.role);

				console.log("This is form data", formData)

				const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/apply-job`;

				try {
					const response = await axios.post(url, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
					if (response.data) {
						console.log(response.data);
					} else {
						console.log(response);
					}
				} catch (error) {
					console.log(error);
				}
			}else{
				console.log(error,message)
			}

		}
	};

	return (
		<Container
			sx={{
				overflowY: "scroll",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}>
			<Box mt={3}>
				<TextField
					error={error.name ? true : false}
					name="name"
					color="secondary"
					sx={{ width: "100%" }}
					margin="normal"
					id="name"
					label="Name"
					value={values.name}
					onChange={handleChange("name")}
				/>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.email ? true : false}
					name="email"
					color="secondary"
					sx={{ width: "100%" }}
					margin="normal"
					id="email"
					label="Email"
					value={values.email}
					onChange={handleChange("email")}
				/>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.phone_number ? true : false}
					name="phone_number"
					color="secondary"
					sx={{ width: "100%" }}
					margin="normal"
					id="phone_number"
					label="Phone number"
					value={values.phone_number}
					onChange={handleChange("phone_number")}
				/>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.job ? true : false}
					name="job"
					color="secondary"
					sx={{ width: "100%" }}
					margin="normal"
					id="job"
					label="Role"
					value={job_title}
					InputProps={{
						readOnly: true,
					}}
				/>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.position ? true : false}
					name="position"
					sx={{ width: "100%" }}
					margin="normal"
					id="outlined-number"
					label="Positions available"
					InputLabelProps={{
						shrink: true,
					}}
					color="secondary"
					select
					value={values.position}
					onChange={handleChange("position")}>
					{positions.map((position) => (
						<MenuItem key={position} value={position}>
							{position}
						</MenuItem>
					))}
				</TextField>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.resume ? true : false}
					name="resume"
					sx={{ width: "100%" }}
					color="secondary"
					margin="normal"
					id="outlined-number"
					label="Resume"
					InputLabelProps={{
						shrink: true,
					}}
					type="file"
					onChange={handleFileChange}
				/>
			</Box>
			<Box mt={3}>
				<TextField
					error={error.cover_letter ? true : false}
					name="cover_letter"
					value={values.cover_letter}
					color="secondary"
					sx={{ width: "100%" }}
					margin="normal"
					id="cover-letter"
					label="Cover Letter"
					multiline
					rows="4"
					onChange={handleChange("cover_letter")}
				/>
			</Box>
			<Box mt={3} sx={{ alignSelf: "center" }}>
				<Button
					onClick={handleSubmit}
					variant="contained"
					sx={{ backgroundColor: "blueviolet", alignSelf: "center" }}>
					Submit
				</Button>
			</Box>
		</Container>
	);
}
