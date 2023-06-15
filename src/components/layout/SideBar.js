
import React from 'react';
import './SideBar.css';
import  {sideBarData} from './SideBarData'
import { Link } from 'react-router-dom';
import { Component } from 'react';
class SideBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            activePath : '/',
        }
    }

    active(path){
        this.setState({activePath:path})
    }
    render(){
    return(
        <nav className="side-bar">
            <ul className="nav-menu-item">
                    {
                        sideBarData.map((item, index)=>{
                            return (
                                <li key={index} className={this.state.activePath===item.path?'nav-text-active':item.cName}>
                                    <Link to={item.path} onClick={e => this.active(item.path)}>
                                        <div className="left-text">
                                        {item.icon}
                                        </div>
                                        <div className="right-text">
                                        <span>{item.title}</span>
                                        </div>
                                        
                                    </Link>
                                </li>
                            )
                        })
                    }
            </ul>
        
        </nav>
    )
    }
}

export default SideBar;