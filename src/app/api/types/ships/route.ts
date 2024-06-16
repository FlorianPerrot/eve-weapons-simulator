import Ships from '@/data/extracted/ships.json'
import {NextResponse} from "next/server";

const ships: {[key: string]: any} = Ships

const search = function(query: string) {
    const results = Object.values(ships).filter((ship) => {
        return ship.name.en.toLowerCase().includes(query)
    })

    return NextResponse.json(results, { status: 200 })
}

const getShips = function(ids: number[]) {
    const results = ids.flatMap(id => ships[id] ?? [])

    return NextResponse.json(results, { status: 200 })
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)

    const query = requestUrl.searchParams.get('search')?.toLowerCase()
    const ids = requestUrl.searchParams.get('ids')
        ?.split(',')
        .map(i => Number(i))

    if (ids) {
        return getShips(ids)
    }

    if (query !== undefined && query !== '') {
        return search(query)
    }

    return NextResponse.json([], { status: 400 })
}
