import React from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { addLogApi, addXpApi, getUserApi } from '../services/allApi';
import { useEffect } from 'react';

function LogHabit({habit,setLogChange}) {
    const [show, setShow] = useState(false);
    const [log, setLog] = useState({
        date : "",
        time : "",
        habitid : habit.id
    });
    const [logUser,setLogUser] = useState({})
    
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const theme = useTheme();

        // api for get user
    const getUser = async () => {
        const result = await getUserApi();
        if (result.status >= 200 && result.status < 300) {
          const user = result.data.find((item) => item.id === habit.userId);
          setLogUser(user);
        }
      };

    const submitLog = async() =>{
        const { date,time } = log;
        
            if (!date || !time ) {
              alert("please fill the details completely!");
            } else {
        const result = await addLogApi(log)
        if (result.status >= 200 && result.status < 300){
            alert("Log added successfully! 😃");
            setLogChange(result)
            handleClose()
            const userXp = { ...logUser, xp: logUser.xp + 10 };
        const id = logUser.id;
        const user = await addXpApi(id, userXp);
        if (user.status >= 200 && user.status < 300){
            // console.log(user.data);
           
            
        }

        }}
    
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    useEffect(()=>{
        getUser()
    },[])
    return (
        <>
            <ColorButton onClick={handleShow} variant="contained">Log Habit</ColorButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log Habit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* to add date */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" onChange={(e)=>setLog({...log, date:e})} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'StaticTimePicker',
                            ]}
                        >
                            <DemoItem>
                                <StaticTimePicker orientation="portrait"  onChange={(newValue) => setLog({...log, time:newValue})}
                                defaultValue={dayjs('2022-04-17T15:30')} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={submitLog}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default LogHabit