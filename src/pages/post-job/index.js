import React from 'react'
import PostJobForm from '../../components/PostJobForm'
import styles from '../../styles/PostJob.module.css'
import Head from "next/head";


export default function PostJob() {
	return (
		<>
			<Head>
				<title>
					Post Josb
				</title>
			</Head>
			<div className={styles.container}>
				<PostJobForm />
			</div>
		</>
	);
}