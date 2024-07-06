import {TurretBonus} from "@/libs/bonus/Bonus";
import {DogmaAttributeId, Turret} from "@/libs/EveApiEntities";

export default function turretBonus(turret?: Turret): TurretBonus[] {
    if (turret === undefined) return []

    const bonus =  [
        DogmaAttributeId.DamageMultiplier,
    ].flatMap((dogmaAttributeId): TurretBonus[] => {
        if (turret.dogma_attributes.hasOwnProperty(dogmaAttributeId)) {
            return [{
                source: 'Turret',
                bonus: Number(turret.dogma_attributes[dogmaAttributeId].value),
                dogmaAttributeId: dogmaAttributeId
            }]
        }

        return []
    })

    return bonus
}
