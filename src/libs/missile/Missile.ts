import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import {Damages} from "@/libs/WeaponsProps";
import {Bonus} from "@/libs/bonus/Bonus";

export class Missile implements MissileProps {
    damageReductionFactor: number;
    velocity: number; // meter by second
    damages: Damages;
    explosionDelay: number; // millisecond
    explosionRadius: number; // meter
    explosionVelocity: number; // meter by second
    rateOfFire: number; // millisecond

    constructor(missileProps: MissileProps, bonus?: Bonus[]) {
        if (bonus !== undefined) {
            missileProps = applyBonus(missileProps, bonus)
        }

        this.rateOfFire = missileProps.rateOfFire;
        this.velocity = missileProps.velocity;
        this.damageReductionFactor = missileProps.damageReductionFactor;
        this.explosionDelay = missileProps.explosionDelay;
        this.explosionRadius = missileProps.explosionRadius;
        this.explosionVelocity = missileProps.explosionVelocity;
        this.damages = missileProps.damages;
    }

    damageReduction(velocity: number, signatureRadius: number): number {
        return Math.min(
            1,
            signatureRadius / this.explosionRadius,
            Math.pow((signatureRadius*this.explosionVelocity) / (this.explosionRadius*velocity), this.damageReductionFactor)
        )
    }

    dps(damageReduce: number): number {
        return damageReduce * this.getMaxDps() // TODO Include reload time
    }

    maxRange(): number {
        return this.velocity * (this.explosionDelay/1000) // range in meter
    }

    getMaxDps(): number {
        const rateOfFireInSec = this.rateOfFire/1000
        return this.getDamages() * (1/rateOfFireInSec)
    }

    getDamages(): number {
        return this.damages.emp +
            this.damages.explosive +
            this.damages.thermal +
            this.damages.kinetic
    }
}
