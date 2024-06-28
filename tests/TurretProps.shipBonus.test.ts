import {describe, it} from "@jest/globals";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {equal} from "node:assert";
import {charSkills, ship1, turret1} from "./data";
import shipBonus from "@/libs/bonus/ShipBonus";

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

    it('should buff optimalRange', () => {
        const bonus = shipBonus(ship1, turret1, charSkills)
        const turretWithBonus = applyBonus(turretStats, bonus)
        equal(turretWithBonus.optimalRange, 1000*1.05*1.15)
    })
})
