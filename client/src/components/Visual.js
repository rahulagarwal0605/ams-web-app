import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import url from './constants.js';
import axios from 'axios';

function Visual({ auto_, manual_, id }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grade vs #students',
            },
        },
    };


    const labels = ['A', 'AB', 'B', 'BC', 'C', 'CD', 'D', 'F'];
    const [data1, setData1] = React.useState({ 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null });
    const [data2, setData2] = React.useState({ 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null });

    const data = {
        labels,
        datasets: [
            {
                label: 'Automatic Grade',
                data: data1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Manual Grade',
                data: data2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    React.useEffect(() => {
        const call = async () => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/getTotalStudents`,
                method: 'POST',
                withCredentials: true,
                data: auto_
            }
            let m = await axios(options);
            let temp = { 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null };
            for (let i = 0; i < labels.length; i++) {
                temp[labels[i]] = m.data.data[i]
            }
            setData1(temp);
            options = {
                url: `${url}/api/teacher/courses/${id}/getTotalStudents`,
                method: 'POST',
                withCredentials: true,
                data: manual_
            }
            m = await axios(options);
            for (let i = 0; i < labels.length; i++) {
                temp[labels[i]] = m.data.data[i]
            }
            setData2(temp);
        }
        call();

    }, [auto_, manual_, id])

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default Visual
