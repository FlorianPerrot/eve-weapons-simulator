import {btoa} from "node:buffer";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const clientid = process.env.EVE_SSO_CLIENT_ID as string
    const secretkey = process.env.EVE_SSO_SECRET_KEY as string
    const credentials = `${clientid}:${secretkey}`
    const requestUrl = new URL(request.url)

    const stateLocal = new URLSearchParams(cookies().get('eve-sso-state')?.value)
    if (requestUrl.searchParams.get('state') !== stateLocal.toString()) {
        redirect('/?error=eve-sso')
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
        redirect('/?error=eve-sso')
    }

    cookies().set('eve-sso-access-token', data.access_token, { secure: true, maxAge: data.expires_in })
    cookies().set('eve-sso-refresh-token', data.refresh_token, { secure: true })

    return redirect(stateLocal.get('redirect') ?? '/')
}