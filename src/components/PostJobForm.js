import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from 'axios'


export default function PostJobForm() {
  
  const jobTypes = [ 'REMOTE', 'ONSITE']
  const positions = ["Intern", "Full Time", "Graduate Trainee"];

  const [formState, setFormState] = React.useState({
    positions: [],
    company_logo: null,
    company_logo_link: "",
    company_title: '',
    job_title: '',
    salary_range: '',
    country: '',
    job_type: 'ONSITE',
    sector: '',
    number_of_employees: '',
  })

  
  const handleFieldChange = event => {
    if(event.target.name === "number_of_employees"){
      const enteredValue = event.target.value;
      const onlyNumbers = enteredValue.match(/^\d+$/);
      if (onlyNumbers) {
        setFormState(formState =>({...formState,  [event.target.name]: enteredValue }));
      }
    }else{
      setFormState(formState => ({
        ...formState,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      }));
    }
  };

  const [stateStacks, setStateStacks] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleAdd = event => {
    setStateStacks([...stateStacks, input]);
    setError(false)
	setInput("")
  };

  const handleFileChange = event => {
    setFormState(formState=>({...formState,company_logo: event.target.files[0] }))
  };


  const submitForm = async (e) => {
    if(stateStacks.length < 1){
      setError(true);
    }else{
     
	  const mediaData = new FormData()
	  mediaData.append("file",formState.company_logo)

	  const response = await axios.post('/api/handleMedia', mediaData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		
		console.log("Heres teh response from NExt JS api",response.data)
		
		const { url, message, error } = response.data

		
		if (url) {
			const formData = new FormData();
			formData.append("positions", formState.positions);
			formData.append("company_logo_url", response.data.url);
			formData.append("job_title", formState.job_title);
			formData.append("company_title", formState.company_title);
			formData.append("tech_stacks", stateStacks);
			formData.append("salary_range", formState.salary_range);
			formData.append("country", formState.country);
			formData.append(
				"number_of_employees",
				formState.number_of_employees
			);
			formData.append("sector", formState.sector);
			formData.append("job_type", formState.job_type);

			console.log("Form Data: ", formData);

			const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/post-job`;

			try {
				axios
					.post(url, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((res) => {
						console.log("Data from post-job endpoint: ",res.data);
						setFormState({
							...formState,
							positions: [],
							company_logo: "",
							company_title: "",
							job_title: "",
							salary_range: "",
							country: "",
							job_type: "ONSITE",
							sector: "",
							number_of_employees: "",
						});
						setStateStacks([]);
					})
					.catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log(message, error);
		}
    }
  }

  return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "60%",
				flex: 1,
			}}>
			<TextField
				name="company_logo"
				margin="normal"
				id="outlined-number"
				label="Company logo"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
				type="file"
				onChange={handleFileChange}
			/>
			<TextField
				onChange={handleFieldChange}
				value={formState.company_title}
				name="company_title"
				margin="normal"
				id="outlined-number"
				label="Company title"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				onChange={handleFieldChange}
				value={formState.job_title}
				name="job_title"
				margin="normal"
				id="outlined-number"
				label="Job title"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				name="tech_stacks"
				error={error}
				id="input-with-icon-textfield"
				label="Tech Stacks"
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<IconButton aria-label="delete" onClick={handleAdd}>
								<AddIcon />
							</IconButton>
							<IconButton
								aria-label="delete"
								onClick={() => setStateStacks([])}>
								<RemoveIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
				margin="normal"
				color="secondary"
				InputLabelProps={{
					shrink: true,
				}}
				value={input}
				onChange={handleChange}
				helperText={error ? "Field must not be blank" : ""}
			/>
			<Box sx={{ display: "flex", width: "100%" }}>
				{stateStacks.map((stack, index) => (
					<Typography key={index} mr={2}>
						{stack}
					</Typography>
				))}
			</Box>

			<TextField
				onChange={handleFieldChange}
				value={formState.salary_range}
				name="salary_range"
				margin="normal"
				id="outlined-number"
				label="Salary range"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				onChange={handleFieldChange}
				value={formState.country}
				name="country"
				margin="normal"
				id="outlined-number"
				label="Country"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				onChange={handleFieldChange}
				value={formState.job_type}
				name="job_type"
				margin="normal"
				id="outlined-number"
				label="Job type"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
				select>
				{jobTypes.map((type) => (
					<MenuItem key={type} value={type}>
						{type}
					</MenuItem>
				))}
			</TextField>
			<TextField
				onChange={handleFieldChange}
				value={formState.sector}
				name="sector"
				margin="normal"
				id="outlined-number"
				label="Sector"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				onChange={handleFieldChange}
				value={formState.number_of_employees}
				name="number_of_employees"
				margin="normal"
				id="outlined-number"
				label="Approximate Number of employees"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
			/>
			<TextField
				name="positions"
				margin="normal"
				id="outlined-number"
				label="Positions Available"
				InputLabelProps={{
					shrink: true,
				}}
				color="secondary"
				select
				SelectProps={{
					multiple: true,
					value: formState.positions,
					onChange: handleFieldChange,
				}}>
				{positions.map((position) => (
					<MenuItem key={position} value={position}>
						{position}
					</MenuItem>
				))}
			</TextField>
			<Button
				variant="contained"
				color="secondary"
				sx={{ marginTop: "1em", marginBottom: "1em" }}
				onClick={submitForm}>
				POST
			</Button>
		</Box>
  );
}