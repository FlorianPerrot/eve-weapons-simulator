import {describe, it} from "@jest/globals";
import {applyBonus, applySkillsBonus, TurretStats} from "@/libs/TurretStats";
import {DogmaAttributeId, SkillId} from "@/libs/EveApiEntities";
import {equal, notEqual} from "node:assert";

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

    it('should buff optimalRange & rate of fire', () => {
        const turretStatsBuffed = applySkillsBonus(turretStats, [
            {
                skill_id: SkillId.RapidFiring,
                active_skill_level: 2
            },
            {
                skill_id: SkillId.Sharpshooter,
                active_skill_level: 2
            }
        ])

        equal(turretStatsBuffed.optimalRange, 1100)
        equal(turretStatsBuffed.rateOfFire, 1.08)
    })

    it('should buff falloff & tracking speed', () => {
        const turretStatsBuffed = applySkillsBonus(turretStats, [
            {
                skill_id: SkillId.TrajectoryAnalysis,
                active_skill_level: 2
            },
            {
                skill_id: SkillId.MotionPrediction,
                active_skill_level: 4
            }
        ])

        equal(turretStatsBuffed.falloff, 1100)
        equal(turretStatsBuffed.turretTracking, 60)
    })

    it('should buff damages', () => {
        const turretStatsBuffed = applySkillsBonus(turretStats, [
            {
                skill_id: SkillId.SurgicalStrike,
                active_skill_level: 5
            },
        ])

        equal(turretStatsBuffed.damages.emp, 5*1.15)
    })
})
