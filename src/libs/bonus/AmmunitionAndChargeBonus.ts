import {AmmunitionAndChargeBonus} from "@/libs/bonus/Bonus";
import {AmmunitionAndCharge, DogmaAttributeId} from "@/libs/EveApiEntities";

export default function ammunitionAndChargeBonus(ammunitionAndCharge: AmmunitionAndCharge | undefined): AmmunitionAndChargeBonus[] {
    if (ammunitionAndCharge === undefined) return []

    const bonus = [
        DogmaAttributeId.WeaponRangeMultiplier,
        DogmaAttributeId.TrackingSpeedMultiplier,
        DogmaAttributeId.FalloffMultiplier
    ].flatMap((dogmaAttributeId): AmmunitionAndChargeBonus[] => {
        if (ammunitionAndCharge.dogma_attributes.hasOwnProperty(dogmaAttributeId)) {
            return [{
                source: 'Charge',
                bonus: Number(ammunitionAndCharge.dogma_attributes[dogmaAttributeId].value),
                dogmaAttributeId: dogmaAttributeId
            }]
        }

        return []
    })

    return bonus
}
