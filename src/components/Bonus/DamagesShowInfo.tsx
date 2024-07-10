import Image from "next/image";

import {Damages} from "@/libs/WeaponsProps";
import {Bonus} from "@/libs/bonus/Bonus";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import Styles from "./ShowInfo.module.css"
import {ReactElement} from "react";

export default function DamagesShowInfo({damages, bonus}: {damages: Damages, bonus: Bonus[]}) {
    const bonusDamage = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier)} />
    const bonusDamageKinetic = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.KineticMissileDamageBonus)} />

    const damagesByType: ReactElement[] = []
    if (damages.emp > 0) {
        damagesByType.push(<><Image className={Styles.icon} src="/assets/emp.png" alt="emp" width="18" height="18" />{damages.emp}</>)
    }
    if (damages.thermal > 0) {
        damagesByType.push(<><Image className={Styles.icon} src="/assets/thermal.png" alt="thermal" width="18" height="18" />{damages.thermal}</>)
    }
    if (damages.explosive > 0) {
        damagesByType.push(<><Image className={Styles.icon} src="/assets/explosive.png" alt="explosive" width="18" height="18" />{damages.explosive}</>)
    }
    if (damages.kinetic > 0) {
        damagesByType.push(<><Image className={Styles.icon} src="/assets/kinetic.png" alt="kinetic" width="18" height="18" />{damages.kinetic}{bonusDamageKinetic}</>)
    }

    return (<>
        damages ({damagesByType}) {bonusDamage}
    </>)
}
