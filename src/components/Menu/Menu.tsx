import MenuStyles from "./Menu.module.css"

export default function Menu() {
    return (
        <ul className={MenuStyles.nav}>
            <li className={MenuStyles.navItem}>
                <a className={MenuStyles.navLink} href="/turret">Turret simulator</a>
            </li>

            <li className={MenuStyles.navItem}>
                <a href="/missile" className={MenuStyles.navLink}>Missile simulator (WIP)</a>
            </li>
        </ul>
    )
}
