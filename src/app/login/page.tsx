import EveProfile from "@/components/Profile/EveProfile";
import LoginStyles from "./login.module.css"

export default function Turret() {
    return (
        <div className={LoginStyles.login}>
            <EveProfile/>
        </div>
    );
}
