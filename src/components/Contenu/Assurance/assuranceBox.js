import React,{ Component } from 'react';
import Liste from './listeAssurance';
import axios from 'axios';
import {Container, Row, Button, Card} from 'react-bootstrap';
import ModalAjout from './modalAjout';
import {ExportCSV} from '../export-excel';
export default class CategoriesBox extends Component {
    Url = 'http://localhost:3001/assurance';

    constructor(props){
        super(props);
        this.state = {
            assurances : [],
            recherche : '',
            fileName : 'liste assurance'
        }
        this.refModalAjout = React.createRef(null);
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    this.setState({ assurances : response.data})
                }
               
            })
            .catch( e => console.log(e))
    }
    create = (assurance) => {
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : assurance,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const assurances  = [ ...this.state.assurances, response.data];
                    this.setState({ assurances : assurances});
                }      
            })
            .catch( e => console.log(e))
    }

    delete = (idAssurance) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idAssurance: idAssurance},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const assurances = this.state.assurances.filter( assurance => assurance.idAssurance !== idAssurance);
                    this.setState({ assurances });
                }
            })
    }

    update = (assurance) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : assurance.idAssurance,
            data : assurance,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message)
            }else{
                const assurances = this.state.assurances.map(_assurance=>{
                    if(_assurance.idAssurance == response.data.idAssurance){
                        _assurance.agence = response.data.agence;
                        _assurance.dateDebutAssurance = response.data.dateDebutAssurance;
                        _assurance.dateFinAssurance = response.data.dateFinAssurance;
                        _assurance.idVoiture = response.data.idVoiture;
                        _assurance.datePayementAssurance = response.data.datePayementAssurance;
                        _assurance.coutAssurance = response.data.coutAssurance;
                        _assurance.voiture = response.data.voiture;
                        _assurance.coutAssuranceL = response.data.coutAssuranceL;
                    }
                    return _assurance;
                });
                this.setState({assurances})
            }
            
        })
        .catch( e => console.log(e))
    }
    afficheModalAjout = () => {
        this.refModalAjout.current.handleShow();
    }
    setValue = (e) => {
        this.setState({recherche:e.target.value});
    }
    render () {
        return (
            <>
            <div className="container-fluid">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Assurance</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Assurance</li>
                            </ol>
                            <ExportCSV csvData={this.state.assurances} fileName={this.state.fileName} />
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
                                <Row>
                                    <Card.Title>Listes des assurances</Card.Title>
                                    <div className="table-responsive">
                                        <Liste assurances={this.state.assurances} supprimerAssurance={this.delete} modifierAssurance={this.update}
                                        recherche={this.state.recherche.toLocaleLowerCase()}/>
                                    </div>
                                    </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                    </div>
                </Row>
                <ModalAjout ref={this.refModalAjout} ajouterAssurance={this.create}/>
            </div>
                
            </>
        )
    }
   
}