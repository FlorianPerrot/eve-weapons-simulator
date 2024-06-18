import Image from "next/image";

export default function EveSSOButton() {
    return (
        <a href="/api/eve-sso?login=true">
            <Image
                src='https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-white-large.png'
                alt='login at eve online account' width={270} height={45}
            />
        </a>
    )
}