import {Bonus} from "@/libs/bonus/Bonus";
import {AmmunitionAndCharge as ChargeApi, DogmaAttributeId, Turret as TurretApi} from "@/libs/EveApiEntities";
import {Damages} from "@/libs/WeaponsProps";

export type TurretProps = {
    optimalRange: number;
    falloff: number;
    turretTracking: number;
    signatureResolution: number;
    rateOfFire: number;
    damages: Damages
}

export function createTurretProps(turret?: TurretApi, charge?: ChargeApi): TurretProps {
    return {
        falloff: Number(turret?.dogma_attributes[DogmaAttributeId.AccuracyFalloff].value),
        optimalRange: Number(turret?.dogma_attributes[DogmaAttributeId.OptimalRange].value),
        turretTracking: Number(turret?.dogma_attributes[DogmaAttributeId.TurretTracking].value),
        rateOfFire: Number(turret?.dogma_attributes[DogmaAttributeId.RateOfFire].value),
        signatureResolution: Number(turret?.dogma_attributes[DogmaAttributeId.SignatureResolution].value),
        damages: {
            emp: Number(charge?.dogma_attributes[DogmaAttributeId.EmDamage].value),
            thermal: Number(charge?.dogma_attributes[DogmaAttributeId.ThermalDamage].value),
            kinetic: Number(charge?.dogma_attributes[DogmaAttributeId.KineticDamage].value),
            explosive: Number(charge?.dogma_attributes[DogmaAttributeId.ExplosiveDamage].value),
        },
    }
}

export function applyBonus(turretStats: TurretProps, bonus: Bonus[]): TurretProps {
    let turretStatsWithBuffs: TurretProps = {...turretStats, damages: {...turretStats.damages}}

    bonus.forEach(b => {
        if (b.dogmaAttributeId === DogmaAttributeId.WeaponRangeMultiplier) {
            turretStatsWithBuffs.optimalRange *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.FalloffMultiplier) {
            turretStatsWithBuffs.falloff *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.TrackingSpeedMultiplier) {
            turretStatsWithBuffs.turretTracking *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier) {
            turretStatsWithBuffs.rateOfFire *= b.bonus // Convert 1.1 rof to bonus multiplier 0.9
        } else if (b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier) {
            turretStatsWithBuffs.damages.emp *= b.bonus
            turretStatsWithBuffs.damages.kinetic *= b.bonus
            turretStatsWithBuffs.damages.explosive *= b.bonus
            turretStatsWithBuffs.damages.thermal *= b.bonus
        }
    })

    return turretStatsWithBuffs
}
