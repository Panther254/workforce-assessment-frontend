import React from 'react'
import { Typography, Grid, Box, Button} from '@mui/material';


function JobApplications({ application }) {
	const { id, name, email, resume, cover_letter, job, date_applied  } = application

  return (
    <div style={{ width: '90vw', padding: '3em' }}>
        <Box sx={{ flexGrow: 1, borderColor: 'blueviolet', border: '1px solid blueviolet', width: '80%', borderRadius: '.5em', padding: '1.5em', }}>
      <Grid container spacing={3}>
        <Grid item md={10}>
          	<div>
				<Grid item xs={12}>
			        <Typography variant="h5" gutterBottom>
				        Application By {name}
			     	</Typography>
			    </Grid>
			    <Grid item xs={12} sx={{
				    	display: 'flex',
				    	flexDirection: 'row',
				    	justifyContent: 'space-between',
				  	}}>
					<div style={{ display: 'flex', marginRight: '2em'}}>
						<Typography variant="body1" gutterBottom>
							<strong>Email:</strong> {email}
						</Typography>
					</div>
					<div style={{ display: 'flex', marginRight: '2em'}}>
						<Typography variant="body1" gutterBottom >
							<strong>Job:</strong>Senior Frontend Developer
						</Typography>
					</div>
					<div style={{ display: 'flex', marginRight: '2em'}}>
						<Typography variant="body1" gutterBottom>
							<strong>Date Applied:</strong> {date_applied}
						</Typography>
					</div>
			    </Grid>
			    <Grid item xs={12} sx={{
				    	display: 'flex',
				    	flexDirection: 'row',
				    	justifyContent: 'space-between',
				  	}} marginY={1}>
			        <Grid item sx={{
					    borderRadius: '10px',
					    width: "fit-content",
						color: 'white',
						padding: '.5em',
                        textAlign: 'center'
				 	}}>
                        <Button variant="contained" sx={{ backgroundColor: 'blueviolet' }} onClick={()=>alert('Coming soon')}>Fetch Resume</Button>
				    </Grid>
				    <Grid item sx={{
					    borderRadius: '10px',
					    width: "fit-content",
						color: 'white',
						padding: '.5em',
				 	}}>
				      <Button variant="contained" sx={{ backgroundColor: 'blueviolet' }} onClick={()=>alert('Coming soon')}>Accept Application</Button>
				    </Grid>
				    <Grid item sx={{
					    backgroundColor: "white",
					    borderRadius: '10px',
					    flex: 0.8,
						color: 'white',
						padding: '.5em',
				 	}}>
				      <span>Tech Stack</span>
				    </Grid>
			    </Grid>
          	</div>
        </Grid>
    	</Grid>
    </Box>
    </div>
  )
}

export default JobApplications