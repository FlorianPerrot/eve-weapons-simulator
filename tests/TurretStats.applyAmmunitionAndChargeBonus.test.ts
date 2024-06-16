import {describe, it} from "@jest/globals";
import {applyAmmunitionAndChargeBonus, applyBonus, applySkillsBonus, TurretStats} from "@/libs/TurretStats";
import {DogmaAttributeId, SkillId} from "@/libs/EveApiEntities";
import {equal, notEqual} from "node:assert";
import {EmpS, VoidS} from "./data";

describe('TurretStats', () => {
    const turretStats: TurretStats = {
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

    it('should buff optimalRange', () => {
        const turretStatsBuffed = applyAmmunitionAndChargeBonus(turretStats, EmpS)

        equal(turretStatsBuffed.optimalRange, 500)
    })

    it('should buff optimalRange', () => {
        const turretStatsBuffed = applyAmmunitionAndChargeBonus(turretStats, VoidS)

        equal(turretStatsBuffed.optimalRange, 750)
        equal(turretStatsBuffed.falloff, 500)
        equal(turretStatsBuffed.turretTracking, 50*0.75)
    })
})
