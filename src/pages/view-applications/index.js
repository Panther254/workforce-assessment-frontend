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
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/list-applied-jobs`;

	try {
		const response = await axios.get(url);
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