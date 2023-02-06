import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from 'axios'


export default function PostJobForm() {
  
  const jobTypes = [ 'REMOTE', 'ONSITE']
  const positions = ["Intern", "Full Time", "Graduate Trainee"];

  const [formState, setFormState] = React.useState({
    positions: [],
    company_logo: null,
    company_title: '',
    job_title: '',
    salary_range: '',
    country: '',
    job_type: 'ONSITE',
    sector: '',
    number_of_employees: '',
    tech_stacks: []
  })

  
  const handleFieldChange = event => {
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    }));
  };

  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleAdd = event => {
    event.preventDefault();
    setData([...data, input]);
    setInput('');
  };

  const handleFileChange = event => {
    setFormState(formState=>({...formState,company_logo: event.target.files[0] }))
  };


  const submitForm = async (e) => {
    setFormState(formState=>({...formState,tech_stacks: [...data] }))
    console.log('Form State: ',formState)

    const formData = new FormData();
	  formData.append("positions", formState.positions);
	  formData.append("company_logo", formState.company_logo);
	  formData.append("job_title", formState.job_title);
	  formData.append("company_title", formState.company_title);
	  formData.append("techstacks", formState.techstacks);
	  formData.append("salary_range", formState.salary_range);
	  formData.append("country", formState.country);
	  formData.append("number_of_employees", formState.number_of_employees);
	  formData.append("sector", formState.sector);
	  formData.append("job_type", formState.job_type);

    const url = 'http://127.0.0.1:8000/jobs/post-job'

   try {
      const response = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
      if (response.data) {
			    console.log(response.data);
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
				tech_stacks: [],
			});
      setData([])
      } else {
        console.log(response);
      }
   } catch (error) {
      console.log(error)
   }

  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "60%", flex: 1 }}
    >
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
        id="input-with-icon-textfield"
        label="Tech Stacks"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton aria-label="delete" onClick={handleAdd}>
                <AddIcon />
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
      />
      <Box sx={{ display: "flex", width: "100%" }}>
        {data.map((stack) => (
          <Typography mr={2}>{stack}</Typography>
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
        select
      >
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
        label="Apprx. No. of employees"
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
        }}
      >
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
        onClick={submitForm}
      >
        POST
      </Button>
    </Box>
  );
}