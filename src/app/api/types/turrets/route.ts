import Turrets from '@/data/extracted/turrets.json'
import {NextResponse} from "next/server";

const turrets: { [key: string]: any } = Turrets

const search = function(query: string) {
    const results = Object.values(turrets).filter((turret) => {
        return turret.name.en.toLowerCase().includes(query)
    })

    return NextResponse.json(results, { status: 200 })
}

const getTurrets = function(ids: number[]) {
    const results = ids.flatMap(id => turrets[id] ?? [])

    return NextResponse.json(results, { status: 200 })
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)

    const query = requestUrl.searchParams.get('search')?.toLowerCase()
    const ids = requestUrl.searchParams.get('ids')
        ?.split(',')
        .map(i => Number(i))

    if (ids) {
        return getTurrets(ids)
    }

    if (query !== undefined && query !== '') {
        return search(query)
    }

    return NextResponse.json([], { status: 400 })
}
