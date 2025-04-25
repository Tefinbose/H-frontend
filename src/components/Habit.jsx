import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import DateCalendarServerRequest from './Calender';

import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import LogHabit from './LogHabit';

import PiechartDaily from './PiechartDaily';
import PiechartWeekly from './PiechartWeekly';
import ChartOccasionally from './ChartOccasionally';
import StatsDaily from './StatsDaily';
import StatsWeekly from './StatsWeekly';
import StatsOccasionally from './StatsOccasionally';
import Header from './Header';


function Habit() {
  const location = useLocation()
  const { habit } = location.state || {}
  


const [logChange,setLogChange] = useState({})
  const theme = useTheme();
  const date1 = new Date();


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));


  return (
    <>
    <Header/>
      <div>
        
  
        <div className='d-flex justify-content-start gap-5'>
          <h1 style={{ color: "darkviolet" }} className='ps-5 pt-5'>{habit.habitname}</h1>
          <Stack spacing={2} direction="row" justifyContent="center" className='align-self-end'>
            <LogHabit habit={habit} setLogChange={setLogChange}  />
            <Link to={'/logTable'} state={{habit}}><ColorButton variant="contained">View Log</ColorButton></Link>
            <Link to={'/dashboard'} ><ColorButton variant="contained">Home</ColorButton></Link>

          </Stack>
        </div>
  
        <Container className='mb-3'>
          <Row>
            <Col md={4} className='text-center mt-5 ms-0 ps-0 pe-2'>
            {(habit.frequency == 'Daily') ? <PiechartDaily logChange={logChange} habit={habit}/> : (habit.frequency == 'Weekly') ? <PiechartWeekly logChange={logChange} habit={habit} /> : <ChartOccasionally logChange={logChange} habit={habit}/>}
              
              
            </Col>
  
  
            <Col md={4} className='text-center mt-5'>
              <h3 className='mb-3'>Calender</h3>
              <DateCalendarServerRequest habit={habit} />
            </Col>
  
  
            <Col md={4} className='text-center mt-5'>
            {(habit.frequency == 'Daily') ? <StatsDaily logChange={logChange} habit={habit} /> : (habit.frequency == 'Weekly') ? <StatsWeekly logChange={logChange} habit={habit} /> : <StatsOccasionally logChange={logChange} habit={habit}/>}
            </Col>
          </Row>
        </Container>
  
  
      </div>
    </>
  )
}

export default Habit