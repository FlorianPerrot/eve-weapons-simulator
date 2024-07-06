'use client'

import {FittingSettings, FittingsSettingsContext, TargetSettings, TargetSettingsContext} from "./context";
import Settings from "../missile/Settings/Settings";
import {useEffect, useState} from "react";
import MissileChart from "./MissileChart";
import {CharacterSkill} from "@/libs/EveApiEntities";
import {createMissileProps, MissileProps} from "@/libs/missile/MissileProps";
import shipBonus from "@/libs/bonus/ShipBonus";
import skillMissileBonus from "@/libs/bonus/SkillMissileBonus";
import MissileShowInfo from "./MissileShowInfo";
import {Bonus} from "@/libs/bonus/Bonus";
import EveApiEsi from "@/libs/clients/EveApiEsi";

export default function Missile() {
    const [fittingsSettings, setFittingsSettings] = useState<FittingSettings>()
    const [bonus, setBonus] = useState<Bonus[]>([])
    const [missileProps, setMissileProps] = useState<MissileProps>()
    const [skills, setSkills] = useState<CharacterSkill[]>([])
    const [targetSettings, setTargetSettings] = useState<TargetSettings>({
        signatureRadius: 100,
    })

    useEffect(() => {
        new EveApiEsi(document.cookie)
            .getSkills()
            .then(setSkills)
            .catch(() => { "Ignore" })
    }, []);

    useEffect(() => {
        const missileProps = createMissileProps(fittingsSettings?.missile, fittingsSettings?.ammunitionOrCharge)
        const bonus = [
            ...skillMissileBonus(skills, fittingsSettings?.missile),
            ...shipBonus(fittingsSettings?.ship, fittingsSettings?.missile, skills),
        ]

        setBonus(bonus)
        setMissileProps(missileProps)
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


            { missileProps && fittingsSettings?.missile && fittingsSettings?.ammunitionOrCharge ?
                <>
                    <MissileShowInfo missileProps={missileProps} bonus={bonus}/>
                    <MissileChart targetSettings={targetSettings} missileProps={missileProps} bonus={bonus}/>
                </> : '' }
        </div>
    );
}
