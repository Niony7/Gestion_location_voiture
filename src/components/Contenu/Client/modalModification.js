import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';

class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
            idClient: "",
            nom : "",
            email : "",
            telephone : "",
            adresse : "",
            },
            erreur : {
              nom : "",
              email : "",
              motDePasse : "",
              telephone : "",
              adresse : ""
            },
            nouveauMotDePasse : '',
            erreurNouveauMotDePasse : '',
            etatFormulaireMotDePasse : false
        }
    }

  handleClose = () => {
    this.setState({show:false});
    const initialValeur = {
      nom : "",
      email : "",
      motDePasse : "",
      telephone : "",
      adresse : ""
    }
    this.setState({erreur:initialValeur,etatFormulaireMotDePasse:false,nouveauMotDePasse : '', erreurNouveauMotDePasse : ''})
  }
  handleShow = () => {
    this.setState({show:true})
  }
  changeValue = (nextProps) => {
    this.setState({
        model : nextProps
    })
}
setValue = (e, field) => {
  const { model } = this.state;
  model[field] = e.target.value;
  this.setState(model);
  console.log(this.state.model);
  if(this.state.erreur[field]){
    const {erreur} = this.state;
    erreur[field]='';
    this.setState({erreur});
}
}
setEtatFormulaireMotDePasse = () => {
  const etatFormulaireMotDePasse = !this.state.etatFormulaireMotDePasse;
  this.setState({etatFormulaireMotDePasse});
  this.setState({nouveauMotDePasse : '', erreurNouveauMotDePasse : ''})
}
setMotDePasse = (e) => {
  this.setState({nouveauMotDePasse : e.target.value});
  if(this.state.erreurNouveauMotDePasse){
    this.setState({erreurNouveauMotDePasse:''})
  }
}
validation = () => {
  if(!this.state.etatFormulaireMotDePasse){
    let erreur = {
      nom : "",
      email : "",
      telephone : "",
      adresse : ""
    };
    const client = this.state.model;
    if(!client.nom){
      erreur.nom = 'le nom du client est indispensable';
    }
    if(!client.email.includes('@')){
      erreur.email('email invaid');
    }
    if(!client.telephone){
      erreur.telephone = 'le numero du telephone est indispensable'
    }
    if(!client.adresse){
      erreur.adresse = "l' adresse du client  est indispensable"
    }
    if(erreur.nom || erreur.email || erreur.telephone || erreur.adresse){
      this.setState({erreur});
      return false;
    }
    return true;
  }else{
    let erreur = {
      nom : "",
      email : "",
      telephone : "",
      adresse : ""
    };
    let erreurNouveauMotDePasse = '';
    const client = this.state.model;
    if(!client.nom){
      erreur.nom = 'le nom du client est indispensable';
    }
    if(!client.email.includes('@')){
      erreur.email('email invaid');
    }
    if(!client.telephone){
      erreur.telephone = 'le numero du telephone est indispensable'
    }
    if(!client.adresse){
      erreur.adresse = "l' adresse du client  est indispensable"
    }
    if(this.state.nouveauMotDePasse.length < 4){
      erreurNouveauMotDePasse = 'le mot de passe doit avoir au moin 4 caractere';
    }
    if(erreur.nom || erreur.email || erreur.telephone || erreur.adresse || erreurNouveauMotDePasse){
      this.setState({erreur:erreur, erreurNouveauMotDePasse:erreurNouveauMotDePasse});
      return false;
    }
    return true;
  }
}
update = async () => {
    const validee = this.validation();
    if(validee){
      if(this.state.etatFormulaireMotDePasse){
        await  this.props.modifierClientAvecMotDePasse(this.state.model,this.state.nouveauMotDePasse)
      }else{
        await  this.props.modifierClient(this.state.model);
      }
      this.handleClose();
    }
    
}
  render = () => {
      const {voitures} = this.state;
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" value={this.state.model.nom} 
                    onChange={ e => this.setValue(e, 'nom') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nom}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="text" value={this.state.model.email} 
                    onChange={ e => this.setValue(e, 'email') } placeholder="email du client" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.email}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="Telephone">
                    <Form.Label>Telephone </Form.Label>
                    <Form.Control type="text" value={this.state.model.telephone} 
                    onChange={ e => this.setValue(e, 'telephone') } placeholder="telephone" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.telephone}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="adresse">
                    <Form.Label>Adresse </Form.Label>
                    <Form.Control type="text" value={this.state.model.adresse} 
                    onChange={ e => this.setValue(e, 'adresse') } placeholder="adresse" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.adresse}
                    </Form.Text>
                </Form.Group>  
                
                <Form.Group controlId="nouveauMotDePasse">
                    <Form.Check inline label="Active " type='checkbox' id='etatMotDePasse' onChange={this.setEtatFormulaireMotDePasse}/>
                    <Form.Label>Mot de Passe </Form.Label>
                    {
                      (this.state.etatFormulaireMotDePasse)? (<Form.Control type="text" value={this.state.nouveauMotDePasse} 
                      onChange={ e => this.setMotDePasse(e, 'nouveauMotDePasse') } placeholder="mot de passe" />) :  (
                      <Form.Control type="text" value={this.state.nouveauMotDePasse} 
                      onChange={ e => this.setMotDePasse(e, 'nouveauMotDePasse') } placeholder="mot de passe" 
                      disabled/>)
                    }
                     <Form.Text className="text-muted">
                    {this.state.erreurNouveauMotDePasse}</Form.Text>
                   
                </Form.Group> 
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.update}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalModification;