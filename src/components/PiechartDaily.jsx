import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { getAllLogApi } from '../services/allApi';
import dayjs from 'dayjs';


function PiechartDaily({logChange,habit}) {

     const [daysCount, setDaysCount] = useState(0)
     const date1 = new Date();

      const getAllLog = async () => {
         setDaysCount(0)
         const result = await getAllLogApi() 
         if (result.status >= 200 && result.status < 300) {
           let datearray = []
           for (let x of result.data) {
             if (x.habitid == habit.id) {
               datearray.push(dayjs(x.date))
             }
           }
           
             for (let i = 0; i < datearray.length; i++) {
                 if ((datearray[i].$y == date1.getFullYear()) && (datearray[i].$M == date1.getMonth())) {
                     for (let j = date1.getDay(); j >= 0; j--) {
                         if (datearray[i].$D == (date1.getDate() - j)) {
                             setDaysCount(daysCount+1)
                         }
                     }
                 }
             }
         }
       }

       useEffect(() => {
         getAllLog();
       }, [logChange]);

  return (
    <>
     <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: daysCount, label: 'Done', color: "darkviolet" },
                    { id: 1, value: (7-daysCount), label: 'Not done', color: "violet" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                },
              ]}
              width={400}
              height={200}
            />
            <h2 className='mt-4'>Current Week: {daysCount}/7</h2>
    </>
  )
}

export default PiechartDaily