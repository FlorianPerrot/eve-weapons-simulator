'use client'

import Image from "next/image";
import {MouseEventHandler} from "react";
import TypeOptionStyles from "./TypeItem.module.css"
import {EveType} from "@/libs/EveApiEntities";

export default function TypeItem({type, isSelected = false, onClick}: {type: EveType; isSelected?: boolean; onClick?: (type: EveType) => void}) {
    const onEventClick: MouseEventHandler = (e) => {
        e.preventDefault()
        onClick !== undefined && onClick(type)
    }

    return (
        <div className={TypeOptionStyles.type + ' ' + (isSelected ? TypeOptionStyles.typeIsSelected : TypeOptionStyles.typeNotSelected)} key={type.name.en} onClick={onEventClick} data-type-id={type.type_id}>
            <Image className={TypeOptionStyles.img} data-is-selected={isSelected} src={`https://images.evetech.net/types/${type.type_id}/icon?size=64`}
                   alt='' width={64} height={64} unoptimized
                   onError={(event) => {
                       event.currentTarget.src = '/default.png'
                    }}
            />
            <p className={TypeOptionStyles.name}>{type.name.en}</p>
        </div>
    )
}
