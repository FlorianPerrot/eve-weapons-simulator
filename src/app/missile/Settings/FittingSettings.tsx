import EveTypeChoice from "@/components/EveComponents/EveTypeChoice";
import {useContext, useEffect, useState} from "react";
import {AmmunitionAndCharge, DogmaAttribute, DogmaAttributeId, Missile, Ship} from "@/libs/EveApiEntities";
import {FittingsSettingsContext} from "../context";

export default function FittingSettings() {
    const [fittingsSettings, setFittingSettings] = useContext(FittingsSettingsContext)

    const [missile, setMissile] = useState<Missile>(fittingsSettings?.missile)
    const [ship, setShip] = useState<Ship>(fittingsSettings?.ship)
    const [ammunitionAndCharge, setAmmunitionOrCharge] = useState<AmmunitionAndCharge>(fittingsSettings?.ammuntionOrCharge)
    const [ammunitionOrChargeDogmasFilter, setAmmunitionOrChargeDogmasFilter] = useState<DogmaAttribute[]>([]);

    useEffect(() => {
        setFittingSettings({
            missile: missile,
            ship: ship,
            ammunitionOrCharge: ammunitionAndCharge
        })
    }, [setFittingSettings, missile, ship, ammunitionAndCharge]);

    useEffect(() => {
        if (missile) {
            setAmmunitionOrChargeDogmasFilter([
                {
                    attribute_id: DogmaAttributeId.UsedWithLauncherGroup,
                    value: missile.group_id
                }
            ])
        }
    }, [missile]);

    return (
        <>
            <EveTypeChoice route='missiles' placeholder="Missile" onEveTypeChoice={setMissile}/>
            <EveTypeChoice route='ammunitions-charges' dogmas={ammunitionOrChargeDogmasFilter} placeholder="Ammunitions or Charges" onEveTypeChoice={setAmmunitionOrCharge} />
            <EveTypeChoice route='ships' placeholder="Ship" onEveTypeChoice={setShip} />
        </>
    )
}
