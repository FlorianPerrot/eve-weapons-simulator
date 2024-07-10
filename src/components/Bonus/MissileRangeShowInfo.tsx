import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Bonus} from "@/libs/bonus/Bonus";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import Image from "next/image";
import {Tooltip} from "react-tooltip";
import {MissileProps} from "@/libs/missile/MissileProps";
import {Missile} from "@/libs/missile/Missile";

export default function MissileRangeShowInfo({missile, bonus}: {missile: MissileProps; bonus: Bonus[]}) {
    const bonusExplosionDelay = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.FlightTimeMultiplier)} />
    const bonusMissileVelocity = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.MissileVelocityMultiplier)} />
    const missileWithBonus = new Missile(missile, bonus)

    return (<div>
        <span>Range: </span>
        <span className="link-effect" id="explosionDelay">{(missileWithBonus.explosionDelay / Math.pow(10, 6) * missileWithBonus.velocity).toFixed(2)} km</span>
        <Tooltip anchorSelect="#explosionDelay" openOnClick={true}>
            =&nbsp;
            explosion delay(<Image className={Styles.icon} src="/assets/delay.png" alt="emp" width="18" height="18"/>{missile.explosionDelay / 1000}{bonusExplosionDelay})
            &nbsp;x&nbsp;
            missile velocity(<Image className={Styles.icon} src="/assets/velocity.png" alt="emp" width="18" height="18"/>{missile.velocity}{bonusMissileVelocity})
        </Tooltip>
    </div>)
}
