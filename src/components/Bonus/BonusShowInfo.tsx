import {Bonus, isBonus} from "@/libs/bonus/Bonus";
import BonusShowInfoStyles from './BonusShowInfo.module.css'

export default function BonusShowInfo({bonus}: {bonus: Bonus[]}) {
    if (bonus.length === 0) return (<></>)

    return (
        <div className={BonusShowInfoStyles.root}>
            <span>x</span>
            <ul>
                {bonus.map((b, index) => (
                    <li key={index} className={isBonus(b) ? BonusShowInfoStyles.bonus : BonusShowInfoStyles.malus}>
                        {b.source}: {b.bonus.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
