import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Bonus} from "@/libs/bonus/Bonus";
import Styles from "@/components/Bonus/ShowInfo.module.css";
import Image from "next/image";
import {TurretProps} from "@/libs/turret/TurretProps";
import {Turret} from "@/libs/turret/Turret";
import {Tooltip} from "react-tooltip";

export default function FalloffRangeShowInfo({turretWithoutBonus, turretWithBonus, bonus}: {turretWithoutBonus: TurretProps; turretWithBonus: Turret; bonus: Bonus[]}) {
    const bonusOptimal = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.WeaponRangeMultiplier)} />
    const bonusFalloff = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.FalloffMultiplier)} />

    return (<div>
        <span>Falloff range: </span>
        <span className="link-effect" id="falloff">{((turretWithBonus.optimalRange + turretWithBonus.falloff) / 1000).toFixed(2)} km</span>
        <Tooltip anchorSelect="#falloff" openOnClick={true}>
            =&nbsp;
            optimal(<Image className={Styles.icon} src="/assets/range.png" alt="emp" width="18" height="18"/>{turretWithoutBonus.optimalRange}{bonusOptimal})
            &nbsp;+&nbsp;
            falloff(<Image className={Styles.icon} src="/assets/falloff.png" alt="emp" width="18" height="18"/>{turretWithoutBonus.falloff}{bonusFalloff})
        </Tooltip>
    </div>)
}
