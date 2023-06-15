import { Component } from 'react';
import Formulaire from './formulaireParametre';
import axios from 'axios';
import {Row, Col, Card,Container} from 'react-bootstrap';
export default class CategoriesBox extends Component {
    Url = 'http://localhost:3001/authentification';
    update = (compte) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : compte.identifiant,
            data : compte,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message);
            }
        })
        .catch( e => console.log(e))
    }
    render () {
        return (
            <>
            <div className="container-fluid">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Parametre</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Parametre</li>
                            </ol>
                        </div>
                    </div>
                </div>
                    <Container>
                        <div className='parametre-fluid'>
                        <Card>
                            <Card.Body><h3>Modification compte</h3>
                            
                                <Formulaire modifierCompte={this.update}/>
                            </Card.Body>
                        </Card>
                        </div>
                    </Container>
                </div>
                
            </>    
        )
    }
   
}