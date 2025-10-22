import { useAuth } from '../../context/authContext/authContext.jsx';
import { useEffect, useState } from 'react';
import apiService from '../../utilities/apiService.mjs';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    scales
    } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartBoard(){
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getUserDashboard()
            .then(setStats)
            .catch((err) => console.error('Failed to load dashboard', err))
            .finally(() => setLoading(false));
    }, []);

    if(loading) return <p>Loading dashboard</p>

    if(!stats || stats.length === 0) return <p>No game stats available</p>

    const data = {
        labels: (stats || []).map((s) => s.gameName),
        datasets: [
            {
                label: 'Play Count',
                data: stats.map((s) => s.playCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6',
                borderWidth: 1,
                yAxisID: 'y',           // lefy axis
            },
            {
                label: 'Fastest Time (s)',
                data: stats.map((s)=>s.fastestTime),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderWidth: 1,
                yAcisID: 'y1',      // right axis for time
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Play count',
                },
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Fastest Time(s)',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div>
          <h2>Your Game History</h2>
          <Bar data={data} options={options} />
        </div>
    );
}