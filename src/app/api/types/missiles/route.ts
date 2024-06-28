import Missiles from '@/data/extracted/missiles.json'
import {NextResponse} from "next/server";

const missiles: { [key: string]: any } = Missiles

const search = function(query: string) {
    const results = Object.values(missiles).filter((missile) => {
        return missile.name.en.toLowerCase().includes(query)
    })

    return NextResponse.json(results, { status: 200 })
}

const getMissiles = function(ids: number[]) {
    const results = ids.flatMap(id => missiles[id] ?? [])

    return NextResponse.json(results, { status: 200 })
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)

    const query = requestUrl.searchParams.get('search')?.toLowerCase()
    const ids = requestUrl.searchParams.get('ids')
        ?.split(',')
        .map(i => Number(i))

    if (ids) {
        return getMissiles(ids)
    }

    if (query !== undefined && query !== '') {
        return search(query)
    }

    return NextResponse.json([], { status: 400 })
}
