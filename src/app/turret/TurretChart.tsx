'use client'

import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import {ChartData, ChartOptions} from "chart.js";
import TurretChartStyles from "./TurretChart.module.css"
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {TargetSettingsProps} from "./Settings/TargetSettings";
import {Turret} from "@/libs/turret/Turret";
import {Bonus} from "@/libs/bonus/Bonus";

export default function TurretChart(props: {targetSettings: TargetSettingsProps, turret: TurretProps, bonus: Bonus[]}) {
    const turret = new Turret(applyBonus(props.turret, props.bonus))

    let range = {
        start: 0,
        end: turret.falloff*1.5 + turret.optimalRange,
        step: 500
    }

    const distances = Array.from(
        {length: (range.end-range.step)/range.step + 1},
        (v, i) => range.start+i*range.step
    )

    const hitChanceByDistance = distances.map( (distance) => ({
            x: distance,
            y: turret.hitChance(distance, props.targetSettings.transversalVelocity, props.targetSettings.signatureRadius)
        }))

    const dpsByDistance = hitChanceByDistance.map( ({x, y}) => ({
            x: x,
            y: turret.dps(y)
        }))

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        backgroundColor: 'red',
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'in km'
                },
                labels: distances.map(distance => {
                    const distanceInKm = distance / 1000
                    return  turret.isOptimalRange(distance, range.step) ? `(opti range) ${distanceInKm}` :
                        turret.isFalloff(distance, range.step) ? `(falloff) ${distanceInKm}` : `${distanceInKm}`
                }),
                grid: {
                    color: ctx => {
                        return String(ctx.tick.label).includes('opti range') ? 'rgb(235,53,53)' :
                            String(ctx.tick.label).includes('falloff') ? 'rgb(179,5,12)' : '#303030'
                    }
                },
                ticks: {
                    autoSkip: false,
                }
            },
            yHitChance: {
                title: {
                    display: true,
                    text: 'Hit chance in %'
                },
                max: 100, min: 0,
                grid: {
                    color: ctx => ctx.tick.value === 70 ? '#818181' : '#303030'
                }
            },
            yDps: {
                title: {
                    display: true,
                    text: 'DPS'
                },
            }
        }
    };

    const data: ChartData<"line"> = {
        labels: distances,
        datasets: [
            {
                label: 'Hit Chance',
                data: hitChanceByDistance.map(point => ({x: point.x, y: point.y*100})),
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
