import {Bonus} from "@/libs/bonus/Bonus";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {Tooltip} from "react-tooltip";
import {applyBonus, TurretProps} from "@/libs/turret/TurretProps";
import {Turret} from "@/libs/turret/Turret";

export default function TurretShowInfo({turretProps, bonus}: {turretProps: TurretProps, bonus: Bonus[]}) {
    const bonusOptimal = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.WeaponRangeMultiplier)} />
    const bonusFalloff = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.FalloffMultiplier)} />
    const bonusTrackingSpeed = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.TrackingSpeedMultiplier)} />

    const bonusDamage = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier)} />
    const bonusRateOfFire = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier)} />

    const turretWithBonus = applyBonus(turretProps, bonus)
    const turret = new Turret(turretWithBonus)

    return (
        <div style={{display: "flex", gap: "3rem", padding: "2rem"}}>
            <ul>
                <li>
                    <span>Tracking Speed: </span>
                    <span className="link-effect" id="turretTracking">{turret.turretTracking.toFixed(2)}</span>
                    <Tooltip anchorSelect="#turretTracking" place="top-end" positionStrategy="fixed">
                        = {turretProps.turretTracking}{bonusTrackingSpeed}
                    </Tooltip>
                </li>

                <li>
                    <span>Optimal range: </span>
                    <span className="link-effect" id="optimalRange">{(turret.optimalRange/1000).toFixed(2)} km</span>
                    <Tooltip anchorSelect="#optimalRange" place="top-end" positionStrategy="fixed">
                        = {turretProps.optimalRange}{bonusOptimal}
                    </Tooltip>
                </li>

            </ul>
            <ul>
                <li>
                    <span>Falloff range: </span>
                    <span className="link-effect" id="falloff">{((turret.optimalRange + turret.falloff) / 1000).toFixed(2)} km</span>
                    <Tooltip anchorSelect="#falloff" place="top-end" positionStrategy="fixed">
                        = optimal({turretProps.optimalRange}{bonusOptimal}) + falloff({turretProps.falloff}{bonusFalloff})
                    </Tooltip>
                </li>

                <li>
                    <span>DPS: </span>
                    <span className="link-effect" id="dps">{turret.getMaxDps().toFixed(2)} Hit-point/s</span>
                    <Tooltip anchorSelect="#dps" place="top-end" positionStrategy="fixed">
                        =
                        damages( emp({turretProps.damages.emp}) + thermal({turretProps.damages.thermal}) + explosive({turretProps.damages.explosive}) + kinetic({turretProps.damages.kinetic}) ){bonusDamage}
                        /
                        rate of fire({turretProps.rateOfFire/1000}{bonusRateOfFire})
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
