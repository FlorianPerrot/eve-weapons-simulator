import FittingSettings from "./FittingSettings";
import TargetSettings from "./TargetSettings";
import SettingsStyles from "./Settings.module.css"

export default function Settings() {
    return <div className={SettingsStyles.settings}>
        <FittingSettings />
        <TargetSettings />
    </div>
}
