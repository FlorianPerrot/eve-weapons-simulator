
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function GET(request: Request) {
    cookies().delete('eve-sso-access-token')
    cookies().delete('eve-sso-refresh-token')

    return redirect(request.headers.get('Referer') ?? '/')
}
