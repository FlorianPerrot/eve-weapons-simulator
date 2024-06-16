import {CharacterSkill, DogmaAttributeId, Ship, ShipTrait, Turret} from "@/libs/EveApiEntities";
import {ShipBonus} from "@/libs/bonus/Bonus";

export function bonusIsApplicable(shipBonus: ShipBonus, turret: Turret): boolean {
    const turretSkills = Object.keys(turret.required_skills ?? {})
    return turretSkills.some((skill) => shipBonus.skillIdsRequireByModuleToBeApplicable.includes(skill))
}

export function getAllShipBonus(ship: Ship, turret: Turret, charSkills: CharacterSkill[]): ShipBonus[] {
    const roleBonus = Object.values(ship.traits?.role_bonuses || [])
        .map((trait) => getShipBonusFromShipTrait(trait))
        .filter((shipBonus) => bonusIsApplicable(shipBonus, turret))

    const miscBonus = Object.values(ship.traits?.misc_bonuses || [])
        .map((trait) => getShipBonusFromShipTrait(trait))
        .filter((shipBonus) => bonusIsApplicable(shipBonus, turret))

    const typeBonus = Object.entries(ship.traits?.types || {})
        .flatMap(([skillId, traits]) => {
            const skill = charSkills.find(skill => skill.skill_id == skillId)
            const skillLevel = skill?.active_skill_level || 1
            return  Object.values(traits)
                .map((trait) => getShipBonusFromShipTrait(trait))
                .filter((shipBonus) => bonusIsApplicable(shipBonus, turret))
                .map((shipBonus) => {
                    // TODO Refacto with better methode
                    shipBonus.bonus = Number((((((shipBonus.bonus-1)*100)*skillLevel)/100)+1).toFixed(3))
                    return shipBonus
                })

        })

    return [
        ...roleBonus,
        ...miscBonus,
        ...typeBonus
    ]
}

export function getShipBonusFromShipTrait(trait: ShipTrait): ShipBonus {
    const skillReg = /showinfo:(?<skillId>\d+)>.+?<\/a>/g
    const skillMatchs = Array.from( trait.bonus_text.en.matchAll( skillReg ) )
    const skillIds = skillMatchs.flatMap(i => i.groups?.skillId ? [ i.groups.skillId ] : [])

    const bonusTypeReg = /<\/a> (?<bonusType>(?:\w|\s)+)$/
    const bonusTypeMatch = trait.bonus_text.en.match(bonusTypeReg)
    const bonusType = bonusTypeMatch && bonusTypeMatch.groups ? bonusTypeMatch.groups.bonusType : ''
    const bonusTypeMapper: { [key: string]: DogmaAttributeId } = {
        'damage': DogmaAttributeId.DamageMultiplier,
        'rate of fire': DogmaAttributeId.RateOfFireMultiplier,
        'optimal range': DogmaAttributeId.WeaponRangeMultiplier,
        'falloff': DogmaAttributeId.FalloffMultiplier,
        'tracking speed': DogmaAttributeId.TrackingSpeedMultiplier,
    }

    if (skillIds.length === 0 || !bonusTypeMapper.hasOwnProperty(bonusType)) {
        return {
            bonus: 1,
            dogmaAttributeId: DogmaAttributeId.Unknown,
            skillIdsRequireByModuleToBeApplicable: []
        }
    }

    return {
        bonus: (trait.bonus/100)+1,
        skillIdsRequireByModuleToBeApplicable: skillIds,
        dogmaAttributeId: bonusTypeMapper[bonusType]
    }
}
