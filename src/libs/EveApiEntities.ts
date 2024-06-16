export type EveType = {
    name: {
        en: string;
    }

    dogma_attributes: { [key: string]: DogmaAttribute }
    dogma_effects: { [key: string]: DogmaEffects }

    traits?: {
        misc_bonuses: {
            [key: string]: ShipTrait
        }
        role_bonuses: {
            [key: string]: ShipTrait
        }
        types: {
            [key: string]: { // Spaceship command Skill id
                [key: string]: ShipTrait
            }
        }
    }

    required_skills?: { [key: string]: number }
    type_id: string;
    group_id: string;
}

export type Ship = EveType
export type Turret = EveType
export type AmmunitionAndCharge = EveType

export type ShipTrait = {
    bonus: number;
    bonus_text: {
        en: string
    };
}


export type DogmaAttribute = {
    attribute?: any;
    attribute_id: string; // as DogmaAttributeId
    value: number | string;
}

export type DogmaEffects = {
    effect?: any;
    effect_id: string;
    value: number;
}

export type CharacterSkill = {
    active_skill_level: number,
    skill_id: string,
    skillpoints_in_skill?: number,
    trained_skill_level?: number
}

export enum SkillId {
    // Turrets
    Gunnery = '3300', // Turret tracking bonus 2%
    Sharpshooter = '3311', // Optimal range bonus 5%
    TrajectoryAnalysis = '3317', // Falloff bonus 5%
    MotionPrediction = '3312', // Turret tracking bonus 5%
    RapidFiring = '3310', // Rate of fire 4%
    SurgicalStrike = '3315', // 3% bonus per skill level to the damage of all weapon turrets

    SmallHybridTurret = '3301',
    SmallProjectileTurret = '3302',
    SmallEnergyTurret = '3303',
    MediumHybridTurret = '3304',
    MediumProjectileTurret = '3305',
    MediumEnergyTurret = '3306',
    LargeHybridTurret = '3307',
    LargeProjectileTurret = '3308',
    LargeEnergyTurret = '3309',

    // Missiles
    MissileLauncherOperation = '3319', // 2% Bonus to missile launcher rate of fire per skill level
    RapidLaunch = '21071', // 3% bonus to missile launcher rate of fire per level
    WarheadUpgrades = '20315', // 2% bonus to all missile damage per skill level
    MissileProjection = '12442', // 10% bonus to all missiles' maximum velocity per level
    GuidedMissilePrecision = '20312', //5% decrease per level in factor of signature radius for all missile explosions
    TargetNavigationPrediction = '20314', // 10% decrease per level in factor of target's velocity for all missiles
}

export enum DogmaAttributeId {
    Unknown = '0',

    OptimalRange = '54',
    AccuracyFalloff = '158',
    RateOfFire = '51',
    TurretTracking = '160',
    SignatureResolution = '620',

    OptimalRangeBonus = '351',
    FalloffBonus = '349',

    DamageMultiplier = '64',
    RateOfFireMultiplier = '204',
    TrackingSpeedMultiplier = '244',
    FalloffMultiplier = '517',
    WeaponRangeMultiplier = '120', // Optimal range bonus for ammunition and charge

    EmDamage = '114',
    ExplosiveDamage = '116',
    KineticDamage = '117',
    ThermalDamage = '118',

    UsedWithChargeGroup = '604',
    UsedWithLauncherGroup = '137',

    ChargeSize = '128'
}
