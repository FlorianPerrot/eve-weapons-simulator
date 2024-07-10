import pageStyles from "./page.module.css"

export default function Home() {
    return (
        <div className={pageStyles.home}>
            <h1 className={pageStyles.title}><a className="link-effect" href="/turret">Turret</a> and <a className="link-effect" href="/missile">missile</a> simulator</h1>
        </div>
    );
}
