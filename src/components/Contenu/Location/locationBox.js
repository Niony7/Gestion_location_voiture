import React,{ Component } from 'react';
import Liste from './listeLocation';
import axios from 'axios';
import {Container, Row, Button, Card,Form} from 'react-bootstrap';
import ModalAjout from './modalAjout';
import {ExportCSV} from '../export-excel';

export default class CategoriesBox extends Component {
    Url = 'http://localhost:3001/location';

    constructor(props){
        super(props);
        this.state = {
            locations : [],
            recherche : '',
            radioValue : 'tout',
            fileName : 'liste locations'
        }
        this.refModalAjout = React.createRef(null);
    }
    componentDidMount() {
        this.actualiseState();
    }
    actualiseState = () =>{
        axios.get(this.Url)
            .then( (response) => {
                this.setState({ locations : response.data})
            })
            .catch( e => console.log(e))
    }
    create = (location) => {
        console.log("tonga eto");
        console.log(this.Url);
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : location,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const locations  = [...response.data];
                    this.setState({ locations});
                }
                
            })
            .catch( e => console.log(e))
    }

    delete = (idLocation) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idLocation : idLocation},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const locations = this.state.locations.filter( location => location.idLocation!== idLocation);
                    this.setState({ locations });
                }
            })
    }

    update = (location) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : location.idLocation,
            data : location,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message);
            }else{
                
                alert(response.data.message)
                const locations = this.state.locations.forEach( (location1) => {
                    if (location1.idLocation == location.idLocation){
                        location1.idClient = location.idClient;
                        location1.idVoitures = location.idVoitures;
                        location1.nombreJour = location.nombreJour;
                    }
                });
                this.setState({ locations });
            }
           
        })
        .catch( e => console.log(e))
    }
    afficheModalAjout = () => {
        this.refModalAjout.current.handleShow();
    }
    terminerLocation = (idLocation) => {
        const requestInfo = {
            url : this.Url+'/finLocation',
            method : 'POST',
            data : {idLocation : idLocation},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const locations = this.state.locations.map(location => {
                        if(location.idLocation == idLocation){
                            location.enCour = 0;
                        }
                        return location;
                    })
                    this.setState({locations})
                }
            })
            .catch( e => console.log(e))
    }
    payerLocation = (idLocation) => {
        const requestInfo = {
            url : this.Url+'/payer',
            method : 'POST',
            data : {idLocation : idLocation},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const locations = this.state.locations.map(location => {
                        if(location.idLocation == idLocation){
                            location.payer = 1;
                        }
                        return location;
                    })
                    this.setState({locations})
                }
            })
            .catch( e => console.log(e))
    }
    setValue = (e) => {
        this.setState({recherche:e.target.value});
    }
    radioChange = (e) => {
        this.setState({radioValue:e.target.value})
    }
    render = () => {
        var radioValue = this.state.radioValue;
        return (
            <>
            <div className="container-fluid">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Location</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Location</li>
                            </ol>
                            <ExportCSV csvData={this.state.locations} fileName={this.state.fileName} />
                        </div>
                    </div>
                </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Row>
                            <Button variant="primary"  onClick={this.afficheModalAjout}>Ajouter</Button>
                               
                            </Row>
                            <Card.Title>Liste des Location</Card.Title>
                            <Row>
                                <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                        value={this.state.recherche} onChange={ e => this.setValue(e)}/>

                                        <Form.Check inline label="2" type="radio" name="cour" id="tout" label="Tout" value='tout'
                                        checked={radioValue==='tout'} onChange={ e => this.radioChange(e)}/>
                                        <Form.Check inline label="2" type="radio" name="cour" id="enCour" label="En Cour" value="enCour"
                                        checked={radioValue==='enCour'} onChange={ e => this.radioChange(e)}/>
                                        <Form.Check inline label="2" type="radio" name="cour" id="terminer" label="Terminer" value="terminer"
                                        checked={radioValue==='terminer'} onChange={ e => this.radioChange(e)}/>
                                    </form>
                            </Row>
                            <div className="table-responsive">
                                    <Liste locations={this.state.locations} supprimerLocation={this.delete} modifierLocation={this.update} 
                                    terminerLocation={this.terminerLocation} payerLocation={this.payerLocation}
                                    recherche={this.state.recherche} radioValue={this.state.radioValue}/>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                    </Row>
                <ModalAjout ajouterLocation={this.create} ref={this.refModalAjout}/>
            </div>
            </>
        )
    }
   
}