'use client'

import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import {hitChanceFunction, dpsFunction} from "./TurretCalculator";
import {Chart, ChartData, ChartOptions} from "chart.js";

export default function TurretChart(props: TurretChartProps) {
    const distances = Array.from(
        {length: (props.range.end-props.range.step)/props.range.step + 1},
        (v, i) => props.range.start+i*props.range.step
    );

    const dpsReducedByDistance = distances.map( (distance) => ({
            x: distance,
            y: dpsFunction(hitChanceFunction(distance, props.turret, props.targetShip))
        }))

    const lessTransversalVelocityTargetShip = {
        ...props.targetShip,
        transversalVelocity: props.targetShip.transversalVelocity / 2
    }

    const moreTransversalVelocityTargetShip = {
        ...props.targetShip,
        transversalVelocity: props.targetShip.transversalVelocity * 2
    }

    const dpsReducedByDistanceLessVelocity = distances.map( (distance) => ({
            x: distance,
            y: dpsFunction(hitChanceFunction(distance, props.turret, lessTransversalVelocityTargetShip))
        }))

    const dpsReducedByDistanceMoreVelocity = distances.map( (distance) => ({
            x: distance,
            y: dpsFunction(hitChanceFunction(distance, props.turret, moreTransversalVelocityTargetShip))
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
                grid: {
                    color: ctx => '#303030'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'DPS Reduced in %'
                },
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
                label: lessTransversalVelocityTargetShip.transversalVelocity.toString(),
                data: dpsReducedByDistanceLessVelocity,
                borderColor: 'rgb(105,209,81)',
                backgroundColor: 'rgba(138,255,99,0.5)',
                pointRadius: 2,
                tension: 0.3,
            },
            {
                label: props.targetShip.transversalVelocity.toString(),
                data: dpsReducedByDistance,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 2,
                tension: 0.3,
            },
            {
                label: moreTransversalVelocityTargetShip.transversalVelocity.toString(),
                data: dpsReducedByDistanceMoreVelocity,
                borderColor: 'rgb(235,53,53)',
                backgroundColor: 'rgba(235,53,53,0.5)',
                pointRadius: 2,
                tension: 0.3,
            }
        ],
    };

    return <Line options={options} data={data}/>
}
