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
import {createTurretProps, TurretProps} from "@/libs/turret/TurretProps";
import Settings from "./Settings/Settings";
import TurretShowInfo from "./TurretShowInfo";
import {Bonus} from "@/libs/bonus/Bonus";

export default function Turret() {
    const [fittingsSettings, setFittingsSettings] = useState<FittingSettingsProps>()
    const [bonus, setBonus] = useState<Bonus[]>([])
    const [targetSettings, setTargetSettings] = useState<TargetSettingsProps>({
        signatureRadius: 100,
        transversalVelocity: 400
    })

    const [skills, setSkills] = useState<CharacterSkill[]>([])
    const [turret, setTurret] = useState<TurretProps>()

    useEffect(() => {
        new EveApiEsi(document.cookie)
            .getSkills()
            .then(setSkills)
            .catch(() => { "Ignore" })
    }, []);

    useEffect(() => {
        let turretProps = createTurretProps(fittingsSettings?.turret, fittingsSettings?.ammunitionOrCharge)
        const bonus = [
            ...skillTurretBonus(skills, fittingsSettings?.turret),
            ...shipBonus(fittingsSettings?.ship, fittingsSettings?.turret, skills),
            ...turretBonus(fittingsSettings?.turret),
            ...ammunitionAndChargeBonus(fittingsSettings?.ammunitionOrCharge),
        ]

        setBonus(bonus)
        setTurret(turretProps)
    }, [skills, fittingsSettings, targetSettings]);

    return (
        <div>
            <FittingsSettingsContext.Provider value={[fittingsSettings, setFittingsSettings]}>
                <TargetSettingsContext.Provider value={[targetSettings, setTargetSettings]}>
                    <Settings/>
                </TargetSettingsContext.Provider>
            </FittingsSettingsContext.Provider>

            <p>
                Tool under construction: report issue or contrib on <a target="_blank" href="https://github.com/FlorianPerrot/eve-weapons-simulator/issues">Github</a><br/>
            </p>

            {turret && fittingsSettings?.turret && fittingsSettings?.ammunitionOrCharge ?
                <>
                    <TurretShowInfo turretProps={turret} bonus={bonus}/>
                    <TurretChart targetSettings={targetSettings} turret={turret} bonus={bonus}/>
                </> : ''}
        </div>
    );
}
