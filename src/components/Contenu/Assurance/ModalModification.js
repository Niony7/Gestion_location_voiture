import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';

class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              idAssurance : '',
              agence : "",
              dateDebutAssurance : '',
              dateFinAssurance : '',
              idVoiture : "",
              datePayementAssurance : '',
              coutAssurance : 0,
            },
            erreur : {
              agence : "",
              dateDebutAssurance : '',
              dateFinAssurance : '',
              idVoiture : "",
              datePayementAssurance : '',
              coutAssurance : '',
            },
            voitures : []
        }
        this.UrlVoiture = 'http://localhost:3001/voiture';
    }
    componentDidMount(){
        axios.get(this.UrlVoiture)
            .then(response => {
                console.log(response.data);
                this.setState({voitures : response.data})
            })
            .catch(e => console.log(e))
    }
    
  handleClose = () => {
    this.setState({show:false})
    const initialValeur = {
      agence : "",
      dateDebutAssurance : '',
      dateFinAssurance : '',
      idVoiture : "",
      datePayementAssurance : '',
      coutAssurance : '',
    }
    this.setState({erreur:initialValeur});
  }
  handleShow = () => {
    this.setState({show:true})
  }
  changeValue = (assurance) => {
      const  model = {
        idAssurance : assurance.idAssurance,
        agence : assurance.agence,
        dateDebutAssurance : assurance.dateDebutAssurance,
        dateFinAssurance : assurance.dateFinAssurance,
        idVoiture : assurance.idVoiture,
        coutAssurance : assurance.coutAssurance,
        datePayementAssurance : assurance.datePayementAssurance
      };
    this.setState({model})
}
setValue = (e, field) => {
  const { model } = this.state;
  model[field] = e.target.value;
  this.setState(model);
  if(this.state.erreur[field]){
    const {erreur} = this.state;
    erreur[field]='';
    this.setState({erreur});
}
}
validation = () => {
  let erreur = {
    agence : "",
    dateDebutAssurance : '',
    dateFinAssurance : '',
    idVoiture : "",
    datePayementAssurance : '',
    coutAssurance : '',
  };
  if(!this.state.model.agence){
    erreur.agence = "l' agence ne doit pas etre vide";
  }
  if(!this.state.model.idVoiture){
    erreur.idVoiture = "vous devez selectionner un voiture"
  }
  if(this.state.model.coutAssurance <= 0){
    erreur.coutAssurance = "le cout doit etre superieur a 0"
  }
  if(erreur.agence || erreur.dateDebutAssurance || erreur.dateFinAssurance || erreur.idVoiture || erreur.coutAssurance){
    this.setState({erreur});
    return false;
  } else{
    return true; 
  }
 
}

update = async () => {
  if(this.validation()){
    await this.props.modifierAssurance(this.state.model);
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
                <Form.Group controlId="agence">
                    <Form.Label>Agence</Form.Label>
                    <Form.Control type="text" value={this.state.model.agence} 
                    onChange={ e => this.setValue(e, 'agence') } placeholder="Nom de l' agence'" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.agence}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="dateDebutAssurance">
                    <Form.Label>Date debut </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateDebutAssurance} 
                    onChange={ e => this.setValue(e, 'dateDebutAssurance') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.dateDebutAssurance}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="dateFinAssurance">
                    <Form.Label>Date Fin </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateFinAssurance} 
                    onChange={ e => this.setValue(e, 'dateFinAssurance') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.dateFinAssurance}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="idVoiture">
                            <Form.Label>Voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.idVoiture} onChange = { e => this.setValue( e, 'idVoiture')}>
                            <option>----------</option>
                            {
                               voitures.map( (voiture) => (
                                   <option key={voiture.idVoiture} value={voiture.idVoiture}>{voiture.immatriculation}</option>
                               ))
                            }
                            </Form.Control>
                            <Form.Text className="text-muted">
                    {this.state.erreur.idVoiture}
                    </Form.Text>
                </Form.Group>
                            <Form.Group controlId="coutAssurance">
                            <Form.Label>Cout</Form.Label>
                            <Form.Control type="number" value={this.state.model.coutAssurance}
                            onChange={ e => this.setValue(e, 'coutAssurance') } placeholder="coutAssurance" />
                  <Form.Text className="text-muted">
                    {this.state.erreur.coutAssurance}
                    </Form.Text>
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