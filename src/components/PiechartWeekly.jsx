import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { getAllLogApi } from '../services/allApi';
import dayjs from 'dayjs';

function PiechartWeekly({logChange, habit }) {

    const [weeksCount, setWeeksCount] = useState(0)
    const [totalWeeksCount, setTotalWeeksCount] = useState(0)

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
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: weeksCount, label: 'Done', color: "darkviolet" },
                            { id: 1, value: (totalWeeksCount - weeksCount), label: 'Not done', color: "violet" },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                    },
                ]}
                width={400}
                height={200}
            />
            <h2 className='mt-4'>Current Month: {weeksCount}/{totalWeeksCount}</h2>
        </>
    )
}

export default PiechartWeekly