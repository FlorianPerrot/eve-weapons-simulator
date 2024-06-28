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
export type Missile = EveType
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
    MissileBombardment = '12441', // 10% bonus to all missiles flight time per level
    MissileProjection = '12442', // 10% bonus to all missiles' maximum velocity per level
    GuidedMissilePrecision = '20312', // 5% decrease per level in factor of signature radius for all missile explosions
    TargetNavigationPrediction = '20314', // 10% decrease per level in factor of target's velocity for all missiles
}

export enum DogmaAttributeId {
    Unknown = '0',

    MaxVelocity = '37',
    OptimalRange = '54',
    AccuracyFalloff = '158',
    RateOfFire = '51',
    TurretTracking = '160',
    SignatureResolution = '620',
    ExplosionDelay = '281',
    AoeVelocity = '653',
    AoeCloudSize = '654',
    AoeFalloff = '655',
    AoeDamageReductionFactor = '1353',

    OptimalRangeBonus = '351',
    FalloffBonus = '349',
    MissileDamageBonus = '213',
    AoeVelocityBonus = '847',
    AoeCloudSizeBonus = '848',
    AoeFalloffBonus = '857',

    DamageMultiplier = '64',
    MissileDamageMultiplier = '212',
    RateOfFireMultiplier = '204',
    TrackingSpeedMultiplier = '244',
    FalloffMultiplier = '517',
    WeaponRangeMultiplier = '120', // Optimal range bonus for ammunition and charge
    AoeCloudSizeMultiplier = '858',
    AoeVelocityMultiplier = '859',
    AoeFalloffMultiplier = '860',
    MissileVelocityMultiplier = '1469',
    FlightTimeMultiplier = '646',

    EmDamage = '114',
    ExplosiveDamage = '116',
    KineticDamage = '117',
    ThermalDamage = '118',

    KineticMissileDamageBonus = '1827',

    UsedWithChargeGroup1 = '604',
    UsedWithChargeGroup2 = '605',
    UsedWithChargeGroup3 = '606',
    UsedWithChargeGroup4 = '609',
    UsedWithChargeGroup5 = '619',

    UsedWithLauncherGroup = '137',
    UsedWithLauncherGroup2 = '602',
    UsedWithLauncherGroup3 = '603',
    UsedWithLauncherGroup4 = '2076',
    UsedWithLauncherGroup5 = '2077',
    UsedWithLauncherGroup6 = '2078',

    ChargeSize = '128',

    ReloadTime = '1795'
}
