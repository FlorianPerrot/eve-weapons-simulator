import {useContext, useEffect, useRef, useState} from "react";
import {TargetSettingsContext} from "../context";
import TargetSettingsStyles from "./TargetSettings.module.css"

export type TargetSettingsProps = {
    signatureRadius: number;
    transversalVelocity: number;
}

const signatureRadiusOptions = [
    {label: "Frigate", value: "40"},
    {label: "Destroyer", value: "65"},
    {label: "Cruiser", value: "120"},
    {label: "Industrial", value: "200"},
    {label: "Battlecruiser", value: "300"},
    {label: "Battleship", value: "400"},
]

const transversalVelocityOptions = [
    {label: "Very slow", value: "50"},
    {label: "Slow", value: "200"},
    {label: "", value: "500"},
    {label: "", value: "800"},
    {label: "", value: "1000"},
]

const signatureLabel = (signatureRadius: number): string => {
    let label = 'Corvette'

    // @ts-ignore
    for (let option of signatureRadiusOptions) {
        if (Number(option.value) <= signatureRadius) {
            label = option.label
        }
    }

    return label
}

export default function TargetSettings() {
    const [targetSettings, setTargetSettings] = useContext(TargetSettingsContext)
    const datalist = useRef<HTMLDataListElement>(null)

    const [transversalVelocity, setTransversalVelocity] = useState<number>(targetSettings.transversalVelocity)
    const [signatureRadius, setSignatureRadius] = useState<number>(targetSettings.signatureRadius)


    useEffect(() => {
        setTargetSettings({
            signatureRadius: signatureRadius,
            transversalVelocity: transversalVelocity
        })
    }, [setTargetSettings, signatureRadius, transversalVelocity]);

    return (<>
        <fieldset className={TargetSettingsStyles.fieldset}>
            <label className={TargetSettingsStyles.label}>Transversal velocity: </label>
            <div className={TargetSettingsStyles.range}>
                <p className={TargetSettingsStyles.value}>{transversalVelocity} m/s</p>
                <input type={'range'} name={'transversalVelocity'} list={'velocity'} min={0} max={1000}
                       value={transversalVelocity}
                       onInput={(event) => {
                           setTransversalVelocity(Number(event.currentTarget.value))
                       }}/>

                <datalist id="velocity">
                    {transversalVelocityOptions.map(option =>
                        <option key={option.value} value={option.value} label={option.label}></option>
                    )}
                </datalist>
            </div>
        </fieldset>
        <fieldset className={TargetSettingsStyles.fieldset}>
            <label className={TargetSettingsStyles.label}>Signature radius: </label>
            <div className={TargetSettingsStyles.range}>
                <p className={TargetSettingsStyles.value}>{signatureRadius} - {signatureLabel(signatureRadius)}</p>
                <input type={'range'} value={signatureRadius} list="radius" min={1} max="500"
                       onInput={(event) => {
                           setSignatureRadius(Number(event.currentTarget.value))
                       }}/>

                <datalist id="radius" ref={datalist}>
                    {signatureRadiusOptions.map(option =>
                        <option key={option.value} value={option.value} label={option.label}></option>
                    )}
                </datalist>
            </div>
        </fieldset>
    </>)
}
