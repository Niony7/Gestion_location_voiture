import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './header.css'
function Header (props) {
    var urlDeconnecter = 'http://localhost:3001/authentification'
    let history = useHistory();
    var deconnecter = async () => {
        console.log(props);
      const requestInfo = {
            url : urlDeconnecter,
            method : 'DELETE',
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then((response) => {
                props.setLoginStatus(false);
                props.setAdminStatus(false)
                history.push('/authentification');
        })
        .catch( e => console.log(e))
    }
    return (
        <div className="header">
            <div className="header-menu">
            <div className="title">Celi<span>Rent</span></div>
            <button className="btn btn-outline-primary" onClick={deconnecter}>Deconnecter</button>
        </div>
        </div>
    )
}
export default Header;