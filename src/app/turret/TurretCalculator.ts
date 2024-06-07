// cf: https://wiki.eveuniversity.org/Turret_mechanics#Hit_Math
export function hitChanceFunction(distance: number, turret: TurretProps, ship: ShipProps): number {
    return 0.5**(
        (
            (ship.transversalVelocity*turret.signatureResolution)
            /
            (distance*turret.turretTracking*ship.signatureRadius)
        )**2
        +
        (
            Math.max(0, distance-turret.optimalRange)
            /
            turret.accuracyFalloff
        )**2
    )
}

// cf: https://wiki.eveuniversity.org/Turret_mechanics#Damage
export function dpsFunction(hitChance: number): number {
    if (hitChance >= 0.01) {
        return  0.01*3 + (hitChance-0.01) * (0.5 * (0.5+0.49+hitChance))
    } else {
        return 3 * hitChance
    }
}
