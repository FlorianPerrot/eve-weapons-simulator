'use client'

import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import {ChartData, ChartOptions} from "chart.js";
import MissileChartStyles from "./MissileChart.module.css"
import {TargetSettings} from "./context";
import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import {Missile} from "@/libs/missile/Missile";
import {Bonus} from "@/libs/bonus/Bonus";

export default function MissileChart({targetSettings, missileProps, bonus}: {targetSettings: TargetSettings, missileProps: MissileProps, bonus: Bonus[]}) {
    const missile = new Missile(applyBonus(missileProps, bonus))

    let range = {
        start: 0,
        end: Math.min(missileProps.explosionVelocity  * 10, 2000),
        step: 10
    }

    const velocity = Array.from(
        {length: (range.end-range.step)/range.step + 1},
        (v, i) => range.start+i*range.step
    );

    const damageReduceByVelocity = velocity.map( (v) => ({
        x: v,
        y: missile.damageReduction(v, targetSettings.signatureRadius)
    }))

    const dpsByVelocity = damageReduceByVelocity.map( ({x, y}) => ({
        x: x,
        y: missile.dps(y)
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
                    text: 'in m/s'
                },
                grid: {
                    color: ctx => '#303030'
                }
            },
            yDamageReduce: {
                title: {
                    display: true,
                    text: 'Damage reduce in %'
                },
                max: 100, min: 0,
            },
            yDPS: {
                title: {
                    display: true,
                    text: 'dps'
                }
            }
        }
    };

    const data: ChartData<"line"> = {
        labels: velocity,
        datasets: [
            {
                label: 'Damage reduce',
                data: damageReduceByVelocity.map(point => ({ x: point.x, y: point.y * 100})),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 2,
                tension: 0.3,
                yAxisID: 'yDamageReduce'
            },
            {
                label: 'DPS',
                data: dpsByVelocity,
                borderColor: 'rgb(235,53,53)',
                backgroundColor: 'rgba(235,53,53,0.5)',
                pointRadius: 2,
                tension: 0.3,
                yAxisID: 'yDPS'
            },
        ],
    };

    return <div className={MissileChartStyles.chart}>
        <Line options={options} data={data} />
    </div>
}
