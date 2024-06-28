import {describe, it} from "@jest/globals";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {equal} from "node:assert";
import {EmpS, VoidS} from "./data";
import ammunitionAndChargeBonus from "@/libs/bonus/AmmunitionAndChargeBonus";

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
        const bonus = ammunitionAndChargeBonus(EmpS)

        const turretWithBonus = applyBonus(turretStats, bonus)

        equal(turretWithBonus.optimalRange, 500)
    })

    it('should buff optimalRange', () => {
        const bonus = ammunitionAndChargeBonus(VoidS)

        const turretWithBonus = applyBonus(turretStats, bonus)

        equal(turretWithBonus.optimalRange, 750)
        equal(turretWithBonus.falloff, 500)
        equal(turretWithBonus.turretTracking, 50*0.75)
    })
})
