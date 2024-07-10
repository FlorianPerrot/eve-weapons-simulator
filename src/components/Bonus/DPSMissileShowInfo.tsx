import {Tooltip} from "react-tooltip";
import DamagesShowInfo from "@/components/Bonus/DamagesShowInfo";
import RateOfFireShowInfo from "@/components/Bonus/RateOfFireShowInfo";
import {Bonus} from "@/libs/bonus/Bonus";
import {Missile} from "@/libs/missile/Missile";
import {MissileProps} from "@/libs/missile/MissileProps";

export default function DPSMissileShowInfo({missile, bonus}: {missile: MissileProps; bonus: Bonus[]}) {
    const missileWithBonus = new Missile(missile, bonus)

    return (<div>
        <span>DPS: </span>
        <span className="link-effect" id="dps">{missileWithBonus.getMaxDps().toFixed(2)} Hit-point/s</span>
        <Tooltip anchorSelect="#dps" openOnClick={true}>
            =&nbsp;
            <DamagesShowInfo damages={missile.damages} bonus={bonus}/>
            &nbsp;/&nbsp;
            <RateOfFireShowInfo rateOfFire={missile.rateOfFire} bonus={bonus}/>
        </Tooltip>
    </div>)
}
