import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Bonus} from "@/libs/bonus/Bonus";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import Image from "next/image";
import {Tooltip} from "react-tooltip";
import {Turret} from "@/libs/turret/Turret";
import {TurretProps} from "@/libs/turret/TurretProps";

export default function TrackingSpeedShowInfo({turretWithoutBonus, turretWithBonus, bonus}: {turretWithoutBonus: TurretProps; turretWithBonus: Turret; bonus: Bonus[]}) {
    const bonusTrackingSpeed = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.TrackingSpeedMultiplier)} />

    return (<div>
        <span>Tracking Speed: </span>
        <span className="link-effect" id="turretTracking">{turretWithBonus.turretTracking.toFixed(2)}</span>
        <Tooltip anchorSelect="#turretTracking" openOnClick={true}>
            = <Image className={Styles.icon} src="/assets/trackingSpeed.png" alt="tracking speed" width="18" height="18"/>{turretWithoutBonus.turretTracking}{bonusTrackingSpeed}
        </Tooltip>
    </div>)
}
