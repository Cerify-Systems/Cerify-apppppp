import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import usflag from '../Images/us-flag.png';
import canada from '../Images/canada.png';
import german from '../Images/german.png';
import mexico from '../Images/mexico.png';
import france from '../Images/france.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const documents = [
        { count: '3k', flag: usflag, height: '75%' },
        { count: '1.5k', flag: canada, height: '50%' },
        { count: '2.5k', flag: german, height: '85%' },
        { count: '1k', flag: mexico, height: '35%' },
        { count: '1k', flag: france, height: '35%' }
    ];

    const labels = documents.map(doc => doc.flag);
    const dataValues = documents.map(doc => parseFloat(doc.count) * 1000);

    const data = {
        labels:documents.map((_, index) => index),
        datasets: [
            {
                label: 'Count',
                data: dataValues,
                backgroundColor: 'rgba(110, 0, 253,0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderRadius: 4, 
                borderSkipped: false,
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#333',
                    callback: (value) => '',
                },
            },
            y: {
                grid: {
                    color: '#e5e5e5', 
                    color: 'purple', // Light gray grid lines
                    lineWidth: 0.25, //// Light gray grid lines
                },
                ticks: {
                    display: true,
                    stepSize: 750,
                    callback: (value) => '',
                },
                border: {
                    display: false, // Hide the y-axis border
                },
                
            },
        },
        plugins: {
            datalabels: {
                display: false, // Hide data labels
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw / 1000}k`,
                },
            },
            title: {
                display: false, 
            },
        },
        layout: {
            padding: {
                bottom: 20,
            },
        },
    };
    const drawXAxisImages = (chart) => {
        const { ctx, chartArea: { bottom, top }, scales: { x } } = chart;
        const imageSize = 20; // Size of the image

        documents.forEach((doc, index) => {
            const xPixel = x.getPixelForTick(index);
            const yPixel = bottom + 1; // Position the image slightly below the x-axis

            const img = new Image();
            img.src = doc.flag;
            img.onload = () => {
                ctx.drawImage(img, xPixel - imageSize / 2, yPixel, imageSize, imageSize);
            };
        });
    };

    return (
        <div className=' flex justify-center h-[180px]'  > {/* Adjust the height here */}
            <Bar
                data={data}
                options={options}
                plugins={[{
                    id: 'imagePlugin',
                    beforeDraw: drawXAxisImages
                }]}
            />
        </div>
    );
};

export default BarChart;
