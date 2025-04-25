import React, { useEffect, useState } from 'react';
import { getAllLogApi } from '../services/allApi';
import dayjs from 'dayjs';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';

function ChartOccasionally({logChange, habit }) {
  const [chartData, setChartData] = useState(new Array(12).fill(0)); // 12 months

  const date1 = new Date();

  const getAllLog = async () => {
    try {
      const result = await getAllLogApi();
      if (result.status >= 200 && result.status < 300) {
        const logs = result.data.filter((x) => x.habitid === habit.id);
        const counts = new Array(12).fill(0);

        logs.forEach((log) => {
          const date = dayjs(log.date);
          if (date.year() === date1.getFullYear()) {
            counts[date.month()] += 1; // or += 0.5 if that's needed
          }
        });

        setChartData(counts);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  useEffect(() => {
    getAllLog();
  }, [habit,logChange]); // re-run if habit changes

  return (
    <>
      <ChartContainer
        xAxis={[
          {
            scaleType: 'band',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ]}
        series={[
          {
            type: 'bar',
            id: 'base',
            data: chartData,
            color : 'darkviolet'
          },
        ]}
        width={400}
        height={400}
      >
        <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
        <ChartsXAxis />
        <ChartsYAxis  label="Frequency in each month" />
      </ChartContainer>
  
  <h2 className='mt-4'>Current Year</h2>
    </>
  );
}

export default ChartOccasionally;

const Text = styled('text')(({ theme }) => ({
  ...theme.typography.body2,
  stroke: 'none',
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  pointerEvents: 'none',
}));

function BarLabel({ x, y, width, color, ...otherProps }) {
  return (
    <Text
      x={x + width / 2}
      y={y - 8}
      fill={color}
      textAnchor="middle"
      {...otherProps}
    />
  );
}
