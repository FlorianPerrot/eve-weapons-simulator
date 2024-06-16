import {DogmaAttribute, EveType} from "@/libs/EveApiEntities";

export default class EveApiLocal {
    async search(query: string, route: string, dogmas: DogmaAttribute[] = []): Promise<{ [key: string]: EveType }> {
        const searchParams = new URLSearchParams({
            search: query,
            dogmas: dogmas.map(dogma => `${dogma.attribute_id}:${dogma.value}`)
                .join(',')
        })

        let response = await fetch(`/api/types/${route}?${searchParams}`)

        return await response.json()
    }

    async getTypesByGroup(ids: string[], route: string): Promise<{ [key: string]: object }> {
        const searchParams = new URLSearchParams({
            ids: ids.join(',')
        })

        let response = await fetch(`/api/types/${route}?${searchParams}`)

        return await response.json()
    }
}
