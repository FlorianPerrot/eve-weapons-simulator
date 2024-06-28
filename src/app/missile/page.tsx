'use client'

import {FittingSettings, FittingsSettingsContext, TargetSettings, TargetSettingsContext} from "./context";
import Settings from "../missile/Settings/Settings";
import {useEffect, useState} from "react";
import MissileChart from "./MissileChart";
import {CharacterSkill} from "@/libs/EveApiEntities";
import {createMissileProps, applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import skillTurretBonus from "@/libs/bonus/SkillTurretBonus";
import shipBonus from "@/libs/bonus/ShipBonus";
import turretBonus from "@/libs/bonus/TurretBonus";
import ammunitionAndChargeBonus from "@/libs/bonus/AmmunitionAndChargeBonus";
import skillMissileBonus from "@/libs/bonus/SkillMissileBonus";

export default function Missile() {
    const [fittingsSettings, setFittingsSettings] = useState<FittingSettings>()
    const [missileProps, setMissileProps] = useState<MissileProps>({
        rateOfFire: 1,
        velocity: 1,
        explosionVelocity: 100,
        explosionRadius: 100,
        damageReductionFactor: 1,
        explosionDelay: 1,
        damages: {
            emp: 1,
            explosive: 1,
            kinetic: 1,
            thermal: 1
        }
    })
    const [skills, setSkills] = useState<CharacterSkill[]>([])
    const [targetSettings, setTargetSettings] = useState<TargetSettings>({
        signatureRadius: 100,
    })

    useEffect(() => {
        let tmpMissileProps = createMissileProps(fittingsSettings?.missile, fittingsSettings?.ammunitionOrCharge)

        const bonus = [
            ...skillMissileBonus(skills, fittingsSettings?.missile),
            ...shipBonus(fittingsSettings?.ship, fittingsSettings?.missile, skills),
        ]

        tmpMissileProps = applyBonus(tmpMissileProps, bonus)

        setMissileProps(tmpMissileProps)
    }, [skills, fittingsSettings, targetSettings]);

    return (
        <div>
            <FittingsSettingsContext.Provider value={[fittingsSettings, setFittingsSettings]} >
                <TargetSettingsContext.Provider value={[targetSettings, setTargetSettings]}>
                    <Settings />
                </TargetSettingsContext.Provider>
            </FittingsSettingsContext.Provider>

            <p>
                Tool under construction: report issue or contrib on <a target="_blank" href="https://github.com/FlorianPerrot/eve-weapons-simulator/issues">Github</a><br/>
            </p>

            <MissileChart targetSettings={targetSettings} missileProps={missileProps} />
        </div>
    );
}
