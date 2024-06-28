import {describe, it} from "@jest/globals";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {equal, notEqual} from "node:assert";

describe('TurretProps', () => {
    const turretStats: TurretProps = {
        optimalRange: 1000,
        falloff: 1000,
        turretTracking: 50,
        signatureResolution: 50,
        rateOfFire: 1,
        damages: {
            emp: 5,
            explosive: 5,
            kinetic: 5,
            thermal: 5,
        },
    }

    it('should buff optimalRange & rate of fire', () => {
        const turretStatsBuffed = applyBonus(turretStats, [
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.WeaponRangeMultiplier},
            {bonus: 1.25, dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier},
        ])

        equal(turretStatsBuffed.optimalRange, 1500)
        equal(turretStatsBuffed.rateOfFire, 2-1.25)
    })

    it('should buff falloff & tracking speed', () => {
        const turretStatsBuffed = applyBonus(turretStats, [
            {bonus: 1.1, dogmaAttributeId: DogmaAttributeId.FalloffMultiplier},
            {bonus: 1.5, dogmaAttributeId: DogmaAttributeId.TrackingSpeedMultiplier},
        ])

        equal(turretStatsBuffed.falloff, 1100)
        equal(turretStatsBuffed.turretTracking, 75)
    })

    it('should buff damages', () => {
        const turretStatsBuffed = applyBonus(turretStats, [
            {bonus: 1.2, dogmaAttributeId: DogmaAttributeId.DamageMultiplier},
        ])

        equal(turretStatsBuffed.damages.emp, 6)
        equal(turretStatsBuffed.damages.explosive, 6)
        equal(turretStatsBuffed.damages.kinetic, 6)
        equal(turretStatsBuffed.damages.thermal, 6)
    })


    it('should no be same object', () => {
        const turretStatsBuffed = applyBonus(turretStats, [
            {bonus: 1.2, dogmaAttributeId: DogmaAttributeId.DamageMultiplier},
        ])

        notEqual(turretStatsBuffed, turretStats)
    })

    it('should no buff with unknow attribute', () => {
        const turretStatsBuffed = applyBonus(turretStats, [
            {bonus: 20, dogmaAttributeId: DogmaAttributeId.ChargeSize},
        ])

        equal(turretStatsBuffed.optimalRange, turretStats.optimalRange)
        equal(turretStatsBuffed.falloff, turretStats.falloff)
        equal(turretStatsBuffed.turretTracking, turretStats.turretTracking)
        equal(turretStatsBuffed.signatureResolution, turretStats.signatureResolution)
        equal(turretStatsBuffed.rateOfFire, turretStats.rateOfFire)
        equal(turretStatsBuffed.damages.emp, turretStats.damages.emp)
    })
})
