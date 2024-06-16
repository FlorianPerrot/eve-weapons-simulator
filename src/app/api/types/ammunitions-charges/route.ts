import AmmunitionsCharges from '@/data/extracted/ammunitions-charges.json'
import Groups from '@/data/raw/groups.json'
import {NextResponse} from "next/server";
import {DogmaAttribute} from "@/libs/EveApiEntities";

const ammunitionsCharges: { [key: string]: any } = AmmunitionsCharges

const search = function(query: string, dogmas: DogmaAttribute[] = []) {
    const searchFilter = (charge: any) => {
        return charge.name.en.toLowerCase().includes(query)
    }

    const dogmasFilter = (charge: any) => {
        if (dogmas.length > 0) {
            return dogmas.map(
                (dogma) => {
                    return charge.dogma_attributes[dogma.attribute_id]?.value == dogma.value
                }
            ).every(v => v)
        }

        return true
    }

    const results = Object.values(ammunitionsCharges).filter((charge) => {
        return searchFilter(charge) && dogmasFilter(charge)
    })

    return NextResponse.json(results, { status: 200 })
}

const getCharges = function(ids: string[]) {
    const results = ids.flatMap(id => ammunitionsCharges[id] ?? [])

    return NextResponse.json(results, { status: 200 })
}

const getChargesByGroupId = function(groupId: string) {
    // @ts-ignore
    const typeIds: number[] = Groups[groupId]?.type_ids ?? []
    const results = typeIds.flatMap(id => ammunitionsCharges[String(id)] ?? [])

    return NextResponse.json(results, { status: 200 })
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)

    const query = requestUrl.searchParams.get('search')?.toLowerCase()
    const groupId = requestUrl.searchParams.get('groupId') || undefined
    const ids = requestUrl.searchParams.get('ids')?.split(',') || []
    const dogmasFromSearchParams = requestUrl.searchParams.get('dogmas')?.split(',') || []
    const dogmas: DogmaAttribute[] = dogmasFromSearchParams
        .flatMap(i => {
            let [attributeId, attributeValue] = i.split(':')
            return attributeId && attributeValue ? [{
                attribute_id: attributeId,
                value: attributeValue
            }] : []
        })

    if (ids.length > 0) {
        return getCharges(ids)
    }

    if (groupId) {
        return getChargesByGroupId(groupId)
    }

    if (query && query !== '') {
        return search(query, dogmas)
    }

    if (dogmas.length > 0) {
        return search('', dogmas)
    }

    return NextResponse.json([], { status: 400 })
}
