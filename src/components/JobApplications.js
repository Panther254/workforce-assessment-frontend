import React from 'react'
import { Typography, Grid, Box, Button, TextField} from '@mui/material';
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";


const fetcher = (url) => axios.get(url).then((res) => res.data);


function useJob(id) {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`;
	const { data, error, isLoading } = useSWR(
		url,
		fetcher
	);

	return {
		jobObject: data,
		isLoading,
		isError: error,
	};
}

function JobApplications({ application }) {
	const { id, name, email, resume_link, cover_letter, job, date_applied, position } = application;
	
	const { jobObject, isLoading, isError } = useJob(job)
	
	if (isLoading) {
		return (
			<div style={{ width: "90vw", padding: "3em" }}>
				<Typography variant="h5" gutterBottom>
					Loading
				</Typography>
			</div>
		);
	}
  	
	if (isError) {
		return (
			<div style={{ width: "90vw", padding: "3em" }}>
				<Typography variant="h5" gutterBottom>
					Erro Fetching Data
				</Typography>
			</div>
		);
	}
	
	const { job_title, sector, company_title } = jobObject
	
	return (
		<div style={{ width: "90vw", padding: "3em" }}>
			<Box
				sx={{
					flexGrow: 1,
					borderColor: "blueviolet",
					border: "1px solid blueviolet",
					width: "80%",
					borderRadius: ".5em",
					padding: "1.5em",
				}}>
				<Grid container spacing={3}>
					<Grid item md={10}>
						<div>
							<Grid item xs={12}>
								<Typography variant="h5" gutterBottom>
									Application By {name} to {company_title}
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}>
								<div
									style={{
										display: "flex",
										marginRight: "2em",
									}}>
									<Typography variant="body1" gutterBottom>
										<strong>Email:</strong> {email}
									</Typography>
								</div>
								<div
									style={{
										display: "flex",
										marginRight: "2em",
									}}>
									<Typography variant="body1" gutterBottom>
										<strong>Job:</strong>
										{job_title}
									</Typography>
								</div>
								<div
									style={{
										display: "flex",
										marginRight: "2em",
									}}>
									<Typography variant="body1" gutterBottom>
										<strong>Date Applied:</strong>{" "}
										{date_applied}
									</Typography>
								</div>
								<div
									style={{
										display: "flex",
										marginRight: "2em",
									}}>
									<Typography variant="body1" gutterBottom>
										<strong>Position applied:</strong>{" "}
										{position}
									</Typography>
								</div>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								marginY={1}>
								<Grid
									item
									sx={{
										borderRadius: "10px",
										width: "fit-content",
										color: "white",
										padding: ".5em",
										textAlign: "center",
									}}>
									<Link href={resume_link}>
										<Button
											variant="contained"
											sx={{
												backgroundColor: "blueviolet",
											}}>
											Fetch Resume
										</Button>
									</Link>
								</Grid>
								<Grid
									item
									sx={{
										borderRadius: "10px",
										width: "fit-content",
										color: "white",
										padding: ".5em",
									}}>
									<Button
										variant="contained"
										sx={{
											backgroundColor: "blueviolet",
										}}
										onClick={() => alert("Coming soon")}>
										Accept Application
									</Button>
								</Grid>
								<Grid
									item
									sx={{
										backgroundColor: "white",
										borderRadius: "10px",
										flex: 0.2,
										color: "white",
										padding: ".3em",
										alignContent: 'center',
										marginRight: '1em',
										display: 'flex',
										alignItems: 'center',
										opacity: 0.6
									}}>
									<span>Tech Stack</span>
								</Grid>
								<Grid
									item
									sx={{
										backgroundColor: "white",
										borderRadius: "10px",
										flex: 0.2,
										color: "white",
										padding: ".3em",
										alignContent: 'center',
										marginRight: '1em',
										display: 'flex',
										alignItems: 'center',
										opacity: 0.6
									}}>
									<span>Tech Stack</span>
								</Grid>
								<Grid
									item
									sx={{
										backgroundColor: "blueviolet",
										borderRadius: "10px",
										flex: 0.6,
										color: "white",
										padding: ".3em",
										alignContent: 'center',
										marginRight: '1em',
										display: 'flex',
										alignItems: 'center',
										opacity: 0.6,
										justifyContent: 'space-around'
									}}>
									<span>{sector}</span>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid
						xs={12}
						item
						sx={{
							borderRadius: "10px",
							width: "fit-content",
							color: "white",
							padding: ".5em",
							textAlign: "center",
						}}>
						<TextField
							name="cover_letter"
							value={cover_letter}
							color="secondary"
							sx={{ width: "100%" }}
							margin="normal"
							id="cover-letter"
							label="Cover Letter"
							multiline
							rows="4"
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default JobApplications