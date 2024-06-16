import {ShipBonus} from "@/libs/bonus/Bonus";
import {CharacterSkill, Ship, Turret} from "@/libs/EveApiEntities";
import {bonusIsApplicable, getShipBonusFromShipTrait} from "@/libs/ShipBonusCalculator";

export default function shipBonus(ship: Ship | undefined, turret: Turret | undefined, charSkills: CharacterSkill[]): ShipBonus[] {
    if (ship === undefined || turret === undefined) {
        return []
    }

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
