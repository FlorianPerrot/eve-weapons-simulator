'use client'

import Image from "next/image";
import {Type} from "@/libs/EveApi";
import {MouseEventHandler} from "react";
import TypeOptionStyles from "./TypeItem.module.css"

export default function TypeItem({type, isSelected, onClick}: {type: Type; isSelected: boolean; onClick?: (type: Type) => void}) {
    const onEventClick: MouseEventHandler = (e) => {
        e.preventDefault()
        onClick !== undefined && onClick(type)
    }

    return (
        <a className={TypeOptionStyles.type + ' ' + (isSelected ? TypeOptionStyles.typeIsSelected : TypeOptionStyles.typeNotSelected)} href='' key={type.name.en} onClick={onEventClick} data-type-id={type.type_id}>
            <Image className={TypeOptionStyles.img} data-is-selected={isSelected} src={`https://images.evetech.net/types/${type.type_id}/icon?size=64`}
                   alt='' width={64} height={64} unoptimized
                   onError={(event) => {
                       event.currentTarget.src = '/default.png'
                    }}
            />
            <p className={TypeOptionStyles.name}>{type.name.en}</p>
        </a>
    )
}
