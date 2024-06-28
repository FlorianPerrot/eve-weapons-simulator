import {describe, it} from "@jest/globals";
import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import {DogmaAttributeId, SkillId} from "@/libs/EveApiEntities";
import {equal} from "node:assert";
import skillMissleBonus from "@/libs/bonus/SkillMissileBonus";
import {AutoCannonI, charSkills, Corax, Rifter, RocketLauncherI} from "./data";
import shipBonus from "@/libs/bonus/ShipBonus";

describe('MissileProps', () => {
    it('should buff explosion radius and velocity', () => {
        const bonus = shipBonus(Corax, RocketLauncherI, charSkills)

        equal(bonus.length, 3)
        equal(bonus[0].bonus, 1.5)
        equal(bonus[0].dogmaAttributeId, DogmaAttributeId.MissileVelocityMultiplier)
        equal(bonus[1].bonus, 1.1)
        equal(bonus[1].dogmaAttributeId, DogmaAttributeId.KineticMissileDamageBonus)
        equal(bonus[2].bonus, 1.2)
        equal(bonus[2].dogmaAttributeId, DogmaAttributeId.AoeVelocityMultiplier)
    })
})
