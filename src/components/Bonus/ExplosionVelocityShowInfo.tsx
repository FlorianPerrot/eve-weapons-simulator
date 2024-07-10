import {Bonus} from "@/libs/bonus/Bonus";
import Image from "next/image";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Tooltip} from "react-tooltip";
import {MissileProps} from "@/libs/missile/MissileProps";
import {Missile} from "@/libs/missile/Missile";

export default function ExplosionVelocityShowInfo({missile, bonus}: {missile: MissileProps; bonus: Bonus[]}) {
    const bonusExplosionVelocity = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.AoeVelocityMultiplier)} />
    const missileWithBonus = new Missile(missile, bonus)

    return (<div>
        <span>Explosion velocity: </span>
        <span className="link-effect" id="explosionVelocity">{Math.round(missileWithBonus.explosionVelocity)} m/s</span>
        <Tooltip anchorSelect="#explosionVelocity" openOnClick={true}>
            = <Image className={Styles.icon} src="/assets/radius.png" alt="emp" width="18" height="18"/>{missile.explosionVelocity}{bonusExplosionVelocity}
        </Tooltip>
    </div>)
}
