import {btoa} from "node:buffer";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const redirectUri = process.env.EVE_SSO_REDIRECT_URL as string
    const clientid = process.env.EVE_SSO_CLIENT_ID as string
    const secretkey = process.env.EVE_SSO_SECRET_KEY as string
    const credentials = `${clientid}:${secretkey}`
    const requestUrl = new URL(request.url)

    // Redirect to login eveonline oauth
    if (requestUrl.searchParams.get('login') === 'true') {
        const loginEveonlineUrl = new URL('https://login.eveonline.com/v2/oauth/authorize/')
        loginEveonlineUrl.searchParams.append('response_type', 'code')
        loginEveonlineUrl.searchParams.append('client_id', clientid)
        loginEveonlineUrl.searchParams.append('scope', [
            'esi-skills.read_skills.v1',
            'esi-fittings.read_fittings.v1',
            'esi-search.search_structures.v1'
        ].join(' '))
        loginEveonlineUrl.searchParams.append('redirect_uri', redirectUri)

        const state = new URLSearchParams({
            random:  Math.random().toString(36).substring(2),
            redirect: request.headers.get('Referer') ?? ''
        })

        cookies().set('eve-sso-state', state.toString(), { secure: true, httpOnly: true })
        loginEveonlineUrl.searchParams.append('state', state.toString())

        return redirect(loginEveonlineUrl.toString())
    }

    // Processing eve api oauth callback
    if (requestUrl.searchParams.get('state') && requestUrl.searchParams.get('code')) {
        const stateLocal = new URLSearchParams(cookies().get('eve-sso-state')?.value)
        if (requestUrl.searchParams.get('state') !== stateLocal.toString()) {
            return redirect('/?error=eve-sso')
        }

        const res = await fetch(`https://login.eveonline.com/v2/oauth/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`,
            },
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': requestUrl.searchParams.get('code') ?? ''
            })
        })

        const data = await res.json()

        if (res.status > 400) {
            return redirect('/?error=eve-sso')
        }

        cookies().set('eve-sso-access-token', data.access_token, { secure: true, maxAge: data.expires_in })
        cookies().set('eve-sso-refresh-token', data.refresh_token, { secure: true })

        return redirect(stateLocal.get('redirect') ?? '/')
    }

    return NextResponse.json('{}', { status: 400 })
}
