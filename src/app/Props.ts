type MissileProps = {

}

type ShipProps = {
    signatureRadius: number;
    transversalVelocity: number;
}

interface MissileChartProps {
    range: {
        start: number;
        end: number;
        step: number;
    },
    targetShip: ShipProps
    missile: MissileProps
}
