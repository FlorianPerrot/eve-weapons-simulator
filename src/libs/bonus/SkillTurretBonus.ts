import {SkillBonus} from "@/libs/bonus/Bonus";
import {CharacterSkill, DogmaAttributeId, SkillId, Turret} from "@/libs/EveApiEntities";

export default function skillTurretBonus(charSkills: CharacterSkill[], turret: Turret | undefined): SkillBonus[] {
    const skillBonus = charSkills.flatMap((skill): SkillBonus[] => {
        if (skill.skill_id == SkillId.Sharpshooter) {
            return [{
                bonus: 5*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.WeaponRangeMultiplier
            }]
        } else if (skill.skill_id == SkillId.TrajectoryAnalysis) {
            return [{
                bonus: 5*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.FalloffMultiplier
            }]
        } else if (skill.skill_id == SkillId.MotionPrediction) {
            return [{
                bonus: 5*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.TrackingSpeedMultiplier
            }]
        } else if (skill.skill_id == SkillId.RapidFiring) {
            return [{
                bonus: 4*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier
            }]
        } else if (skill.skill_id == SkillId.SurgicalStrike) {
            return [{
                bonus: 3*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.DamageMultiplier
            }]
        }

        if (turret && Object.keys(turret.required_skills || {}).find(skillId => skillId == skill.skill_id)) {
            let skillId = Number(skill.skill_id)

            // Gunnery
            if (skill.skill_id == SkillId.Gunnery) {
                return [{
                    bonus: 2*skill.active_skill_level/100+1,
                    dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier
                }]
            }

            // Small Medium Large Capital Vorton Precursor Bonus
            if (
                (3309 >= skillId && skillId >= 3301) || // Small Medium Large Turret
                (20327 >= skillId && skillId >= 21667) || // Capital Turret
                (54826 == skillId || skillId == 55034 || skillId == 55035) || // Vorton
                (47870 == skillId || skillId == 47871 || skillId == 47872 || skillId == 52998)  // Precursor
            ) {
                return [{
                    bonus: 5*skill.active_skill_level/100+1,
                    dogmaAttributeId: DogmaAttributeId.DamageMultiplier
                }]
            }

            // Specialization Bonus
            if (
                (11083 >= skillId && skillId >= 11084) ||
                (12201 >= skillId && skillId >= 12215) ||
                (41403 >= skillId && skillId >= 41408) ||
                (47873 >= skillId && skillId >= 47875) ||
                (54827 >= skillId && skillId >= 54829)
            ) {
                return [{
                    bonus: 2*skill.active_skill_level/100+1,
                    dogmaAttributeId: DogmaAttributeId.DamageMultiplier
                }]
            }

            return []
        }

        return []
    })

    return skillBonus
}
