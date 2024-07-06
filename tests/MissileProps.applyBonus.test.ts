import {describe, it} from "@jest/globals";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {equal, notEqual} from "node:assert";
import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";

describe('MissileProps applyBonus', () => {
    const missile: MissileProps = {
        rateOfFire: 1,
        velocity: 100,
        explosionDelay: 1,
        explosionRadius: 100,
        explosionVelocity: 100,
        damageReductionFactor: 1,
        damages: {
            emp: 5,
            explosive: 5,
            kinetic: 5,
            thermal: 5,
        },
    }

    it('should buff aoe', () => {
        const turretStatsBuffed = applyBonus(missile, [
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.AoeVelocityMultiplier},
            {bonus: 0.75, dogmaAttributeId: DogmaAttributeId.AoeCloudSizeMultiplier},
            {bonus: 1.25, dogmaAttributeId: DogmaAttributeId.AoeFalloffMultiplier}, // TODO
        ])

        equal(turretStatsBuffed.explosionVelocity, 150)
        equal(turretStatsBuffed.explosionRadius, 75)
    })

    it('should buff rate of fire and damage', () => {
        const turretStatsBuffed = applyBonus(missile, [
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.DamageMultiplier},
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.KineticMissileDamageBonus},
            {bonus: 0.9, dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier}, // TODO
        ])

        equal(turretStatsBuffed.damages.emp, 7.5)
        equal(turretStatsBuffed.damages.kinetic, 11.25)
        equal(turretStatsBuffed.rateOfFire, 0.9)
    })

    it('should buff flight time', () => {
        const turretStatsBuffed = applyBonus(missile, [
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.FlightTimeMultiplier},
        ])

        equal(turretStatsBuffed.explosionDelay, 1.5)
    })
})
