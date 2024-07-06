import {SkillBonus} from "@/libs/bonus/Bonus";
import {CharacterSkill, DogmaAttributeId, Missile, SkillId} from "@/libs/EveApiEntities";

export default function skillMissleBonus(charSkills: CharacterSkill[], missile: Missile | undefined): SkillBonus[] {
    const skillBonus = charSkills.flatMap((skill): SkillBonus[] => {
        if (skill.skill_id == SkillId.MissileLauncherOperation) {
            return [{
                source: 'Missile Launcher Operation',
                bonus: 2-(2*skill.active_skill_level/100+1),
                dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier
            }]
        } else if (skill.skill_id == SkillId.RapidLaunch) {
            return [{
                source: 'Rapid Launch',
                bonus: 2-(3*skill.active_skill_level/100+1),
                dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier
            }]
        } else if (skill.skill_id == SkillId.WarheadUpgrades) {
            return [{
                source: 'Warhead Upgrades',
                bonus: 2*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.DamageMultiplier
            }]
        } else if (skill.skill_id == SkillId.MissileBombardment) {
            return [{
                source: 'Missile Bombardment',
                bonus: 10*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.FlightTimeMultiplier
            }]
        } else if (skill.skill_id == SkillId.MissileProjection) {
            return [{
                source: 'Missile Projection',
                bonus: 10*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.MissileVelocityMultiplier
            }]
        } else if (skill.skill_id == SkillId.GuidedMissilePrecision && skill.active_skill_level) {
            return [{
                source: 'Guided Missile Precision',
                bonus: 2-(5*skill.active_skill_level/100+1),
                dogmaAttributeId: DogmaAttributeId.AoeCloudSizeMultiplier
            }]
        } else if (skill.skill_id == SkillId.TargetNavigationPrediction) {
            return [{
                source: 'Target Navigation Prediction',
                bonus: 10*skill.active_skill_level/100+1,
                dogmaAttributeId: DogmaAttributeId.AoeVelocityMultiplier
            }]
        }

        if (missile && Object.keys(missile.required_skills || {}).find(skillId => skillId == skill.skill_id)) {
            let skillId = Number(skill.skill_id)

            if (
                (3320 >= skillId && skillId >= 3326) || // Light missile, rockets and others
                (25719 == skillId) || // Heavy Assault Missiles
                (32435 == skillId) || // XL Cruise Missiles
                (21668 == skillId) // XL Torpedoes
            ) {
                return [{
                    source: 'Missile skill',
                    bonus: 5*skill.active_skill_level/100+1,
                    dogmaAttributeId: DogmaAttributeId.DamageMultiplier
                }]
            }

            // TODO Check if Rocket skill is apply for "Rocket launcher II" (and other specialize weapons) because Rocket skill not include on "required_skills"

            // Specialization Bonus
            if (
                (20209 >= skillId && skillId >= 20213) || // Torpedo, Cruise Missile, Heavy Missile, Light Missile, Rocket Specialization
                (25718 == skillId) || // Heavy Assault Missile Specialization
                (41410 == skillId) || // XL Cruise Missile Specialization
                (41409 == skillId) // XL Cruise Missile Specialization
            ) {
                return [{
                    source: 'Specialization skill',
                    bonus: 2*skill.active_skill_level/100+1,
                    dogmaAttributeId: DogmaAttributeId.RateOfFireMultiplier
                }]
            }

            return []
        }

        return []
    })

    return skillBonus
}
