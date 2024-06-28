import {createContext} from "react";
import {AmmunitionAndCharge, Missile, Ship} from "@/libs/EveApiEntities";

export type FittingSettings = {
    missile?: Missile;
    ship?: Ship;
    ammunitionOrCharge?: AmmunitionAndCharge;
}

export type TargetSettings = {
    signatureRadius: number;
}

export const FittingsSettingsContext = createContext<any>(null);
export const TargetSettingsContext = createContext<any>(null);
