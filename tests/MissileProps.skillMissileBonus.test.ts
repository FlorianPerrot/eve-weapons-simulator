import {describe, it} from "@jest/globals";
import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import {SkillId} from "@/libs/EveApiEntities";
import {equal} from "node:assert";
import skillMissleBonus from "@/libs/bonus/SkillMissileBonus";
import {RocketLauncherI} from "./data";

describe('MissileProps', () => {
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

    it('should buff rate of fire and damage', () => {
        const bonus = skillMissleBonus([
            {
                skill_id: SkillId.RapidLaunch,
                active_skill_level: 5
            },
            {
                skill_id: SkillId.WarheadUpgrades,
                active_skill_level: 5
            }
        ], RocketLauncherI)

        const missileWithBonus = applyBonus(missile, bonus)

        equal(missileWithBonus.damages.emp, 5*1.1)
        equal(missileWithBonus.rateOfFire, 2-1.15)
    })

    it('should buff flight time and max velocity', () => {
        const bonus = skillMissleBonus([
            {
                skill_id: SkillId.MissileBombardment,
                active_skill_level: 1
            },
            {
                skill_id: SkillId.MissileProjection,
                active_skill_level: 2
            }
        ], RocketLauncherI)

        const missileWithBonus = applyBonus(missile, bonus)

        equal(missileWithBonus.velocity, 120)
        equal(missileWithBonus.explosionDelay, 1.1)
    })


    it('should buff explosion radius and velocity', () => {
        const bonus = skillMissleBonus([
            {
                skill_id: SkillId.GuidedMissilePrecision,
                active_skill_level: 4
            },
            {
                skill_id: SkillId.TargetNavigationPrediction,
                active_skill_level: 2
            }
        ], RocketLauncherI)

        const missileWithBonus = applyBonus(missile, bonus)

        equal(missileWithBonus.explosionRadius, 80)
        equal(missileWithBonus.explosionVelocity, 120)
    })
})
