import { Component } from 'react';
import {Form, Button,Modal} from 'react-bootstrap';
import axios from 'axios';
var dateFormat = require('dateformat');
export default class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              dateDebut : dateFormat(new Date(Date.now()), 'yyyy-mm-dd'),
              nombreJour : "",
              idVoiture : "",
              idClient : "",
            },
            erreur : {
              dateDebut : '',
              nombreJour : "",
              idVoiture : "",
              idClient : "",
            },
            show : false,
            voitures : [],
            clients : [],
        }
        this.UrlVoiture = 'http://localhost:3001/voiture/disponible';
        this.UrlClient = 'http://localhost:3001/client';
        this.UrlRecherche =  "http://localhost:3001/voiture/recherche";
    }
    handleClose = () => {
      this.setState({show:false});
      const model = {
        dateDebut : dateFormat(new Date(Date.now()), 'yyyy-mm-dd'),
        nombreJour : "",
        idVoiture : "",
        idClient : "",
      };
      const  erreur = {
        dateDebut : '',
        nombreJour : "",
        idVoiture : "",
        idClient : "",
      };
      this.setState({model, erreur});
  }
  handleShow = () => {
      this.setState({show:true})
  }
    changeValue = (nextProps) => {
        this.setState({
            model : nextProps
        })
    }
    componentDidMount(){
      axios.get(this.UrlVoiture)
          .then(response => {
            if(response.data.message){
              alert(response.data.message)
            }else{
              this.setState({voitures : response.data})
            }
              console.log(response.data);
              
          })
          .catch(e => console.log(e))
      axios.get(this.UrlClient)
          .then(response => {
              console.log(response.data);
              this.setState({clients : response.data})
          })
          .catch(e => console.log(e))
  }
  setValue = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState(model);
    console.log(this.state.model);
    if(field == 'dateDebut'){
      const requestInfo = {
        url : this.UrlRecherche,
        method : 'POST',
        data : {dateDebut: this.state.model.dateDebut},
        headers: new Headers({
            'Content-type' : 'application/json'
        })
    };
    axios.request(requestInfo)
        .then( (response) => {
           if(response.data.message){
               alert(response.data.message)
           }else{
                this.setState({voitures:response.data});
           }
        })
    }
    if(this.state.erreur[field]){
      const {erreur} = this.state;
      erreur[field]='';
      this.setState({erreur});
  }
}

  validation = () => {
    const  erreur = {
      dateDebut : '',
      nombreJour : "",
      idVoiture : "",
      idClient : "",
    };
    const  location = this.state.model;
    if(location.nombreJour <= 0){
      erreur.nombreJour = 'le nombre de jour doit etre superieur a 0'
    }
    if(!location.idVoiture){
      erreur.idVoiture = 'aucun voiture selectionnner';
    }
    if(!location.idClient){
      erreur.idClient = 'aucun client selectionner';
    }
    if(erreur.nombreJour || erreur.idVoiture || erreur.idClient){
      this.setState({erreur});
      return false;
    }
    return true;
  }
    create = async () => {
      const validee = this.validation();
      if(validee){
        console.log(this.props);
        await this.props.ajouterLocation(this.state.model);
        this.handleClose();
      }
    }
    render = () => {
      const {voitures} = this.state;
      const {clients} = this.state;
      return (
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            
            <Modal.Title>Ajouter Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group controlId="dateDebut">
                    <Form.Label>Date debut </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateDebut} 
                    onChange={ e => this.setValue(e, 'dateDebut') } placeholder="" />
                     <Form.Text className="text-muted">
                    {this.state.erreur.dateDebut}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="nombreJour">
                    <Form.Label>Nombre de Jour</Form.Label>
                    <Form.Control type="number" value={this.state.model.nombreJour} 
                    onChange={ e => this.setValue(e, 'nombreJour') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nombreJour}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="idVoiture">
                            <Form.Label>Voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.idVoiture} onChange = { e => this.setValue( e, 'idVoiture')}>
                            <option>----------</option>
                            {
                               voitures.map( (voiture) => (
                                   <option key={voiture.idVoiture} value={voiture.idVoiture}>{voiture.immatriculation + ' : '+ voiture.marque + '-' + voiture.model}</option>
                               ))
                            }
                            </Form.Control>
                            <Form.Text className="text-muted">
                    {this.state.erreur.id_voiture}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="idClient">
                            <Form.Label>Client</Form.Label>
                            <Form.Control as="select" value = { this.state.model.idClient} onChange = { e => this.setValue( e, 'idClient')}>
                            <option>----------</option>
                            {
                              clients.map( (client) => (
                                   <option key={client.idClient} value={client.idClient}>
                                     {client.nom + " : " + client.email}</option>
                               ))
                            }
                            </Form.Control>
                    <Form.Text className="text-muted">
                    {this.state.erreur.idClient}
                    </Form.Text>
                </Form.Group>     
            </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.create}>Ajouter </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }