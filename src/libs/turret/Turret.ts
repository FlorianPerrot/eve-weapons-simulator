import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {Damages} from "@/libs/WeaponsProps";
import {Bonus} from "@/libs/bonus/Bonus";

export class Turret implements TurretProps {
    damages: Damages;
    falloff: number; // meter
    optimalRange: number; // meter
    rateOfFire: number; // millisecond
    signatureResolution: number; // meter
    turretTracking: number;

    constructor(turretProps: TurretProps, bonus?: Bonus[]) {
        if (bonus !== undefined) {
            turretProps = applyBonus(turretProps, bonus)
        }

        this.rateOfFire = turretProps.rateOfFire;
        this.falloff = turretProps.falloff;
        this.optimalRange = turretProps.optimalRange;
        this.signatureResolution = turretProps.signatureResolution;
        this.turretTracking = turretProps.turretTracking;
        this.damages = turretProps.damages;
    }

    hitChance(distance: number, transversalVelocity: number, signatureRadius: number): number {
        return 0.5**(
            (
                (transversalVelocity*this.signatureResolution)
                /
                (distance*this.turretTracking*signatureRadius)
            )**2
            +
            (
                Math.max(0, distance-this.optimalRange)
                /
                this.falloff
            )**2
        )
    }

    dps(hitChance: number): number {
        return Turret.dpsPercentage(hitChance) * this.getMaxDps() // TODO Include reload time
    }

    isOptimalRange(distance: number, range: number): boolean {
        return distance >= this.optimalRange - range/2 && distance <= this.optimalRange + range/2
    }

    isFalloff(distance: number, range: number): boolean {
        const falloffDistance = this.falloff + this.optimalRange
        return distance > falloffDistance - range/2 && distance < falloffDistance + range/3
    }

    getMaxDps(): number {
        const rateOfFireInSec = this.rateOfFire/1000
        return this.getDamages() * (1/rateOfFireInSec)
    }

    private getDamages(): number {
        return this.damages.emp +
            this.damages.explosive +
            this.damages.thermal +
            this.damages.kinetic
    }

    private static dpsPercentage(hitChance: number): number {
        if (hitChance >= 0.01) {
            return 0.01*3 + (hitChance-0.01) * (0.5 * (0.5+0.49+hitChance))
        } else {
            return 3 * hitChance
        }
    }
}
