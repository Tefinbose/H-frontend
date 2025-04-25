import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAllLogApi } from '../services/allApi';
import dayjs from 'dayjs';
import DoneIcon from '@mui/icons-material/Done';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


function StatsDaily({logChange,habit}) {
 const date1 = new Date();
 const monthName = date1.toLocaleDateString('en-US', { month: 'long' });
 const [daysDone, setDaysDone] = useState(0)
 const [totalDaysDone, setTotalDaysDone] = useState(0)
 

 let datearray = []
 let monthdates = []
 let datesalone = []
 let totaldatesalone = []

 const getAllLog = async () => {
          const result = await getAllLogApi()  
          if (result.status >= 200 && result.status < 300) {
            
            datearray = []
            for (let x of result.data) {
              if (x.habitid == habit.id) {
                datearray.push(dayjs(x.date))
              }
            }
            
              for (let i = 0; i < datearray.length; i++) {
                 if ((datearray[i].$y == date1.getFullYear()) && (datearray[i].$M == date1.getMonth())) {
                 monthdates.push(datearray[i])

                 }
              }
              for (let i = 0; i < monthdates.length; i++) {
                if (!datesalone.includes(monthdates[i].$D)){
                    datesalone.push(monthdates[i].$D)
                }
              }

              for (let i = 0; i < datearray.length; i++) {
                if (!totaldatesalone.includes(datearray[i].$D)){
                    totaldatesalone.push(datearray[i].$D)
                }
              }
              
              setDaysDone(datesalone.length)
              setTotalDaysDone(totaldatesalone.length)
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
                            {date1.getDate()}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                        {monthName} {date1.getFullYear()}
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
                            {daysDone}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          Days done in {monthName}
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
                            {Math.round((daysDone/date1.getDate())*100)}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          % done in {monthName}
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
                            {totalDaysDone}
                          </Typography>
                        </div>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ color: 'text.secondary' }}
                        >
                          Days done in Total
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

export default StatsDaily