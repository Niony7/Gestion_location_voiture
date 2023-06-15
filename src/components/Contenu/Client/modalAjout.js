import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';

class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              nom : "",
              email : "",
              motDePasse : "",
              telephone : "",
              adresse : ""
            },
            erreur : {
              nom : "",
              email : "",
              motDePasse : "",
              telephone : "",
              adresse : ""
            },
          show : false
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
        this.setState({model:initialValeur});
        this.setState({erreur:""});
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
        nom : "",
        email : "",
        motDePasse : "",
        telephone : "",
        adresse : ""
      };
      if(!this.state.model.nom){
        erreur.nom ='le nom est indispensable'
      }
      if(!this.state.model.email.includes('@')){
        erreur.email = 'invalid email'
      }
      if(this.state.model.motDePasse.length < 4){
        erreur.motDePasse = 'le mot de passe doit avoir au moin 4 caractere'
      }
      if(!this.state.model.telephone){
        erreur.telephone = 'le numero de telephone est indispensable'
      }
      if(!this.state.model.adresse){
        erreur.adresse = "l' adresse du client est indisapensable"
      }
      if(erreur.nom || erreur.email || erreur.motDePasse || erreur.telephone || erreur.adresse){
        this.setState({erreur});
        return false;
      }
      return true;
    }
    create = async () => {
      const validee = this.validation();
      if(validee){
        await this.props.ajouterClient(this.state.model);
        this.handleClose();
      } 
    }
  render = () => {
    const {voitures} = this.state;
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Assurance</Modal.Title>
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
                <Form.Group controlId="motDePasse">
                    <Form.Label>Mot de Passe </Form.Label>
                    <Form.Control type="text" value={this.state.model.motDePasse} 
                    onChange={ e => this.setValue(e, 'motDePasse') } placeholder="mot de passe du compte client" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.motDePasse}
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