import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
var dateFormat = require('dateformat');
class ModalModification extends Component {
  constructor(props) {
    super(props);
    this.state = {
        model : {
          dateReparation :dateFormat(new Date(Date.now()), 'yyyy-mm-dd'),
          description : "",
          idVoiture : "",
          coutReparation : 0
        },erreur : {
          dateReparation :'',
          description : "",
          idVoiture : "",
          coutReparation : ''
        },
        voitures : []
    }
    this.UrlVoiture = 'http://localhost:3001/voiture';
}
    handleClose = () => {
        this.setState({show:false});
        const model = {
          dateReparation : dateFormat(new Date(Date.now()), 'yyyy-mm-dd'),
          description : "",
          idVoiture : "",
          coutReparation : 0,
        };
        this.setState({model});
        const erreur = {
          dateReparation : '',
          description : '',
          idVoiture : '',
          coutReparation : '',
        };
        this.setState({erreur});
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
    componentDidMount(){
      axios.get(this.UrlVoiture)
          .then(response => {
            
              console.log(response.data);
              this.setState({voitures : response.data})
          })
          .catch(e => console.log(e))
  }
  validation = () => {
    let erreur = {
      dateReparation : '',
      description : '',
      idVoiture : '',
      coutReparation : '',
    };
    if(!this.state.model.description){
      erreur.description = 'la description de la reparation dooit etre informer'
    }
    if(!this.state.model.idVoiture){
      erreur.idVoiture = 'veuillez choisir la voiture correspond'
    }
    if(this.state.model.coutReparation<=0){
      erreur.coutReparation = 'le cout doit etre superieur a 0'
    }
    if(erreur.dateReparation || erreur.description || erreur.idVoiture || erreur.coutReparation){
      this.setState({erreur});
      return false;
    }
    return true;
  }
  create = () => {
    const validee = this.validation();
    if(validee){
      this.props.ajouterReparation(this.state.model);
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
                <Form.Group controlId="dateReparation">
                    <Form.Label>Date Reparation </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateReparation} 
                    onChange={ e => this.setValue(e, 'dateReparation') } placeholder="" />
                     <Form.Text className="text-muted">
                    {this.state.erreur.dateReparation}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Desciption</Form.Label>
                    <Form.Control type="text" value={this.state.model.description} 
                    onChange={ e => this.setValue(e, 'description') } placeholder="description de la reparation" />
                     <Form.Text className="text-muted">
                    {this.state.erreur.description}
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
                            <Form.Group controlId="coutReparation">
                            <Form.Label>Cout</Form.Label>
                            <Form.Control type="number" value={this.state.model.coutReparation}
                            onChange={ e => this.setValue(e, 'coutReparation') } placeholder="coutReparation" />
                   <Form.Text className="text-muted">
                    {this.state.erreur.coutReparation}
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