import {AmmunitionAndCharge as ChargeApi, DogmaAttributeId, Missile as MissileApi,} from "@/libs/EveApiEntities";
import {Bonus} from "@/libs/bonus/Bonus";

export type MissileProps = {
    rateOfFire: number;
    velocity: number;
    explosionDelay: number;
    explosionRadius: number;
    explosionVelocity: number;
    damageReductionFactor: number;
    damages: {
        emp: number;
        explosive: number;
        kinetic: number;
        thermal: number;
    }
}

export function createMissileProps(missile?: MissileApi, charge?: ChargeApi): MissileProps {
    return {
        rateOfFire: Number(missile?.dogma_attributes[DogmaAttributeId.RateOfFire].value),
        velocity: Number(charge?.dogma_attributes[DogmaAttributeId.MaxVelocity].value),
        damageReductionFactor: Number(charge?.dogma_attributes[DogmaAttributeId.AoeDamageReductionFactor].value),
        explosionDelay: Number(charge?.dogma_attributes[DogmaAttributeId.ExplosionDelay].value),
        explosionRadius: Number(charge?.dogma_attributes[DogmaAttributeId.AoeCloudSize].value),
        explosionVelocity: Number(charge?.dogma_attributes[DogmaAttributeId.AoeVelocity].value),
        damages: {
            emp: Number(charge?.dogma_attributes[DogmaAttributeId.EmDamage].value),
            thermal: Number(charge?.dogma_attributes[DogmaAttributeId.ThermalDamage].value),
            kinetic: Number(charge?.dogma_attributes[DogmaAttributeId.KineticDamage].value),
            explosive: Number(charge?.dogma_attributes[DogmaAttributeId.ExplosiveDamage].value),
        },
    }
}

export function applyBonus(missileProps: MissileProps, bonus: Bonus[]): MissileProps {
    let missilePropsWithBuffs: MissileProps = {...missileProps, damages: {...missileProps.damages}}

    bonus.forEach(b => {
        if (b.dogmaAttributeId === DogmaAttributeId.MissileVelocityMultiplier) {
            missilePropsWithBuffs.velocity *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.AoeVelocityMultiplier) {
            missilePropsWithBuffs.explosionVelocity *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.FlightTimeMultiplier) {
            missilePropsWithBuffs.explosionDelay *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.AoeCloudSizeMultiplier) {
            missilePropsWithBuffs.explosionRadius *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier) {
            missilePropsWithBuffs.rateOfFire *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier) {
            missilePropsWithBuffs.damages.emp *= b.bonus
            missilePropsWithBuffs.damages.kinetic *= b.bonus
            missilePropsWithBuffs.damages.explosive *= b.bonus
            missilePropsWithBuffs.damages.thermal *= b.bonus
        } else if (b.dogmaAttributeId === DogmaAttributeId.KineticMissileDamageBonus) {
            missilePropsWithBuffs.damages.kinetic *= b.bonus
        }
    })

    return missilePropsWithBuffs
}
