import * as React from 'react';
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import QueueIcon from '@mui/icons-material/Queue';
import Box from '@mui/material/Box';
import styles from '../styles/NavigationBar.module.css'

export default function NavigationBar() {
  const [value, setValue] = React.useState('/view-jobs');
  const router = useRouter()

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(newValue)
  };

  return (
   <div className={styles.navbar}>
     <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      sx={{ display: 'flex', justifyContent: 'space-between'}}
      indicatorColor="secondary"
    >
      <Tab icon={<WorkIcon />} label="Post Job" value="/post-job"/>
      <Tab icon={<MenuIcon />} label="View Jobs" value="/view-jobs"/>
      <Tab icon={<QueueIcon />} label="View Applications" value="/view-applications"/>
    </Tabs>  
   </div>
  );
}