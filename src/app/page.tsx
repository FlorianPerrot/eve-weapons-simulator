import pageStyles from "./page.module.css"

export default function Home() {
    return (
        <div className={pageStyles.home}>
            <h1 className={pageStyles.title}><a href="/turret">Turret</a> and <a href="/missile">missile</a> simulator</h1>
        </div>
    );
}
