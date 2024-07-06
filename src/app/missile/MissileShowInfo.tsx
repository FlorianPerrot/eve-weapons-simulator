import {applyBonus, MissileProps} from "@/libs/missile/MissileProps";
import {Bonus} from "@/libs/bonus/Bonus";
import {DogmaAttributeId} from "@/libs/EveApiEntities";
import {Missile} from "@/libs/missile/Missile";
import BonusShowInfo from "@/components/Bonus/BonusShowInfo";
import {Tooltip} from "react-tooltip";

export default function MissileShowInfo({missileProps, bonus}: {missileProps: MissileProps, bonus: Bonus[]}) {
    const bonusExplosionVelocity = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.AoeVelocityMultiplier)} />
    const bonusExplosionRadius = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.AoeCloudSizeMultiplier)} />
    const bonusExplosionDelay = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.FlightTimeMultiplier)} />
    const bonusMissileVelocity = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.MissileVelocityMultiplier)} />

    const bonusDamage = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.DamageMultiplier)} />
    const bonusDamageKinetic = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.KineticMissileDamageBonus)} />
    const bonusRateOfFire = <BonusShowInfo bonus={bonus.filter(b => b.dogmaAttributeId === DogmaAttributeId.RateOfFireMultiplier)} />

    const missileWithBonus = applyBonus(missileProps, bonus)
    const missile = new Missile(missileWithBonus)

    return (
        <div style={{display: "flex", gap: "3rem", padding: "2rem"}}>
            <ul>
                <li>
                    <span>Explosion velocity: </span>
                    <span className="link-effect" id="explosionVelocity">{Math.round(missileWithBonus.explosionVelocity)} m/s</span>
                    <Tooltip anchorSelect="#explosionVelocity" place="top-end">
                        = {missileProps.explosionVelocity}{bonusExplosionVelocity}
                    </Tooltip>
                </li>

                <li>
                    <span>Explosion radius: </span>
                    <span className="link-effect" id="explosionRadius">{missileWithBonus.explosionRadius} m</span>
                    <Tooltip anchorSelect="#explosionRadius" place="top-end">
                        = {missileProps.explosionRadius}{bonusExplosionRadius}
                    </Tooltip>
                </li>
            </ul>
            <ul>
                <li>
                    <span>Range: </span>
                    <span className="link-effect" id="explosionDelay">{(missileWithBonus.explosionDelay/Math.pow(10, 6)*missileWithBonus.velocity).toFixed(2)} km</span>
                    <Tooltip anchorSelect="#explosionDelay" place="top-end">
                        = explosion delay({missileProps.explosionDelay/1000}{bonusExplosionDelay}) x missile velocity({missileProps.velocity}{bonusMissileVelocity})
                    </Tooltip>
                </li>

                <li>
                    <span>DPS: </span>
                    <span className="link-effect" id="dps">{missile.getMaxDps().toFixed(2)} Hit-point/s</span>
                    <Tooltip anchorSelect="#dps" place="top-end">
                        =
                        damages( emp({missileProps.damages.emp}) + thermal({missileProps.damages.thermal}) + explosive({missileProps.damages.explosive}) + kinetic({missileProps.damages.kinetic}{bonusDamageKinetic}) ){bonusDamage}
                        /
                        rate of fire({missileProps.rateOfFire/1000}{bonusRateOfFire})
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
