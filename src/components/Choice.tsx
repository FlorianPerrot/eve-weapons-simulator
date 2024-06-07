'use client'

import {ChangeEventHandler, MouseEventHandler, useCallback, useRef, useState} from "react";
import EveApi, {Type} from "@/libs/EveApi";
import {debounce} from "@/libs/Utils";
import ChoiceStyles from "@/components/Choice.module.css";
import TypeListSelector from "@/components/TypeListSelector";

export const turretGroupIds = [
    55, // Projectile Weapon
    74, // Hybrid Weapon
    53, // Energy Weapon
    1986, //Precursor Weapon
]

export const missileGroupIds = [
    510, // Missile Launcher Heavy
    509, // Missile Launcher Light
    506, // Missile Launcher Cruise
    524, // Missile Launcher XL Torpedo
    386, // Cruise Missile
    385, // Heavy Missile
    // TODO
]

export const shipGroupIds = [
    31, // Shuttle
    237, // Corvette
    25, // Frigate
    324, // Assault Frigate
    26, // Cruiser
    420, // Destroyer
    1201, // Attack Battlecruiser
    27, // Battleship
    485, // Dreadnought
    547, // Carrier
    30, // Titan
    28, // Hauler
    29, // Capsule
    // TODO
]


export default function Choice({groupdIds, placeholder}: {groupdIds: number[]; placeholder: string}) {
    const [typeSearch, setTypeSearch] = useState<Type[]>([])
    const [type, setType] = useState<Type>()
    const [text, setText] = useState('')
    const [hideSelectType, setHideSelectType] = useState(false)
    const disableMouseEvent = useRef(false)

    const runSearch = useCallback(debounce((target: HTMLInputElement) => EveApi.search(target.value, [], 10)
        .then(types => {
            setTimeout(() => { disableMouseEvent.current = false }, 1000);
            setTypeSearch(types)
        }), 1000), [])

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.currentTarget

        disableMouseEvent.current = true
        runSearch(target)
        setText(target.value)
    }

    const onClick: (t: Type) => void = (t) => {
        setType(t)
    }

    const toggleHideSelectType: MouseEventHandler = (event) => {
        if (!disableMouseEvent.current) setHideSelectType(event.type !== 'mouseenter')
    }

    return (
        <div className={ChoiceStyles.wrapper} onMouseLeave={toggleHideSelectType} onMouseEnter={toggleHideSelectType}>
            <div className={ChoiceStyles.search}>
                <input placeholder={placeholder} className={ChoiceStyles.input} type='text' value={text} onChange={onChange}/>
            </div>
            <TypeListSelector turrets={hideSelectType ? [] : typeSearch} turretSelected={type} onTurretSelected={onClick}/>
        </div>
    )
}
