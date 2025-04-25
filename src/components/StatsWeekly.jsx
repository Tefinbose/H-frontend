import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import DoneIcon from '@mui/icons-material/Done';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { getAllLogApi } from '../services/allApi';

function StatsWeekly({logChange,habit}) {
 const date1 = new Date();
 const monthName = date1.toLocaleDateString('en-US', { month: 'long' });
 
 
     const [weeksCount, setWeeksCount] = useState(0)
     const [totalWeeksCount, setTotalWeeksCount] = useState(0)
     const [weeks, setWeeks] = useState(0)
     
 
     const getAllLog = async () => {
         setWeeksCount(0)
         const result = await getAllLogApi()
         if (result.status >= 200 && result.status < 300) {
             let datearray = []
             for (let x of result.data) {
                 if (x.habitid == habit.id) {
                     datearray.push(dayjs(x.date))
                 }
             }
             const uniqueWeeks = new Set();

             datearray.forEach(date => {
               // Clone and get the Sunday of the current week
               const sunday = date.startOf('week'); // Sunday is the start by default in dayjs
             
               // Format to 'YYYY-MM-DD' so it's easily comparable
               uniqueWeeks.add(sunday.format('YYYY-MM-DD'));
             });
             
             const weekCount = uniqueWeeks.size;
             setWeeks(weekCount)
 
             const now = dayjs();
             const startOfMonth = now.startOf('month');
             const endOfMonth = now.endOf('month');
             const totalWeeks = endOfMonth.diff(startOfMonth, 'week') + 1;
             let weeksDone = [];
 
             datearray.forEach((date) => {
                 if (date.isSame(now, 'month')) {
                     const weekIndex = date.diff(startOfMonth, 'week'); // 0-based
                     if (!weeksDone.includes(weekIndex)) {
                         weeksDone.push(weekIndex);
                         
                     }
                 }
             });
             setWeeksCount(weeksDone.length)
             setTotalWeeksCount(totalWeeks)
         }
         
     }
 
     useEffect(() => { 
         getAllLog();
     }, [logChange]);
 
  return (
    <>
     <Container className='ms-4 mt-5'>
              <Row>
                <Col className='text-center'>
                  <Card sx={{ display: 'flex' }} style={{ backgroundColor: "#FF7070" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='d-flex'>
                          <CalendarMonthIcon style={{ fontSize: "60px", color: "maroon" }} />
                          <Typography component="div" variant="h5" style={{ fontSize: "50px", color: "maroon" }}>
                            {totalWeeksCount}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                        weeks in {monthName} {date1.getFullYear()}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Col>
                <Col className='text-center'>
                  <Card sx={{ display: 'flex' }} style={{ backgroundColor: "lightgreen" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='d-flex'>
                          <DoneIcon style={{ fontSize: "60px", color: "darkgreen" }} />
                          <Typography component="div" variant="h5" style={{ fontSize: "50px", color: "darkgreen" }}>
                            {weeksCount}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          Weeks done in {monthName}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Col>
              </Row>

              <Row className='mt-4'>
                <Col className='text-center'>
                  <Card sx={{ display: 'flex' }} style={{ backgroundColor: "skyblue" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='d-flex'>
                          <QueryStatsIcon style={{ fontSize: "60px", color: "navy" }} />
                          <Typography component="div" variant="h5" style={{ fontSize: "50px", color: "navy" }}>
                            {Math.round((weeksCount/totalWeeksCount)*100)}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          % done in {monthName} {date1.getFullYear()}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Col>
                <Col className='text-center'>
                  <Card sx={{ display: 'flex' }} style={{ backgroundColor: "pink" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='d-flex'>
                          <ChecklistIcon style={{ fontSize: "60px", color: "#990066" }} />
                          <Typography component="div" variant="h5" style={{ fontSize: "50px", color: "#990066" }}>
                            {weeks}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          Weeks done in Total
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Col>
              </Row>
            </Container>
    </>
  )
}

export default StatsWeekly