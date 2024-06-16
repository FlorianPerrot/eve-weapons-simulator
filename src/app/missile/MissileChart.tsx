'use client'

import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import {hitChanceFunction, dpsFunction} from "./MissileCalculator";
import {ChartData, ChartOptions} from "chart.js";
import MissibleChartStyles from "./MissileChart.module.css"

export default function MissibleChart(props: MissileChartProps) {
    const distances = Array.from(
        {length: (props.range.end-props.range.step)/props.range.step + 1},
        (v, i) => props.range.start+i*props.range.step
    );

    const dpsReducedByDistance = distances.map( (distance) => ({
            x: distance,
            y: dpsFunction(hitChanceFunction(distance, props.missile, props.targetShip))
        }))

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'in meters'
                },
                axis: "x",
                grid: {
                    color: ctx => '#303030'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'DPS Reduced in %'
                },
                axis: "y",
                max: 1, min: 0.0,
                ticks: {
                    callback: function(tickValue) {
                        return Number(tickValue) * 100; // Transform 0.5 to 50%
                    }
                },
                grid: {
                    color: ctx => ctx.tick.value === 0.7 ? '#818181' : '#303030'
                }
            }
        }
    };

    const data: ChartData<"line"> = {
        labels: distances,
        datasets: [
            {
                label: props.targetShip.transversalVelocity.toString(),
                data: dpsReducedByDistance,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 2,
                tension: 0.3,
            }
        ],
    };

    return <div className={MissibleChartStyles.chart}>
        <Line options={options} data={data} />
    </div>
}
