import {Bonus} from "@/libs/bonus/Bonus";
import {AmmunitionAndCharge, DogmaAttributeId, Turret} from "@/libs/EveApiEntities";

export type TurretStats = {
    optimalRange: number;
    falloff: number;
    turretTracking: number;
    signatureResolution: number;
    rateOfFire: number;
    damages: {
        emp: number;
        explosive: number;
        kinetic: number;
        thermal: number;
    }
}

export type TurretStatsWithBuffs = TurretStats

export function getDamages(turretStats: TurretStats): number {
    return turretStats.damages.emp +
        turretStats.damages.explosive +
        turretStats.damages.thermal +
        turretStats.damages.kinetic
}

export function getDPS(turretStats: TurretStats): number {
    return getDamages(turretStats) * (1/(turretStats.rateOfFire/1000))
}

export function createTurretStats(turret?: Turret, ammunitionAndCharge?: AmmunitionAndCharge): TurretStats {
    return {
        falloff: Number(turret?.dogma_attributes[DogmaAttributeId.AccuracyFalloff].value),
        optimalRange: Number(turret?.dogma_attributes[DogmaAttributeId.OptimalRange].value),
        turretTracking: Number(turret?.dogma_attributes[DogmaAttributeId.TurretTracking].value),
        rateOfFire: Number(turret?.dogma_attributes[DogmaAttributeId.RateOfFire].value),
        signatureResolution: Number(turret?.dogma_attributes[DogmaAttributeId.SignatureResolution].value),
        damages: {
            emp: Number(ammunitionAndCharge?.dogma_attributes[DogmaAttributeId.EmDamage].value),
            thermal: Number(ammunitionAndCharge?.dogma_attributes[DogmaAttributeId.ThermalDamage].value),
            kinetic: Number(ammunitionAndCharge?.dogma_attributes[DogmaAttributeId.KineticDamage].value),
            explosive: Number(ammunitionAndCharge?.dogma_attributes[DogmaAttributeId.ExplosiveDamage].value),
        },
    }
}

export function applyBonus(turretStats: TurretStats, bonus: Bonus[]): TurretStatsWithBuffs {
    let turretStatsWithBuffs: TurretStatsWithBuffs = {...turretStats}

    bonus.forEach(b => {
        if (b.dogmaAttributeId === DogmaAttributeId.WeaponRangeMultiplier) {
            turretStatsWithBuffs.optimalRange *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.FalloffMultiplier) {
            turretStatsWithBuffs.falloff *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.TrackingSpeedMultiplier) {
            turretStatsWithBuffs.turretTracking *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier) {
            turretStatsWithBuffs.rateOfFire *= 2-b.bonus // Convert 1.1 rof to bonus multiplier 0.9
        } else if (b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier) {
            turretStatsWithBuffs.damages.emp *= b.bonus
            turretStatsWithBuffs.damages.kinetic *= b.bonus
            turretStatsWithBuffs.damages.explosive *= b.bonus
            turretStatsWithBuffs.damages.thermal *= b.bonus
        }
    })

    return turretStatsWithBuffs
}
