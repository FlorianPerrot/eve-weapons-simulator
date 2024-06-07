'use client'

import {
    ChangeEventHandler, MouseEventHandler, useRef,
    useState
} from "react";
import {debounce} from "@/libs/Utils";
import EveApi, {Type} from "@/libs/EveApi";
import ChoiceStyles from './Choice.module.css'
import TypeListSelector from "@/components/TypeListSelector";

const turretsGroupIds = [
    55, // Projectile Weapon
    74, // Hybrid Weapon
    53, // Energy Weapon
    1986, //Precursor Weapon
]

const missiles = [
    510, // Missile Launcher Heavy
    509, // Missile Launcher Light
    506, // Missile Launcher Cruise
    524, // Missile Launcher XL Torpedo
    386, // Cruise Missile
    385, // Heavy Missile
    // TODO
]

export default function ChoiceAmmunition() {
    const [turretsSearch, setTurretsSearch] = useState<Type[]>([])
    const [turret, setTurret] = useState<Type>()
    const [text, setText] = useState('')
    const [hideSelectType, setHideSelectType] = useState(false)
    const disableMouseEvent = useRef(false)

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.currentTarget
        setText(target.value)
        disableMouseEvent.current = true
        debounce(() => {
            EveApi.search(target.value, turretsGroupIds, 10)
                .then((turrets) => {
                    debounce(() => { disableMouseEvent.current = false }, 1000)
                    setTurretsSearch(turrets)
                })
        }, 1000)()
    }

    const onClick: (type: Type) => void = (type) => {
        setTurret(type)
    }

    const toggleHideSelectType: MouseEventHandler = (event) => {
        if (!disableMouseEvent.current) setHideSelectType(event.type !== 'mouseenter')
    }

    return (
        <div className={ChoiceStyles.wrapper} onMouseLeave={toggleHideSelectType} onMouseEnter={toggleHideSelectType}>
            <div className={ChoiceStyles.search}>
                <input className={ChoiceStyles.input} type='text' value={text} onChange={onChange}/>
            </div>
            <TypeListSelector turrets={hideSelectType ? [] : turretsSearch} turretSelected={turret} onTurretSelected={onClick}/>
        </div>
    )
}
