import {Bonus} from "@/libs/bonus/Bonus";
import Image from "next/image";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Tooltip} from "react-tooltip";
import {MissileProps} from "@/libs/missile/MissileProps";
import {Missile} from "@/libs/missile/Missile";

export default function ExplosionRadiusShowInfo({missile, bonus}: {missile: MissileProps; bonus: Bonus[]}) {
    const bonusExplosionRadius = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.AoeCloudSizeMultiplier)} />
    const missileWithBonus = new Missile(missile, bonus)

    return (<div>
        <span>Explosion radius: </span>
        <span className="link-effect" id="explosionRadius">{missileWithBonus.explosionRadius} m</span>
        <Tooltip anchorSelect="#explosionRadius" openOnClick={true}>
            = <Image className={Styles.icon} src="/assets/radius.png" alt="radius" width="18" height="18"/>{missile.explosionRadius}{bonusExplosionRadius}
        </Tooltip>
    </div>)
}
