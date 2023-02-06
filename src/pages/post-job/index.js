import React from 'react'
import PostJobForm from '../../components/PostJobForm'
import styles from '../../styles/PostJob.module.css'

export default function PostJob() {
	return (
		<div className={styles.container}>
			<PostJobForm/>
		</div>
	)
}