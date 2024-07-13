import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Bonus} from "@/libs/bonus/Bonus";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import Image from "next/image";
import {Tooltip} from "react-tooltip";
import {TurretProps} from "@/libs/turret/TurretProps";
import {Turret} from "@/libs/turret/Turret";

export default function OptimalRangeShowInfo({turret, turretWithBonus, bonus}: {turret: TurretProps; turretWithBonus: Turret; bonus: Bonus[]}) {
    const bonusOptimal = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.WeaponRangeMultiplier)} />

    return (<div>
        <span>Optimal range: </span>
        <span className="link-effect" id="optimalRange">{(turretWithBonus.optimalRange / 1000).toFixed(2)} km</span>
        <Tooltip anchorSelect="#optimalRange" openOnClick={true}>
            = <Image className={Styles.icon} src="/assets/range.png" alt="range" width="18" height="18"/>{turret.optimalRange}{bonusOptimal}
        </Tooltip>
    </div>)
}
