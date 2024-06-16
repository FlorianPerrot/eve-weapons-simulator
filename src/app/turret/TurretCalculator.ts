// cf: https://wiki.eveuniversity.org/Turret_mechanics#Hit_Math
import {getDPS, TurretStatsWithBuffs} from "@/libs/TurretStats";
import {TargetSettingsProps} from "./Settings/TargetSettings";

export function hitChanceFunction(distance: number, targetSettings: TargetSettingsProps, turret: TurretStatsWithBuffs): number {
    return 0.5**(
        (
            (targetSettings.transversalVelocity*turret.signatureResolution)
            /
            (distance*turret.turretTracking*targetSettings.signatureRadius)
        )**2
        +
        (
            Math.max(0, distance-turret.optimalRange)
            /
            turret.falloff
        )**2
    )
}

// cf: https://wiki.eveuniversity.org/Turret_mechanics#Damage
export function dpsPercentage(hitChance: number): number {
    if (hitChance >= 0.01) {
        return 0.01*3 + (hitChance-0.01) * (0.5 * (0.5+0.49+hitChance))
    } else {
        return 3 * hitChance
    }
}

export function dps(hitChance: number, turret: TurretStatsWithBuffs): number {
    return dpsPercentage(hitChance) * getDPS(turret)
}
