import {AmmunitionAndCharge, CharacterSkill, DogmaAttributeId, Ship, SkillId, Turret} from "@/libs/EveApiEntities";

export const turret1: Turret = {
    name: { en: 'turret test' },
    type_id: '1',
    group_id: '1',
    required_skills: { '3302': 1 },
    dogma_effects: {},
    dogma_attributes: {
        [DogmaAttributeId.OptimalRange]: {
            attribute_id: DogmaAttributeId.OptimalRange,
            value: 1000
        },
        [DogmaAttributeId.AccuracyFalloff]: {
            attribute_id: DogmaAttributeId.AccuracyFalloff,
            value: 1000
        },
        [DogmaAttributeId.TurretTracking]: {
            attribute_id: DogmaAttributeId.TurretTracking,
            value: 50
        },
        [DogmaAttributeId.DamageMultiplier]: {
            attribute_id: DogmaAttributeId.DamageMultiplier,
            value: 1
        },
        [DogmaAttributeId.RateOfFire]: {
            attribute_id: DogmaAttributeId.RateOfFire,
            value: 1
        },
        [DogmaAttributeId.SignatureResolution]: {
            attribute_id: DogmaAttributeId.SignatureResolution,
            value: 40000
        },
    }
}

export const AutoCannonI: Turret = {
    name: { en: '200mm AutoCannon I' },
    type_id: '1',
    group_id: '55',
    required_skills: { '3300': 1, '3302': 1 },
    dogma_effects: {},
    dogma_attributes: {
        [DogmaAttributeId.OptimalRange]: {
            attribute_id: DogmaAttributeId.OptimalRange,
            value: 1000
        },
        [DogmaAttributeId.AccuracyFalloff]: {
            attribute_id: DogmaAttributeId.AccuracyFalloff,
            value: 5160
        },
        [DogmaAttributeId.TurretTracking]: {
            attribute_id: DogmaAttributeId.TurretTracking,
            value: 315
        },
        [DogmaAttributeId.DamageMultiplier]: {
            attribute_id: DogmaAttributeId.DamageMultiplier,
            value: 2.8875
        },
        [DogmaAttributeId.RateOfFire]: {
            attribute_id: DogmaAttributeId.RateOfFire,
            value: 3750
        },
        [DogmaAttributeId.SignatureResolution]: {
            attribute_id: DogmaAttributeId.SignatureResolution,
            value: 40000
        },
    }
}

export const ship1: Ship = {
    name: { en: 'ship test' },
    type_id: '1',
    group_id: '1',
    dogma_effects: {},
    dogma_attributes: {},
    traits: {
        role_bonuses: {
            '1': {
                bonus: 5,
                bonus_text: { 'en': "bonus to <a href=showinfo:3302>Small Projectile Turret</a> optimal range"}
            }
        },
        misc_bonuses: {},
        types: {
            '3329': {
                '1': {
                    bonus: 5,
                    bonus_text: { 'en': "bonus to <a href=showinfo:3302>Small Projectile Turret</a> optimal range"}
                }
            }
        }
    }
}

export const Rifter: Ship = {
    name: { en: 'Rifter' },
    type_id: '1',
    group_id: '25',
    dogma_effects: {},
    dogma_attributes: {},
    traits: {
        role_bonuses: {},
        misc_bonuses: {},
        types: {
            '3329': {
                '1': {
                    bonus: 7.5,
                    bonus_text: { 'en': "bonus to <a href=showinfo:3302>Small Projectile Turret</a> rate of fire"}
                },
                '2': {
                    bonus: 10,
                    bonus_text: { 'en': "bonus to <a href=showinfo:3302>Small Projectile Turret</a> falloff"}
                }
            }
        }
    }
}

export const EmpS: AmmunitionAndCharge = {
    name: { en: 'EMP S' },
    type_id: '185',
    group_id: '83',
    dogma_effects: {},
    dogma_attributes: {
        114: {
            attribute_id: DogmaAttributeId.EmDamage,
            value: 9
        },
        116: {
            attribute_id: DogmaAttributeId.ExplosiveDamage,
            value: 2
        },
        117: {
            attribute_id: DogmaAttributeId.KineticDamage,
            value: 1
        },
        118: {
            attribute_id: DogmaAttributeId.ThermalDamage,
            value: 0
        },
        120: {
            attribute_id: DogmaAttributeId.WeaponRangeMultiplier,
            value: 0.5
        }
    }
}

export const VoidS: AmmunitionAndCharge = {
    name: { en: 'Void S' },
    type_id: '185',
    group_id: '83',
    dogma_effects: {},
    dogma_attributes: {
        114: {
            attribute_id: DogmaAttributeId.EmDamage,
            value: 0
        },
        116: {
            attribute_id: DogmaAttributeId.ExplosiveDamage,
            value: 0
        },
        117: {
            attribute_id: DogmaAttributeId.KineticDamage,
            value: 8.9
        },
        118: {
            attribute_id: DogmaAttributeId.ThermalDamage,
            value: 8.9
        },
        120: {
            attribute_id: DogmaAttributeId.WeaponRangeMultiplier,
            value: 0.75
        },
        517: {
            attribute_id: DogmaAttributeId.FalloffMultiplier,
            value: 0.5
        },
        244: {
            attribute_id: DogmaAttributeId.TrackingSpeedMultiplier,
            value: 0.75
        }
    }
}

export const charSkills: CharacterSkill[] = [
    { skill_id: '3302', active_skill_level: 2 }, // Small Projectile Turret
    { skill_id: '3329', active_skill_level: 3 }, // Minmatar Frigate

    // Turrets skills
    { skill_id: SkillId.Sharpshooter, active_skill_level: 4 },
    { skill_id: SkillId.TrajectoryAnalysis, active_skill_level: 4 },
    { skill_id: SkillId.MotionPrediction, active_skill_level: 2 },
    { skill_id: SkillId.RapidFiring, active_skill_level: 5 },
    { skill_id: SkillId.SurgicalStrike, active_skill_level: 5 },

    // Missiles skills
    { skill_id: SkillId.MissileLauncherOperation, active_skill_level: 1 },
    { skill_id: SkillId.RapidLaunch, active_skill_level: 1 },
    { skill_id: SkillId.WarheadUpgrades, active_skill_level: 5 },
    { skill_id: SkillId.MissileProjection, active_skill_level: 1 },
    { skill_id: SkillId.GuidedMissilePrecision, active_skill_level: 2 },
    { skill_id: SkillId.TargetNavigationPrediction, active_skill_level: 2 },
]
