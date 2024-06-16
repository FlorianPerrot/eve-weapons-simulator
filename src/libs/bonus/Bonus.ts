import {DogmaAttributeId} from "@/libs/EveApiEntities";

export type Bonus = {
    bonus: number;
    dogmaAttributeId: DogmaAttributeId;
}

export type ShipBonus = Bonus & {
    skillIdsRequireByModuleToBeApplicable: string[];
}

export type SkillBonus = Bonus
export type AmmunitionAndChargeBonus = Bonus
export type TurretBonus = Bonus
