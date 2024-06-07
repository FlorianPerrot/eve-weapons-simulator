'use client'

import {MouseEventHandler} from "react";
import EveApi from "@/libs/EveApi";

export default function TestButton() {
    const onClick: MouseEventHandler = (event) => {
        event.preventDefault()
        const skills = EveApi
            .getSkills()
            .then(console.log)
    }

    return (<a href='' onClick={onClick}>TEST BUTTON</a>)
}
