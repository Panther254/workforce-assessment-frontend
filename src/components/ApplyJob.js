import React from 'react';
import { TextField, Button, Container, Box, InputLabel, FormControl, Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";



export default function ApplyJob({ id, job_title, positions }) {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    role: job_title,
    resume: '',
    cover_letter: '',
    position: '',
    job: id
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFileChange = event => {
    setValues({ ...values, resume: event.target.files[0] });
  };

    // const positions = [ 'intern', 'full time', 'graduate trainee']

  const handleSubmit = async e =>{
    e.preventDefault()
    console.log(values)
    const formData = new FormData();
	  formData.append("resume", values.resume);
	  formData.append("name", values.name);
	  formData.append("email", values.email);
	  formData.append("cover_letter", values.cover_letter);
	  formData.append("job", values.job);

    const url = 'http://127.0.0.1:8000/jobs/apply-job'

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
      console.log(error)
   }


  }

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
