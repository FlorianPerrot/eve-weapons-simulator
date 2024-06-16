import {describe, it} from "@jest/globals";
import {applyShipBonus, TurretStats} from "@/libs/TurretStats";
import {equal} from "node:assert";
import {charSkills, ship1, turret1} from "./data";

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
        const turretStatsBuffed = applyShipBonus(turretStats, ship1, turret1, charSkills)

        equal(turretStatsBuffed.optimalRange, 1000*1.05*1.15) // TODO CHECK IN REAL CASE (stackable bonus)
    })
})
