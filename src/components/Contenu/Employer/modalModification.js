import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';

class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              nomEmployer : "",
              prenomEmployer : '',
              idEmployer : "",
              motDePasseEmployer : "",
              telephoneEmployer : "",
              adresseEmployer : ""
            },
            erreur : {
              nomEmployer : "",
              prenomEmployer : '',
              motDePasseEmployer : "",
              telephoneEmployer : "",
              adresseEmployer : ""
            },
            nouveauMotDePasse : '',
            erreurNouveauMotDePasse : '',
            etatFormulaireMotDePasse : false
        }
    }

  handleClose = () => {
    this.setState({show:false});
    const initialValeur = {
      nomEmployer : "",
      prenomEmployer : '',
      motDePasseEmployer : "",
      telephoneEmployer : "",
      adresseEmployer : ""
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
      nomEmployer : "",
      prenomEmployer : '',
      telephoneEmployer : "",
      adresseEmployer : ""
    };
    const client = this.state.model;
    if(!client.nomEmployer){
      erreur.nomEmployer = 'le nom du client est indispensable';
    }
    if(!client.prenomEmployer){
      erreur.nomEmployer = 'le prenom du client est indispensable';
    }
    if(!client.telephoneEmployer){
      erreur.telephoneEmployer = 'le numero du telephone est indispensable'
    }
    if(!client.adresseEmployer){
      erreur.adresseEmployer = "l' adresse du client  est indispensable"
    }
    if(erreur.nomEmployer || erreur.prenomEmployer || erreur.telephoneEmployer || erreur.adresseEmployer){
      this.setState({erreur});
      return false;
    }
    return true;
  }else{
    let erreur = {
      nomEmployer : "",
      prenomEmployer : '',
      motDePasseEmployer : "",
      telephoneEmployer : "",
      adresseEmployer : ""
    };
    let erreurNouveauMotDePasse = '';
    const client = this.state.model;
    if(!client.nomEmployer){
      erreur.nomEmployer = "le nom du l' employer est indispensable";
    }
    if(!client.prenomEmployer){
      erreur.nomEmployer = "le prenom de l' employer est indispensable";
    }
    if(!client.telephoneEmployer){
      erreur.telephoneEmployer = 'le numero du telephone est indispensable'
    }
    if(!client.adresseEmployer){
      erreur.adresseEmployer = "l' adresse d' employer' est indispensable"
    }
    if(this.state.nouveauMotDePasse.length < 4){
      erreurNouveauMotDePasse = 'le mot de passe doit avoir au moin 4 caractere';
    }
    if(erreur.nomEmployer || erreur.prenomEmployer || erreur.telephoneEmployer || erreur.adresseEmployer || erreurNouveauMotDePasse){
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
        await  this.props.modifierEmployerAvecMotDePasse(this.state.model,this.state.nouveauMotDePasse)
      }else{
        await  this.props.modifierEmployer(this.state.model);
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
            <Modal.Title>Modifier Employer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group controlId="idEmployer">
                    <Form.Label>ID Empoyer</Form.Label>
                    <Form.Control type="text" value={this.state.model.idEmployer}
                    onChange={ e => this.setValue(e, 'idEmployert') }/>
                </Form.Group>
                <Form.Group controlId="nomEmployer">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" value={this.state.model.nomEmployer} 
                    onChange={ e => this.setValue(e, 'nomEmployer') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nomEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="prenomEmployer">
                    <Form.Label>Prenom</Form.Label>
                    <Form.Control type="text" value={this.state.model.prenomEmployer} 
                    onChange={ e => this.setValue(e, 'prenomEmployer') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.prenomEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="TelephoneEmployer">
                    <Form.Label>Telephone </Form.Label>
                    <Form.Control type="text" value={this.state.model.telephoneEmployer} 
                    onChange={ e => this.setValue(e, 'telephoneEmployer') } placeholder="telephone" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.telephoneEmployerEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="adresse">
                    <Form.Label>Adresse </Form.Label>
                    <Form.Control type="text" value={this.state.model.adresseEmployer} 
                    onChange={ e => this.setValue(e, 'adresseEmployer') } placeholder="adresse" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.adresseEmployer}
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