type TurretProps = {
    turretTracking: number;
    signatureResolution: number;
    optimalRange: number;
    accuracyFalloff: number;
    rateOfFire?: number;
    damageModifier?: number;
}

type AmmunitionProps = {
    rangeBonus: number;
    trackingSpeedMultiplier: number
    emDomage: number;
    thermalDomage: number;
    kineticDomage: number;
    explosiveDomage: number;
}

type ShipProps = {
    signatureRadius: number;
    transversalVelocity: number;
}

interface TurretChartProps {
    range: {
        start: number;
        end: number;
        step: number;
    },
    targetShip: ShipProps
    turret: TurretProps
}
