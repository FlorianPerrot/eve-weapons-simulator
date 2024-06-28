import {
    AmmunitionAndCharge,
    CharacterSkill,
    DogmaAttributeId,
    Missile,
    Ship,
    SkillId,
    Turret
} from "@/libs/EveApiEntities";

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

export const RocketLauncherI: Missile = {
    name: { en: '\'Malkuth\' Rocket Launcher I' },
    type_id: '1',
    group_id: '507',
    required_skills: {
        "3319": 1,
        "3320": 1
    },
    dogma_effects: {},
    dogma_attributes: {
        [DogmaAttributeId.RateOfFire]: {
            attribute_id: DogmaAttributeId.RateOfFire,
            value: 4750
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

export const Corax: Ship = {
    name: { en: 'Corax' },
    type_id: '1',
    group_id: '25',
    dogma_effects: {},
    dogma_attributes: {},
    traits: {
        misc_bonuses: {},
        role_bonuses: {
            "1": {
                "bonus": 50,
                "bonus_text": {
                    "en": "bonus to <a href=showinfo:3321>Light Missile</a> and <a href=showinfo:3320>Rocket</a> max velocity"
                },
            }
        },
        "types": {
            "33092": {
                "1": {
                    "bonus": 5,
                    "bonus_text": {
                        "en": "bonus to kinetic <a href=showinfo:3321>Light Missile</a> and <a href=showinfo:3320>Rocket</a> damage"
                    },
                },
                "2": {
                    "bonus": 10,
                    "bonus_text": {
                        "en": "bonus to <a href=showinfo:3321>Light Missile</a> and <a href=showinfo:3320>Rocket</a> explosion velocity"
                    },
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

export const ScourgeRocket: AmmunitionAndCharge = {
    name: { en: 'EMP S' },
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
            value: 450
        },
        118: {
            attribute_id: DogmaAttributeId.ThermalDamage,
            value: 0
        },
        281: {
            attribute_id: DogmaAttributeId.ExplosionDelay,
            value: 7200
        },
        37: {
            attribute_id: DogmaAttributeId.MaxVelocity,
            value: 1800
        },
        653: {
            attribute_id: DogmaAttributeId.AoeVelocity,
            value: 78
        },
        654: {
            attribute_id: DogmaAttributeId.AoeCloudSize,
            value: 405
        },
        655: {
            attribute_id: DogmaAttributeId.AoeFalloff,
            value: 1500
        },
        1353: {
            attribute_id: DogmaAttributeId.AoeDamageReductionFactor,
            value: 0.944
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
    { skill_id: '33092', active_skill_level: 2 }, // Caldari Destroyer

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
    { skill_id: SkillId.MissileBombardment, active_skill_level: 1 },
    { skill_id: SkillId.MissileProjection, active_skill_level: 1 },
    { skill_id: SkillId.GuidedMissilePrecision, active_skill_level: 2 },
    { skill_id: SkillId.TargetNavigationPrediction, active_skill_level: 2 },
]
