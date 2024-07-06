import {ShipBonus} from "@/libs/bonus/Bonus";
import {CharacterSkill, DogmaAttributeId, Missile, Ship, ShipTrait, Turret} from "@/libs/EveApiEntities";

export function bonusIsApplicable(shipBonus: ShipBonus, weapon: Turret | Missile): boolean {
    const missileSkills = Object.keys(weapon.required_skills ?? {})
    return missileSkills.some((skill) => shipBonus.skillIdsRequireByModuleToBeApplicable.includes(skill))
}

export default function shipBonus(ship: Ship | undefined, weapon: Turret | Missile | undefined, charSkills: CharacterSkill[]): ShipBonus[] {
    if (ship === undefined || weapon === undefined) {
        return []
    }

    const roleBonus = Object.values(ship.traits?.role_bonuses || [])
        .map((trait) => getShipBonusFromShipTrait(trait))
        .filter((shipBonus) => bonusIsApplicable(shipBonus, weapon))

    const miscBonus = Object.values(ship.traits?.misc_bonuses || [])
        .map((trait) => getShipBonusFromShipTrait(trait))
        .filter((shipBonus) => bonusIsApplicable(shipBonus, weapon))

    const typeBonus = Object.entries(ship.traits?.types || {})
        .flatMap(([skillId, traits]) => {
            const skill = charSkills.find(skill => skill.skill_id == skillId)
            const skillLevel = skill?.active_skill_level || 1
            return  Object.values(traits)
                .map((trait) => getShipBonusFromShipTrait(trait))
                .filter((shipBonus) => bonusIsApplicable(shipBonus, weapon))
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
    const skillReg = /showinfo:(\d+)>.+?<\/a>/g
    const skillMatchs = Array.from( trait.bonus_text.en.matchAll( skillReg ) )
    const skillIds = skillMatchs.flatMap(i => i.length === 2 ? [ i[1] ] : [])

    const bonusDogma =[
        { regex: /bonus to kinetic/, dogma: DogmaAttributeId.KineticMissileDamageBonus },
        { regex: /optimal range/, dogma: DogmaAttributeId.WeaponRangeMultiplier },
        { regex: /falloff/, dogma: DogmaAttributeId.FalloffMultiplier },
        { regex: /rate of fire/, dogma: DogmaAttributeId.RateOfFireMultiplier },
        { regex: /tracking speed/, dogma: DogmaAttributeId.TrackingSpeedMultiplier },
        { regex: /max velocity/, dogma: DogmaAttributeId.MissileVelocityMultiplier },
        { regex: /explosion radius/, dogma: DogmaAttributeId.AoeCloudSizeMultiplier },
        { regex: /explosion velocity/, dogma: DogmaAttributeId.AoeVelocityMultiplier },
        { regex: /flight time/, dogma: DogmaAttributeId.FlightTimeMultiplier },
        { regex: /damage/, dogma: DogmaAttributeId.DamageMultiplier }
    ].find(mapper => {
        return trait.bonus_text.en.match(mapper.regex)
    })

    if (skillIds.length === 0 || bonusDogma === undefined) {
        return {
            source: 'Ship',
            bonus: 1,
            dogmaAttributeId: DogmaAttributeId.Unknown,
            skillIdsRequireByModuleToBeApplicable: []
        }
    }

    let bonus = (trait.bonus/100)+1
    if (bonusDogma.dogma === DogmaAttributeId.RateOfFireMultiplier || bonusDogma.dogma === DogmaAttributeId.AoeCloudSizeMultiplier) {
        bonus = 2 - bonus
    }

    return {
        source: 'Ship',
        bonus: bonus,
        skillIdsRequireByModuleToBeApplicable: skillIds,
        dogmaAttributeId: bonusDogma.dogma
    }
}
