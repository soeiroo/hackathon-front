import { Link } from 'react-router';

const NavBar = () => {
    return (
            <nav>
                <Link to="/" className="PortalButton w-30 h-15">
                    INÍCIO
                </Link>
            </nav>
    )
}

export default NavBar;
