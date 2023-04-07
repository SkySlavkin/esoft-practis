import "./style/main.scss";
import MainPage from "./Pages/MainPage/MainPage";
import {Routes, Route} from "react-router";
import Razrabotka from "./Pages/Razrabotka/Razrabotka";
import {NavLink} from "react-router-dom";
import LogoXO from "./resources/image/icon/LogoXO";
import Logout from "./resources/image/icon/Logout";
import "./style/main.scss";

function App() {
    const setActive = ({isActive}) => (isActive ? "active_link" : "");
    return (
        <div className="app">
            <div className={"navbar"}>
                <LogoXO />

                <div className={"links"}>
                    <NavLink to="/" className={setActive}>
                        <span>Игровое поле</span>
                    </NavLink>
                    <NavLink to="mmr" className={setActive}>
                        <span>Рейтинг</span>
                    </NavLink>
                    <NavLink to="active" className={setActive}>
                        <span>Активные игроки</span>
                    </NavLink>
                    <NavLink to="history" className={setActive}>
                        <span>История игр</span>
                    </NavLink>
                    <NavLink to="players" className={setActive}>
                        <span>Список игроков</span>
                    </NavLink>
                </div>

                <Logout />
            </div>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="mmr" element={<Razrabotka />} />
                <Route path="active" element={<Razrabotka />} />
                <Route path="history" element={<Razrabotka />} />
                <Route path="players" element={<Razrabotka />} />
            </Routes>
        </div>
    );
}

export default App;
