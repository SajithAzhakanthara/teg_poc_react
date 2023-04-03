import {Link} from "react-router-dom";
import "./Header.css";
const Header = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="logo">
                        <Link to="/">Teg</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;