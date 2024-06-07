'use client'

import Image from "next/image";
import {MouseEventHandler} from "react";

export default function EveSSOButton({clientId, redirectUri, scopes}: {clientId: string; redirectUri: string; scopes: string[]}) {
    const onLoginEve: MouseEventHandler = function (event) {
        event.preventDefault()

        const loginEveonlineUrl = new URL('https://login.eveonline.com/v2/oauth/authorize/')
        loginEveonlineUrl.searchParams.append('response_type', 'code')
        loginEveonlineUrl.searchParams.append('client_id', clientId)
        loginEveonlineUrl.searchParams.append('scope', scopes.join(' '))
        loginEveonlineUrl.searchParams.append('redirect_uri', redirectUri)

        const state = new URLSearchParams({
            random:  Math.random().toString(36).substring(2),
            redirect: window.location.pathname
        })

        document.cookie = `eve-sso-state=${state.toString()}`
        loginEveonlineUrl.searchParams.append('state', state.toString())

        document.location = loginEveonlineUrl.toString()
    }

    return (
        <a href="https://login.eveonline.com/v2/oauth/authorize/" onClick={onLoginEve}>
            <Image
                src='https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-white-large.png'
                alt='login at eve online account' width={270} height={45}
            />
        </a>
    )
}