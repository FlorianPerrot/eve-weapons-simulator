const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const getTypes = () =>
    fs.promises.readFile('./src/data/raw/types.json', 'utf8')
        .then((data) => JSON.parse(data))

const getMarketGroups = () =>
    fs.promises.readFile('./src/data/raw/market_groups.json', 'utf8')
        .then((data) => JSON.parse(data))

const getDogmaAttributes = () =>
    fs.promises.readFile('./src/data/raw/dogma_attributes.json', 'utf8')
        .then((data) => JSON.parse(data))

const getDogmaEffects = () =>
    fs.promises.readFile('./src/data/raw/dogma_effects.json', 'utf8')
        .then((data) => JSON.parse(data))

const getGroups = () =>
    fs.promises.readFile('./src/data/raw/groups.json', 'utf8')
        .then((data) => JSON.parse(data))

const saveFile = function (name, content) {
    return fs.promises.writeFile(`./src/data/extracted/${name}.json`, content)
}

const downloadAndExtractRefData = async function () {
    const inputDir = `${__dirname}/reference-data-latest.tar.xz`
    const outputDir = `${__dirname}/raw/`
    const url = `https://data.everef.net/reference-data/reference-data-latest.tar.xz`
    const stream = fs.createWriteStream(inputDir);

    console.log('downloading')
    const { body } = await fetch(url);
    await finished(Readable.fromWeb(body).pipe(stream));
    console.log('tar')
    await exec(`tar -xvf ${inputDir} -C ${outputDir}`);
}

const getTypesFromGroupName = async function (name, groupNames) {
    const types = await getTypes()
    const marketGroups = await getMarketGroups()

    const getTypeIds = (group) => {
        if (group?.child_market_group_ids) {
            let t =  group.child_market_group_ids.map((groupId) => {
                return getTypeIds(marketGroups[groupId.toString()])
            })

            return t.flat()
        }
        return group?.type_ids ?? []
    }

    let primaryGroups = Object.values(marketGroups).filter((item) => {
        const blueprintGroupIds = [
            2, // Blueprints & Reactions
            211, // Ammunitions & Charges
            210, // Turrets & Bays
        ]
        return groupNames.includes(item?.name?.en) && !blueprintGroupIds.includes(item?.parent_group_id)
    })

    const typesByGroup = primaryGroups
        .flatMap(primaryGroup => getTypeIds(primaryGroup))
        .reduce((obj, id) => ({ ...obj, [id]: types[id] }))

    const content = JSON.stringify(typesByGroup)

    return await saveFile(name, content)
}

const extract = async function() {
    await getTypesFromGroupName('turrets', ['Projectile Turrets', 'Energy Turrets', 'Hybrid Turrets', 'Precursor Turrets'])
    await getTypesFromGroupName('missiles', ['Missile Launchers'])
    await getTypesFromGroupName('ships', ['Ships'])
    await getTypesFromGroupName('ammunitions-charges', ['Missiles', 'Hybrid Charges', 'Projectile Ammo', 'Frequency Crystals', 'Exotic Plasma Charges'])
}

async function extractTypeWithDogmas(id) {
    const types = await getTypes()
    const dogmaAttributes = await getDogmaAttributes()
    const dogmaEffects = await getDogmaEffects()

    const type = types[id]
    Object.entries(type.dogma_attributes).forEach(([key, element]) => {
        type.dogma_attributes[key]["attribute"] = dogmaAttributes[element.attribute_id]
    })
    Object.entries(type.dogma_effects).forEach(([key, element]) => {
        type.dogma_effects[key]["effect"] = dogmaEffects[element.effect_id]
    })

    saveFile(`TYPE ${id} ${type?.name.en}`, JSON.stringify(type))
}

async function extractTypesWithGroupId(id) {
    const groups = await getGroups()
    const group = groups[id]
    const typeIds = group.type_ids

    const types = await getTypes()

    const typeFromGroup = Object.fromEntries(typeIds.map(typeId => [typeId, types[typeId]]))

    saveFile(`TYPES with group ${group?.name.en}`, JSON.stringify(typeFromGroup))
}

async function main() {
    await downloadAndExtractRefData()
    await extract()
}

main()
