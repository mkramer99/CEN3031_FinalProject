import './App.css';
import './pages.css';
import { useNavigate } from 'react-router-dom';


function NavBar() {
    const navigate = useNavigate();
    return (
        <nav className="navigation">
            <div className="nav_container" style={{zIndex: "1000"}}>
                <a href="/" id="nav_logo"><b>FOOD<br/>FIGHTERS</b></a>
                <div className="nav_toggle" id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                </div>
                <ul className="nav_menu">
                <li className="nav_item">
                    <a href="#/" onClick={() => navigate('/Login')} className="nav_links">
                    Login
                    </a>
                </li>
                <li className="nav_item">
                    <a href="#/" onClick={() => navigate('/RegisterBusiness')} className="nav_links">
                    Business Registration
                    </a>
                </li>
                <li className="nav_item">
                    <a href="#/" onClick={() => navigate('/Register')} className="nav_links">
                    Standard Registration
                    </a>
                </li>
                <li className="nav_item">
                    <a href="#/" onClick={() => navigate('/Map')} className="nav_links">
                    Map
                    </a>
                </li>
                </ul>
            </div>
        </nav>
    );
} 
export default NavBar