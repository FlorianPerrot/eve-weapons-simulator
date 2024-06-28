'use client'

import {useEffect, useState} from "react";

import TurretChart from "./TurretChart";
import EveApiEsi from "@/libs/clients/EveApiEsi";
import {FittingsSettingsContext, TargetSettingsContext} from "./context";
import {FittingSettingsProps} from "./Settings/FittingSettings";
import {TargetSettingsProps} from "./Settings/TargetSettings";
import {CharacterSkill} from "@/libs/EveApiEntities";
import skillTurretBonus from "@/libs/bonus/SkillTurretBonus";
import shipBonus from "@/libs/bonus/ShipBonus";
import turretBonus from "@/libs/bonus/TurretBonus";
import ammunitionAndChargeBonus from "@/libs/bonus/AmmunitionAndChargeBonus";
import {applyBonus, createTurretProps, TurretProps} from "@/libs/turret/TurretProps";
import Settings from "./Settings/Settings";

export default function Turret() {
    const [fittingsSettings, setFittingsSettings] = useState<FittingSettingsProps>()
    const [targetSettings, setTargetSettings] = useState<TargetSettingsProps>({
        signatureRadius: 100,
        transversalVelocity: 400
    })

    const [skills, setSkills] = useState<CharacterSkill[]>([])
    const [turret, setTurret] = useState<TurretProps>({
        optimalRange: 1000,
        falloff: 1000,
        turretTracking: 50,
        signatureResolution: 40000,
        rateOfFire: 1000,
        damages: {
            emp: 1,
            explosive: 1,
            kinetic: 1,
            thermal: 1
        }
    })

    useEffect(() => {
        new EveApiEsi(document.cookie)
            .getSkills()
            .then(setSkills)
            .catch(() => { "Ignore" })
    }, []);

    useEffect(() => {
        let tmpTurretStats = createTurretProps(fittingsSettings?.turret, fittingsSettings?.ammunitionOrCharge)

        const bonus = [
            ...skillTurretBonus(skills, fittingsSettings?.turret),
            ...shipBonus(fittingsSettings?.ship, fittingsSettings?.turret, skills),
            ...turretBonus(fittingsSettings?.turret),
            ...ammunitionAndChargeBonus(fittingsSettings?.ammunitionOrCharge),
        ]

        tmpTurretStats = applyBonus(tmpTurretStats, bonus)

        setTurret(tmpTurretStats)
    }, [skills, fittingsSettings, targetSettings]);

    return (
        <div>
            <FittingsSettingsContext.Provider value={[fittingsSettings, setFittingsSettings]} >
                <TargetSettingsContext.Provider value={[targetSettings, setTargetSettings]}>
                    <Settings />
                </TargetSettingsContext.Provider>
            </FittingsSettingsContext.Provider>

            <p>
                Tool under construction: report issue or contrib  on <a target="_blank" href="https://github.com/FlorianPerrot/eve-weapons-simulator/issues">Github</a><br/>
            </p>

            <TurretChart
                turret={turret}
                targetSettings={targetSettings}
            />
        </div>
    );
}
