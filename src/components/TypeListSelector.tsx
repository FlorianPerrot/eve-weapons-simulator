'use client'

import TypeListStyles from "@/components/TypeListSelector.module.css";
import TypeItem from "@/components/TypeItem";
import {Type} from "@/libs/EveApi";

export default function TypeListSelector({turrets, turretSelected, onTurretSelected}: {turrets: Type[], turretSelected?: Type, onTurretSelected?: (turret: Type) => void}) {
    return (
        <div className={TypeListStyles.wrapper}>
            <div className={TypeListStyles.typeSelected}>
                {
                    turretSelected ? <TypeItem key={turretSelected.type_id} isSelected={true} type={turretSelected} onClick={onTurretSelected}/> : ''
                }
            </div>
            <div className={TypeListStyles.typeList}>
                {
                    turrets
                        .map(turret =>
                            <TypeItem key={turret.type_id} isSelected={turret.type_id === turretSelected?.type_id} type={turret} onClick={onTurretSelected}/>
                        )
                }
            </div>
        </div>
    )
}
