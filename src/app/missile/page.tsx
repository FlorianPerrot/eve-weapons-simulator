import MissibleChart from "./MissileChart";

export default function Missile() {
    return (
        <div>
            <MissibleChart
                range={{
                    start: 0,
                    end: 10000,
                    step: 500
                }}

                missile={{}}

                targetShip={{
                    transversalVelocity: 100,
                    signatureRadius: 100
                }}
            />
        </div>
    );
}
