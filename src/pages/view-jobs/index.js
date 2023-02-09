import React from 'react'
import Job from '../../components/Job'
import axios from 'axios'
import Head from "next/head";



function index({ jobs }) {
	console.log("These are the jobs: ", jobs)

	return (
		<>
			<Head>
				<title>View Jobs</title>
			</Head>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{jobs.map((job) => (
					<Job key={job.id} job={job} />
				))}
			</div>
		</>
	);
}



export async function getServerSideProps(context) {
	let jobs = []
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/available-jobs`;
	try {
		const response = await axios.get(url);
		if (response.data) {
			console.log(response.data);
			jobs = [...response.data];
		} else {
			console.log(response);
		}
	} catch (error) {
		console.log("Something went wrong.Try again later");
		console.log(error);
	}

	return {
		props: {
			jobs,
		},
	};
}

export default index

