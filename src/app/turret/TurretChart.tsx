'use client'

import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import {hitChanceFunction} from "./TurretCalculator";
import {ChartData, ChartOptions} from "chart.js";
import TurretChartStyles from "./TurretChart.module.css"
import {getDPS, TurretStatsWithBuffs} from "@/libs/TurretStats";
import {TargetSettingsProps} from "./Settings/TargetSettings";
import {dpsFunction} from "../missile/MissileCalculator";

export default function TurretChart({targetSettings, turretStats}: {targetSettings: TargetSettingsProps, turretStats: TurretStatsWithBuffs}) {
    let range = {
        start: 0,
        end: turretStats.falloff*2 + turretStats.optimalRange,
        step: 500
    }

    const distances = Array.from(
        {length: (range.end-range.step)/range.step + 1},
        (v, i) => range.start+i*range.step
    );

    const hitChanceByDistance = distances.map( (distance) => ({
            x: distance,
            y: hitChanceFunction(distance, targetSettings, turretStats)
        }))

    const dpsByDistance = distances.map( (distance) => ({
            x: distance,
            y: dpsFunction(hitChanceFunction(distance, targetSettings, turretStats))
                * getDPS(turretStats)
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
            yHitChance: {
                title: {
                    display: true,
                    text: 'Hit chance in %'
                },
                max: 1.0, min: 0.0,
                ticks: {
                    stepSize: 0.1,
                    callback: function(tickValue) {
                        return Number(tickValue) * 100; // Transform 0.5 to 50%
                    }
                },
                grid: {
                    color: ctx => ctx.tick.value === 0.7 ? '#818181' : '#303030'
                }
            },
            yDps: {
                title: {
                    display: true,
                    text: 'DPS'
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
                label: 'Hit Chance',
                data: hitChanceByDistance,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 2,
                tension: 0.3,
                yAxisID: 'yHitChance'
            },
            {
                label: 'DPS',
                data: dpsByDistance,
                borderColor: 'rgb(235,53,53)',
                backgroundColor: 'rgba(235,53,53,0.5)',
                pointRadius: 2,
                tension: 0.3,
                yAxisID: 'yDps'
            }
        ],
    };

    return <div className={TurretChartStyles.chart}>
        <Line options={options} data={data} />
    </div>
}
