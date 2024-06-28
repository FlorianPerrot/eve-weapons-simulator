import {describe, it} from "@jest/globals";
import {
    applyBonus,
    TurretProps
} from "@/libs/turret/TurretProps";

import {equal} from "node:assert";
import {AutoCannonI} from "./data";
import turretBonus from "@/libs/bonus/TurretBonus";

describe('TurretProps', () => {
    const turret: TurretProps = {
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

    it('should buff damage', () => {
        const bonus = turretBonus(AutoCannonI)

        const turretWithBonus = applyBonus(turret, bonus)

        equal(turretWithBonus.damages.emp, 5 * 2.8875)
    })
})
