import EveTypeChoice from "@/components/EveComponents/EveTypeChoice";
import {useContext, useEffect, useState} from "react";
import {FittingsSettingsContext} from "../context";
import {AmmunitionAndCharge, DogmaAttribute, DogmaAttributeId, Ship, Turret} from "@/libs/EveApiEntities";

export type FittingSettingsProps = {
    turret?: Turret;
    ship?: Ship;
    ammunitionOrCharge?: AmmunitionAndCharge;
}

export default function FittingSettings() {
    const [fittingsSettings, setFittingSettings] = useContext(FittingsSettingsContext)

    const [turret, setTurret] = useState<Turret>(fittingsSettings?.turret)
    const [ship, setShip] = useState<Ship>(fittingsSettings?.ship)
    const [ammunitionAndCharge, setAmmunitionOrCharge] = useState<AmmunitionAndCharge>(fittingsSettings?.ammuntionOrCharge)
    const [ammunitionOrChargeDogmasFilter, setAmmunitionOrChargeDogmasFilter] = useState<DogmaAttribute[]>([]);

    useEffect(() => {
        setFittingSettings({
            turret: turret,
            ship: ship,
            ammunitionOrCharge: ammunitionAndCharge
        })
    }, [setFittingSettings, turret, ship, ammunitionAndCharge]);

    useEffect(() => {
        let chargeSize = turret?.dogma_attributes[DogmaAttributeId.ChargeSize] ?? undefined
        if (turret && chargeSize) {
            setAmmunitionOrChargeDogmasFilter([
                {
                    attribute_id: DogmaAttributeId.ChargeSize,
                    value: chargeSize.value
                },
                {
                    attribute_id: DogmaAttributeId.UsedWithLauncherGroup,
                    value: turret.group_id
                }
            ])
        }
    }, [turret]);

    return (
        <>
            <EveTypeChoice route='turrets' placeholder="Turret" onEveTypeChoice={setTurret}/>
            <EveTypeChoice route='ammunitions-charges' dogmas={ammunitionOrChargeDogmasFilter} placeholder="Ammunitions or Charges" onEveTypeChoice={setAmmunitionOrCharge} />
            <EveTypeChoice route='ships' placeholder="Ship" onEveTypeChoice={setShip} />
        </>
    )
}
