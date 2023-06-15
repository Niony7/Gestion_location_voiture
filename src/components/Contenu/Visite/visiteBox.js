import React,{ Component } from 'react';
import Liste from './listeVisite';
import axios from 'axios';
import {Container, Row, Button, Card} from 'react-bootstrap';
import ModalAjout from './modalAjout';
import {ExportCSV} from '../export-excel';
export default class VisiteTechniqueBox extends Component {
    Url = 'http://localhost:3001/visiteTechnique';

    constructor(props){
        super(props);
        this.state = {
            visites : [],
            recherche : '',
            fileName : ''
        }
        this.refModalAjout = React.createRef(null);
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                this.setState({ visites : response.data})
            })
            .catch( e => console.log(e))
    }
    create = (visite) => {
        console.log("tonga eto");
        console.log(this.Url);
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : visite,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                const visites  = [ ...this.state.visites, response.data];
                this.setState({ visites : visites});
            })
            .catch( e => console.log(e))
    }

    delete = (idVisiteTechnique) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idVisiteTechnique: idVisiteTechnique},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const visites = this.state.visites.filter( visite => visite.idVisiteTechnique !== idVisiteTechnique);
                    this.setState({ visites });
                }
            })
    }

    update = (visite) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : visite.idVisiteTechnique,
            data : visite,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message)
            }else{
                const visites = this.state.visites.map(visite1=>{
                    if(visite1.idVisiteTechnique == response.data.idVisiteTechnique){
                        visite1.dateDebutVisiteTechnique = response.data.dateDebutVisiteTechnique;
                        visite1.dateFinVisiteTechnique = response.data.dateFinVisiteTechnique;
                        visite1.coutVisiteTechnique = response.data.coutVisiteTechnique;
                        visite1.datePayementVisiteTechnique = response.data.datePayementVisiteTechnique;
                        visite1.coutVisiteTechniqueL = response.data.coutVisiteTechniqueL;
                        visite1.idVoiture =  response.data.idVoiture;
                        visite1.voiture = response.data.voiture;
                    }
                    return visite1;
                })
                this.setState({visites})
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
                        <h4 className="text-themecolor">Visite Technique</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Visite Technique</li>
                            </ol>
                            <ExportCSV csvData={this.state.visites} fileName={this.state.fileName} />
                        </div>
                    </div>
                </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Container>
                            <Row>
                                <Button variant="primary"  onClick={this.afficheModalAjout}>Ajouter</Button>
                                <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                         value={this.state.recherche} onChange={ e => this.setValue(e)}/>
                                </form>
                            </Row>
                            <Card.Title>Listes des Visites Techniques</Card.Title>
                            <div className="table-responsive">
                                <Liste visites={this.state.visites} supprimerVisite={this.delete} modifierVisite={this.update}
                                recherche={this.state.recherche.toLocaleLowerCase()}/>
                            </div>
                            </Container>
                        </Card.Body>
                    </Card>
                    </div>
                </Row>
            </div> 
            <ModalAjout ref={this.refModalAjout} ajouterVisite={this.create}/>
            </>
        )
    }
   
}