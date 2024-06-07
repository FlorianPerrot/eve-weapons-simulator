import TurretChart from "./TurretChart";
import TestButton from "@/components/TestButton";
import TurretPageStyles from "./TurretPage.module.css"

import Choice, {missileGroupIds, shipGroupIds, turretGroupIds} from "@/components/Choice";

export default function Turret() {
    return (
        <div>
            <div className={TurretPageStyles.choices}>
                <Choice groupdIds={turretGroupIds} placeholder="Turret" />
                <Choice groupdIds={missileGroupIds} placeholder="Missile launcher" />
                <Choice groupdIds={shipGroupIds} placeholder="Ship" />
            </div>

            <TestButton></TestButton>
            <TurretChart
                range={{
                    start: 0,
                    end: 13000,
                    step: 500
                }}

                turret={{
                    turretTracking: 117,
                    accuracyFalloff: 2000,
                    optimalRange: 4812.8,
                    signatureResolution: 40000
                }}

                targetShip={{
                    transversalVelocity: 800,
                    signatureRadius: 100
                }}
            />
        </div>
    );
}
