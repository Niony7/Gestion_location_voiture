import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';

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
              idEmployer : "",
              motDePasseEmployer : "",
              telephoneEmployer : "",
              adresseEmployer : ""
            },
          show : false
        }
    }
    handleClose = () => {
        this.setState({show:false});
        const initialValeur = {
          nomEmployer : "",
          prenomEmployer : '',
          idEmployer : "",
          motDePasseEmployer : "",
          telephoneEmployer : "",
          adresseEmployer : ""
        }
        this.setState({model:initialValeur, erreur:initialValeur});
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
    validation = () => {
      let  erreur = {
        nomEmployer : "",
        prenomEmployer : '',
        idEmployer : "",
        motDePasseEmployer : "",
        telephoneEmployer : "",
        adresseEmployer : ""
      };
      if(!this.state.model.nomEmployer){
        erreur.nomEmployer ='le nom est indispensable'
      }
      if(!this.state.model.prenomEmployer){
        erreur.prenomEmployer ='le nom est indispensable'
      }
      if(!this.state.model.idEmployer){
        erreur.idEmployer = "l' identifiant est indispensable"
      }

      if(this.state.model.motDePasseEmployer.length < 4){
        erreur.motDePasseEmployer = 'le mot de passe doit avoir au moin 4 caractere'
      }
      if(!this.state.model.telephoneEmployer){
        erreur.telephoneEmployer = 'le numero de telephone est indispensable'
      }
      if(!this.state.model.adresseEmployer){
        erreur.adresseEmployer = "l' adresse du client est indisapensable"
      }
      if(erreur.nomEmployer || erreur.prenomEmployer || erreur.motDePasseEmployer || erreur.telephoneEmployer || erreur.adresseEmployer || erreur.idEmployer){
        this.setState({erreur});
        return false;
      }
      return true;
    }
    create = async () => {
      const validee = this.validation();
      if(validee){
        await this.props.ajouterEmployer(this.state.model);
        this.handleClose();
      } 
    }
  render = () => {
    const {voitures} = this.state;
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Employer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="identifiant">
                    <Form.Label>Identifiant </Form.Label>
                    <Form.Control type="text" value={this.state.model.idEmployer} 
                    onChange={ e => this.setValue(e, 'idEmployer') } placeholder="identifiant" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.idEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="nom">
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
                    onChange={ e => this.setValue(e, 'prenomEmployer') } placeholder="prenom" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.prenomEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="motDePassEmployere">
                    <Form.Label>Mot de Passe </Form.Label>
                    <Form.Control type="text" value={this.state.model.motDePasseEmployer} 
                    onChange={ e => this.setValue(e, 'motDePasseEmployer') } placeholder="mot de passe du compte client" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.motDePasseEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="telephoneEmployer">
                    <Form.Label>Telephone </Form.Label>
                    <Form.Control type="text" value={this.state.model.telephoneEmployer} 
                    onChange={ e => this.setValue(e, 'telephoneEmployer') } placeholder="telephone" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.telephoneEmployer}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="adresseEmployer">
                    <Form.Label>Adresse </Form.Label>
                    <Form.Control type="text" value={this.state.model.adresseEmployer} 
                    onChange={ e => this.setValue(e, 'adresseEmployer') } placeholder="adresse" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.adresseEmployer}
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
      </>
    );
  }
}

export default ModalModification;