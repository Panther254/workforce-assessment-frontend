import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image'
import amazon from '../../assets/amazon.png'
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LayersIcon from '@mui/icons-material/Layers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ApplyJob from './ApplyJob';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '60%',
  borderRadius: '.5em',
  padding: '1.5em',
};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid blueviolet',
  boxShadow: 12,
  p: 4,
  height: '85vh',
  borderRadius: '0.8em',
};


export default function Job({ job }) {
	const { id,positions, company_logo_url, company_title, job_title, salary_range, country, job_type, sector, number_of_employees, techstacks = [], ...restProps} = job
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	let techStack = "";
	
	techstacks.forEach((techstack) => {
		techStack = `${techstack} | ${techStack}`;
	});

	
	return (
		<Box
			sx={{
				...commonStyles,
				flexGrow: 1,
				borderColor: "secondary.main",
			}}>
			<Grid container spacing={3}>
				<Grid item md={1}>
					<Image
						alt="logo"
						src={company_logo_url}
						style={{
							objectFit: "cover",
							borderRadius: "50%",
						}}
						height={50}
						width={50}
					/>
				</Grid>
				<Grid item md={8}>
					<div>
						<Grid item xs={12}>
							<Typography variant="h5" gutterBottom>
								{job_title}
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
							<div style={{ display: "flex" }}>
								<Typography variant="body1" gutterBottom>
									{company_title}
								</Typography>
							</div>
							<div style={{ display: "flex" }}>
								<PeopleAltIcon
									sx={{ color: "gray", marginRight: ".3em" }}
								/>
								<Typography
									variant="body1"
									gutterBottom
									sx={{ color: "gray" }}>
									{number_of_employees}
								</Typography>
							</div>
							<div style={{ display: "flex" }}>
								<LayersIcon
									sx={{ color: "gray", marginRight: ".3em" }}
								/>
								<Typography
									variant="body1"
									gutterBottom
									sx={{ color: "gray" }}>
									{techstacks?.length}
								</Typography>
							</div>
							<div style={{ display: "flex" }}>
								<AttachMoneyIcon
									sx={{ color: "gray", marginRight: ".3em" }}
								/>
								<Typography
									variant="body1"
									gutterBottom
									sx={{ color: "gray" }}>
									{salary_range}
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
									backgroundColor: "blueviolet",
									borderRadius: "10px",
									width: "fit-content",
									color: "white",
									padding: ".5em",
								}}>
								<span>{country}</span>
							</Grid>
							<Grid
								item
								sx={{
									backgroundColor: "blueviolet",
									borderRadius: "10px",
									width: "fit-content",
									color: "white",
									padding: ".5em",
								}}>
								<span>{job_type}</span>
							</Grid>
							<Grid
								item
								sx={{
									backgroundColor: "blueviolet",
									borderRadius: "10px",
									flex: 0.8,
									color: "white",
									padding: ".5em",
								}}>
								<span>{techStack}</span>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid
					item
					md={3}
					sx={{
						borderRadius: "10px",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
					}}>
					<Button
						variant="contained"
						sx={{ backgroundColor: "blueviolet" }}
						onClick={handleOpen}>
						Apply Job
					</Button>
				</Grid>
			</Grid>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={modalStyles}>
					<ApplyJob id={id} job_title={job_title} positions={positions} />
				</Box>
			</Modal>
		</Box>
	);
}