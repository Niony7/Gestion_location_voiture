import React,{ Component } from 'react';
import Liste from './listeReparation';
import axios from 'axios';
import {Container, Row, Button, Card} from 'react-bootstrap';
import ModalAjout from './modalAjout';
import {ExportCSV} from '../export-excel';
export default class ReparationBox extends Component {
    Url = 'http://localhost:3001/reparation';

    constructor(props){
        super(props);
        this.state = {
            reparations : [],
            recherche : '',
            fileName : 'liste Reparation'
        }
        this.refModalAjout = React.createRef(null);
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                this.setState({ reparations : response.data})
            })
            .catch( e => console.log(e))
    }
    create = (reparation) => {
        console.log("tonga eto");
        console.log(this.Url);
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : reparation,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const reparations  = [ ...this.state.reparations, response.data];
                    this.setState({ reparations : reparations});
                }
            })
            .catch( e => console.log(e))
    }

    delete = (idReparation) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idReparation: idReparation},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message);
                }else{
                    const reparations = this.state.reparations.filter( reparation => reparation.idReparation !== idReparation);
                    this.setState({ reparations });
                }
            })
    }

    update = (reparation) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : reparation.idReparation,
            data : reparation,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message)
            }else{
                const reparations = this.state.reparations.map(_reparation =>{
                    if(_reparation.idReparation == response.data.idReparation){
                        _reparation.coutReparationL = response.data.coutReparationL;
                        _reparation.coutReparation = response.data.coutReparation;
                        _reparation.dateReparation = response.data.dateReparation;
                        _reparation.description = response.data.description;
                        _reparation.idVoiture = response.data.idVoiture;
                        _reparation.voiture = response.data.voiture;
                    }
                    return _reparation;
                })
                this.setState({ reparations})
            }
            
        })
        .catch( e => console.log(e))
    }
    afficheModalAjout = () => {
        this.refModalAjout.current.handleShow();
    }
    render () {
        return (
            <>
            <div className="container-fluid">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Reparation</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Reparation</li>
                            </ol>
                            <ExportCSV csvData={this.state.reparations} fileName={this.state.fileName} />
                        </div>
                    </div>
                </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Button variant="primary" onClick={this.afficheModalAjout}>Ajouter</Button>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                         value={this.state.recherche} onChange={ e => this.setValue(e)}/>
                                    </form>
                                </Row>
                                <Card.Title>Listes des Reparations</Card.Title>
                                <div className="table-responsive">
                                    <Liste reparations={this.state.reparations} supprimerReparation={this.delete} modifierReparation={this.update}
                                    recherche={this.state.recherche.toLocaleLowerCase()}/>
                                </div>
                            </Container>
                        </Card.Body> 
                    </Card>
                    </div>
                </Row>
            </div>
            <ModalAjout ref={this.refModalAjout} ajouterReparation={this.create}/>
            </>
        )
    }
   
}