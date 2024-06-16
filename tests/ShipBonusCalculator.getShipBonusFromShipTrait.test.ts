import {describe, it} from "@jest/globals";
import {equal, throws} from "node:assert";
import {getShipBonusFromShipTrait} from "@/libs/ShipBonusCalculator";
import {DogmaAttributeId} from "@/libs/EveApiEntities";

describe('Trait', function () {
    describe('TYPE 28665 Vargur.json', function () {
        it('should extract trait bonus information', function () {
            const traitBonus = getShipBonusFromShipTrait({
                bonus: 10,
                bonus_text: {
                    en: "bonus to <a href=showinfo:3308>Large Projectile Turret</a> falloff"
                }
            })

            equal(traitBonus.dogmaAttributeId, DogmaAttributeId.FalloffMultiplier)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable.length, 1)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable[0], 3308)
        });
    })

    describe('TYPE 11963 Rapier.json', function () {
        it('should extract trait bonus information', function () {
            const traitBonus = getShipBonusFromShipTrait({
                bonus: 10,
                bonus_text: {
                    en: "bonus to <a href=showinfo:3321>Light Missile</a>, <a href=showinfo:3324>Heavy Missile</a> and <a href=showinfo:25719>Heavy Assault Missile</a> damage"
                }
            })

            equal(traitBonus.dogmaAttributeId, DogmaAttributeId.DamageMultiplier)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable.length, 3)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable[0], 3321)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable[1], 3324)
            equal(traitBonus.skillIdsRequireByModuleToBeApplicable[2], 25719)
        });
    })

    describe('Trait without extractable information', function () {
        it('should throw error if no skill found', function () {
            throws(() => {
                getShipBonusFromShipTrait({
                    bonus: 10,
                    bonus_text: {
                        en: "bonus damage"
                    }
                })
            }, {
                name: "Error",
                message: "Trait not found"
            })
        });

        it('should throw error if dogma not found', function () {
            throws(() => {
                getShipBonusFromShipTrait({
                    bonus: 10,
                    bonus_text: {
                        en: "reduction in <a href=showinfo:21096>Cynosural Field Generator</a> duration"
                    }
                })
            }, {
                name: "Error",
                message: "Trait not found"
            })
        });
    })
});
