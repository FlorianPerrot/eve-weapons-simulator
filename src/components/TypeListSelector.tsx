'use client'

import TypeListStyles from "@/components/TypeListSelector.module.css";
import TypeItem from "@/components/TypeItem";
import {EveType} from "@/libs/EveApiEntities";

export default function TypeListSelector({eveTypesList, eveTypeSelected, onEveTypeSelected}: {eveTypesList: EveType[], eveTypeSelected?: EveType, onEveTypeSelected?: (type: EveType) => void}) {
    return (
        <div className={TypeListStyles.wrapper}>
            <div className={TypeListStyles.typeSelected}>
                {
                    eveTypeSelected ? <TypeItem isSelected={true} type={eveTypeSelected}/> : ''
                }
            </div>
            <div className={TypeListStyles.typeList}>
                {
                    eveTypesList
                        .map(turret =>
                            <TypeItem key={turret.type_id} isSelected={turret.type_id === eveTypeSelected?.type_id} type={turret} onClick={onEveTypeSelected}/>
                        )
                }
            </div>
        </div>
    )
}
