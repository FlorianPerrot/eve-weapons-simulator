import {describe, it} from "@jest/globals";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {SkillId} from "@/libs/EveApiEntities";
import {equal} from "node:assert";
import skillTurretBonus from "@/libs/bonus/SkillTurretBonus";
import {AutoCannonI} from "./data";

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

    it('should buff optimalRange & rate of fire', () => {
        const bonus = skillTurretBonus([
            {
                skill_id: SkillId.RapidFiring,
                active_skill_level: 2
            },
            {
                skill_id: SkillId.Sharpshooter,
                active_skill_level: 2
            }
        ], AutoCannonI)

        const turretWithBonus = applyBonus(turret, bonus)

        equal(turretWithBonus.optimalRange, 1100)
        equal(turretWithBonus.rateOfFire, 2-1.08)
    })

    it('should buff falloff & tracking speed', () => {
        const bonus = skillTurretBonus([
            {
                skill_id: SkillId.TrajectoryAnalysis,
                active_skill_level: 2
            },
            {
                skill_id: SkillId.MotionPrediction,
                active_skill_level: 4
            }
        ], AutoCannonI)

        const turretWithBonus = applyBonus(turret, bonus)

        equal(turretWithBonus.falloff, 1100)
        equal(turretWithBonus.turretTracking, 60)
    })

    it('should buff damages', () => {
        const bonus = skillTurretBonus([
            {
                skill_id: SkillId.SurgicalStrike,
                active_skill_level: 5
            },
        ], AutoCannonI)

        const turretWithBonus = applyBonus(turret, bonus)

        equal(turretWithBonus.damages.emp, 5*1.15)
    })
})
