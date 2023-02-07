import React from 'react'
import JobApplications from '../../components/JobApplications'
import { Typography, Grid, Box, Button} from '@mui/material';
import axios from 'axios'


function index({ applications }) {
	console.log("These are the applications",applications)
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Typography variant="h3" mb={5}>
				Job Applications
			</Typography>
			{applications.map((application) => (
				<JobApplications key={application.id} application={application} />
			))}
		</div>
	);
}


export async function getStaticProps() {
	let applications = [];
	try {
		const response = await axios.get('http://127.0.0.1:8000/jobs/list-applied-jobs');
		if (response.data) {
			console.log(response.data);
			applications = [...response.data];
		} else {
			console.log(response);
		}
	} catch (error) {
		console.log("Something went wrong.Try again later");
		console.log(error);
	}

	return {
		props: {
			applications,
		},
	};
}


export default index