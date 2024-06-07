import {btoa} from "node:buffer";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const clientid = process.env.EVE_SSO_CLIENT_ID as string
    const secretkey = process.env.EVE_SSO_SECRET_KEY as string
    const credentials = `${clientid}:${secretkey}`

    const res = await fetch(`https://login.eveonline.com/v2/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(credentials)}`,
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': cookies().get('eve-sso-refresh-token')?.value ?? ''
        })
    })

    const data = await res.json()

    if (res.status > 400) {
        return NextResponse.json(data, { status: res.status })
    }

    cookies().set('eve-sso-access-token', data.access_token, { secure: true, maxAge: data.expires_in })
    cookies().set('eve-sso-refresh-token', data.refresh_token, { secure: true })

    return NextResponse.json(data, { status: 200 })
}