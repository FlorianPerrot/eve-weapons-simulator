'use client'

export type Type = {
    name: {
        en: string;
    }

    type_id: number;
    group_id: number;
}

class EveApi {

    accessToken: string
    refreshToken: string

    constructor(cookies: string) {
        const eveSsoAccessTokenCookie = (cookies.split(';')
            .find((item) => item.trim().startsWith("eve-sso-access-token=")) ?? '')
            .split("=")
        const eveSsoRefreshTokenCookie = (cookies.split(';')
            .find((item) => item.trim().startsWith("eve-sso-refresh-token=")) ?? '')
            .split("=")

        this.accessToken = eveSsoAccessTokenCookie.length === 2 ? eveSsoAccessTokenCookie[1] : ''
        this.refreshToken = eveSsoRefreshTokenCookie.length === 2 ? eveSsoRefreshTokenCookie[1] : ''
    }

    async search(query: string, groupIds: number[] = [], limit: number = 10): Promise<Type[]> {
        const characterId = await this.getCharacterId()

        const searchParams = new URLSearchParams({
            categories: 'inventory_type',
            language: 'en',
            search: query,
            strict: 'false'
        })

        const doFetchCall = () => fetch(`https://esi.evetech.net/latest/characters/${characterId}/search/?${searchParams}`, {
            headers: {authorization: `Bearer ${this.accessToken}`}
        })

        let response = await doFetchCall()
        if (!response.ok) {
            await this.regenerateAccessToken()
            response = await doFetchCall()
        }

        if (!response.ok) { return [] }
        let jsonResponse: { inventory_type: string[]; } = await response.json()

        const items = []
        for (const typeId of jsonResponse.inventory_type) {
            if (items.length >= limit) break
            items.push(this.getType(typeId))
        }

        return Promise.all(items)
            .then(items => items.filter(item => groupIds.length === 0 || groupIds.includes(item.group_id)))
    }

    getType(id: string) {
        return fetch(`https://ref-data.everef.net/types/${id}`)
            .then(response => response.json())
    }

    async getSkills(): Promise<object[]> {
        const characterId = await this.getCharacterId()

        const doFetchCall = () => fetch(`https://esi.evetech.net/latest/characters/${characterId}/skills/?datasource=tranquility`, {
            headers: {authorization: `Bearer ${this.accessToken}`}
        })

        let response = await doFetchCall()

        if (response.status >= 400) {
            await this.regenerateAccessToken()
            response = await doFetchCall()

            if (response.status >= 400) {
                throw new Error(await response.json())
            }
        }

        return response.json()
    }

    async getCharacterId() {
        const jwt = await this.getJwt();
        const sub = jwt.sub.split(':')

        return sub.length === 3 ? sub[2] : ''
    }

    async getCharacterName() {
        const jwt = await this.getJwt();

        return jwt.name
    }

    async regenerateAccessToken() {
        let response = await fetch(`/api/eve-sso-refresh-token`)
        let json = await response.json()

        if (response.status >= 400) {
            throw new Error(json)
        }

        this.accessToken = json.access_token
        this.refreshToken = json.refresh_token
    }

    private async getJwt() {
        if (this.refreshToken === '') {
            throw new Error('Refresh token not exist')
        }

        if (this.accessToken === '') {
            await this.regenerateAccessToken()
        }

        const jwtPayload = this.accessToken.split('.')[1] ?? ''
        const jwtPayloadParse: { name: string; sub: string; } = JSON.parse(atob(jwtPayload) || '{}')
        return jwtPayloadParse;
    }
}

const eveApi = new EveApi(document.cookie)

export default eveApi
