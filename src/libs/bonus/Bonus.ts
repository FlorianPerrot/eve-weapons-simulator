import {DogmaAttributeId} from "@/libs/EveApiEntities";

export type Bonus = {
    source?: string;
    bonus: number;
    dogmaAttributeId: DogmaAttributeId;
}

export type ShipBonus = Bonus & {
    skillIdsRequireByModuleToBeApplicable: string[];
}

export type SkillBonus = Bonus
export type AmmunitionAndChargeBonus = Bonus
export type TurretBonus = Bonus

export function isBonus(bonus: Bonus): boolean {
    return [
        DogmaAttributeId.AoeCloudSizeMultiplier,
        DogmaAttributeId.RateOfFireMultiplier,
    ].includes(bonus.dogmaAttributeId) ? bonus.bonus < 1 : bonus.bonus >= 1
}
