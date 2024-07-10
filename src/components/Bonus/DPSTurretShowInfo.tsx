import {Tooltip} from "react-tooltip";
import DamagesShowInfo from "@/components/Bonus/DamagesShowInfo";
import RateOfFireShowInfo from "@/components/Bonus/RateOfFireShowInfo";
import {TurretProps} from "@/libs/turret/TurretProps";
import {Turret} from "@/libs/turret/Turret";
import {Bonus} from "@/libs/bonus/Bonus";

export default function DPSTurretShowInfo({turretWithoutBonus, turretWithBonus, bonus}: {turretWithoutBonus: TurretProps; turretWithBonus: Turret; bonus: Bonus[]}) {
    return (<div>
        <span>DPS: </span>
        <span className="link-effect" id="dps">{turretWithBonus.getMaxDps().toFixed(2)} Hit-point/s</span>
        <Tooltip anchorSelect="#dps" openOnClick={true}>
            =&nbsp;
            <DamagesShowInfo damages={turretWithoutBonus.damages} bonus={bonus}/>
            &nbsp;/&nbsp;
            <RateOfFireShowInfo rateOfFire={turretWithoutBonus.rateOfFire} bonus={bonus}/>
        </Tooltip>
    </div>)
}
