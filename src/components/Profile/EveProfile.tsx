'use client'

import {useEffect, useState} from "react";
import EveApiEsi from "@/libs/clients/EveApiEsi";
import EveSSOButton from "@/components/Profile/EveSSOButton";
import Image from "next/image";
import ProfileStyles from "./EveProfile.module.css"

export default function EveProfile() {
    const [characterId, setCharacterId] = useState('');
    const [characterName, setCharacterName] = useState('');

    useEffect(() => {
        const eveApi = new EveApiEsi(document.cookie);
        eveApi.getCharacterId().then(setCharacterId).catch(() => {})
        eveApi.getCharacterName().then(setCharacterName).catch(() => {})
    }, [])

    return (<div>
        {characterName !== '' ?
            <div className={ProfileStyles.profile}>
                <Image className={ProfileStyles.img} src={`https://images.evetech.net/characters/${characterId}/portrait`} alt='' width={64} height={64} unoptimized/>
                <p className={ProfileStyles.name}>{characterName}</p>
            </div> :
            <div className={ProfileStyles.eveSsoButton}>
                <EveSSOButton />
                <p>Login to apply your skills</p>
            </div>
        }
    </div>)
}
