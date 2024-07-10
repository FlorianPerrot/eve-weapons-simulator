import {MissileProps} from "@/libs/missile/MissileProps";
import {Bonus} from "@/libs/bonus/Bonus";
import MissileRangeShowInfo from "@/components/Bonus/MissileRangeShowInfo";
import ExplosionVelocityShowInfo from "@/components/Bonus/ExplosionVelocityShowInfo";
import ExplosionRadiusShowInfo from "@/components/Bonus/ExplosionRadiusShowInfo";
import DPSMissileShowInfo from "@/components/Bonus/DPSMissileShowInfo";
import ShowInfoStyles from "@/components/Bonus/ShowInfo.module.css"

export default function MissileShowInfo({missileProps, bonus}: {missileProps: MissileProps, bonus: Bonus[]}) {
    return (
        <div className={ShowInfoStyles.showInfo}>
            <ExplosionVelocityShowInfo missile={missileProps} bonus={bonus} />
            <ExplosionRadiusShowInfo missile={missileProps} bonus={bonus} />
            <MissileRangeShowInfo missile={missileProps} bonus={bonus} />
            <DPSMissileShowInfo missile={missileProps} bonus={bonus} />
        </div>
    )
}
