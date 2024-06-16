// cf: https://wiki.eveuniversity.org/Turret_mechanics#Hit_Math
export function hitChanceFunction(distance: number, turret: MissileProps, ship: ShipProps): number {
    return 1
}

// cf: https://wiki.eveuniversity.org/Turret_mechanics#Damage
export function dpsFunction(hitChance: number): number {
    if (hitChance >= 0.01) {
        return  0.01*3 + (hitChance-0.01) * (0.5 * (0.5+0.49+hitChance))
    } else {
        return 3 * hitChance
    }
}
