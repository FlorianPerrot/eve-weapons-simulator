import {describe, it} from "@jest/globals";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {getAllShipBonus} from "@/libs/ShipBonusCalculator";
import {equal} from "node:assert";
import {charSkills, Rifter, AutoCannonI} from "./data"

describe('Test', function () {
    it('should return bonus', function () {
        const bonus = getAllShipBonus(Rifter, AutoCannonI, charSkills)

        equal(bonus.length, 2)
        equal(bonus[0].bonus, 1.225)
        equal(bonus[0].dogmaAttributeId, DogmaAttributeId.RateOfFireMultiplier)
        equal(bonus[1].bonus, 1.3)
        equal(bonus[1].dogmaAttributeId, DogmaAttributeId.FalloffMultiplier)
    });
});
