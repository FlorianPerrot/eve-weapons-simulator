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
        new EveApiEsi(document.cookie).getCharacterId().then(setCharacterId)
        new EveApiEsi(document.cookie).getCharacterName().then(setCharacterName)
    }, [])

    return (<div>
        {characterName !== '' ?
            <div className={ProfileStyles.profile}>
                <Image className={ProfileStyles.img} src={`https://images.evetech.net/characters/${characterId}/portrait`} alt='' width={64} height={64} unoptimized/>
                <p className={ProfileStyles.name}>{characterName}</p>
            </div> :
            <div className={ProfileStyles.eveSsoButton}>
                <EveSSOButton
                    clientId={process.env.NEXT_PUBLIC_EVE_SSO_CLIENT_ID ?? ''}
                    redirectUri={process.env.NEXT_PUBLIC_EVE_SSO_REDIRECT_URL ?? ''}
                    scopes={[
                        'esi-skills.read_skills.v1',
                        'esi-fittings.read_fittings.v1',
                        'esi-search.search_structures.v1'
                    ]}
                />
                <p>Login to apply your skills</p>
            </div>
        }
    </div>)
}
