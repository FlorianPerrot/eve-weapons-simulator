import {Bonus} from "@/libs/bonus/Bonus";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {Turret} from "@/libs/turret/Turret";
import TrackingSpeedShowInfo from "@/components/Bonus/TrackingSpeedShowInfo";
import FalloffRangeShowInfo from "@/components/Bonus/FalloffRangeShowInfo";
import OptimalRangeShowInfo from "@/components/Bonus/OptimalRangeShowInfo";
import DPSTurretShowInfo from "@/components/Bonus/DPSTurretShowInfo";
import ShowInfoStyles from "@/components/Bonus/ShowInfo.module.css"

export default function TurretShowInfo({turretProps, bonus}: {turretProps: TurretProps, bonus: Bonus[]}) {
    const turretWithBonus = applyBonus(turretProps, bonus)
    const turret = new Turret(turretWithBonus)

    return (
        <div className={ShowInfoStyles.showInfo}>
            <TrackingSpeedShowInfo turretWithoutBonus={turretProps} turretWithBonus={turret} bonus={bonus} />
            <OptimalRangeShowInfo turret={turretProps} turretWithBonus={turret} bonus={bonus} />
            <FalloffRangeShowInfo turretWithoutBonus={turretProps} turretWithBonus={turret} bonus={bonus} />
            <DPSTurretShowInfo turretWithoutBonus={turretProps} turretWithBonus={turret} bonus={bonus} />
        </div>
    )
}
