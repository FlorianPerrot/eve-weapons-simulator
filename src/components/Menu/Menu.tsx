import MenuStyles from "./Menu.module.css"

export default function Menu() {
    return (
        <ul className={MenuStyles.nav}>
            <li className={MenuStyles.navItem}>
                <a className='link-effect' href="/turret">Turret simulator</a>
            </li>

            <li className={MenuStyles.navItem}>
                <a className="link-effect" href="/missile">Missile simulator</a>
            </li>
        </ul>
    )
}
