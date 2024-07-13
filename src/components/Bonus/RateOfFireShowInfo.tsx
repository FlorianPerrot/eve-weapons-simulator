import Image from "next/image";

import {Damages} from "@/libs/WeaponsProps";
import {Bonus} from "@/libs/bonus/Bonus";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import Styles from "./ShowInfo.module.css"

export default function RateOfFireShowInfo({rateOfFire, bonus}: {rateOfFire: number, bonus: Bonus[]}) {
    const bonusRateOfFire = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier)} />

    return (<>
        rate of fire( <Image className={Styles.icon} src="/assets/rateOfFire.png" alt="rate of fire" width="18" height="18" />{rateOfFire/1000}{bonusRateOfFire} )
    </>)
}
