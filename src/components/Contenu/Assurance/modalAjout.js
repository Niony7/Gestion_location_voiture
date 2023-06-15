import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
var dateFormat = require('dateformat');
class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              agence : "",
              dateDebutAssurance : '',
              dateFinAssurance : '',
              idVoiture : "",
              datePayementAssurance : '',
              coutAssurance : 0,
            },
            erreur : {
              agence : '',
              dateDebutAssurance : '',
              dateFinAssurance : '',
              idVoiture : "",
              datePayementAssurance : '',
              coutAssurance : ''
            },
            voitures : []
        }
        this.UrlVoiture = 'http://localhost:3001/voiture';
    }
    handleClose = () => {
        this.setState({show:false});
        var dateTmp = new Date(Date.now())
        const model = {
          dateDebutAssurance : dateFormat(dateTmp, 'yyyy-mm-dd'),
          datePayementAssurance : dateFormat(dateTmp, 'yyyy-mm-dd'),
          dateFinAssurance : dateFormat(dateTmp.setDate(dateTmp.getDate()+365), 'yyyy-mm-dd'),
          idVoiture : "",
          coutAssurance : 0,
          agence : '',
        };
        this.setState({model});
        this.setState({erreur:''})
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
        if(this.state.erreur[field]){
          const {erreur} = this.state;
          erreur[field]='';
          this.setState({erreur});
      }
    }
    componentDidMount = () => {

        axios.get(this.UrlVoiture)
            .then(response => {
            console.log("responseVoiture");
                console.log(response.data);
                this.setState({voitures : response.data})
            })
            .catch(e => console.log(e))
        var dateTmp = new Date(Date.now())
        const model = {
          dateDebutAssurance : dateFormat(dateTmp, 'yyyy-mm-dd'),
          datePayementAssurance : dateFormat(dateTmp, 'yyyy-mm-dd'),
          dateFinAssurance : dateFormat(dateTmp.setDate(dateTmp.getDate()+365), 'yyyy-mm-dd'),
          idVoiture : "",
          coutAssurance : 0,
          agence : '',
        };
        this.setState({model})
    }
    validation = () => {
      let erreur = {
        agence : '',
        dateDebutAssurance : '',
        dateFinAssurance : '',
        idVoiture : "",
        datePayementAssurance : '',
        coutAssurance : ''
      };
      if(!this.state.model.agence){
        erreur.agence = "l' agence ne doit pas etre vide";
      }
      if(!this.state.model.idVoiture){
        erreur.idVoiture = "vous devez selectionner un voiture"
      }
      if(this.state.model.coutAssurance <= 0){
        erreur.cout = "le cout doit etre superieur a 0"
      }
      if(erreur.agence || erreur.dateDebutAssurance || erreur.dateFinAssurance || erreur.idVoiture || erreur.coutAssurance){
        this.setState({erreur});
        return false;
      } else{
        return true;
      }
     
    }
    create =  async () => {
      const valide = this.validation();
      if(valide){
       await this.props.ajouterAssurance(this.state.model);
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
                <Form.Group controlId="datePayementAssurance">
                    <Form.Label>Date Fin </Form.Label>
                    <Form.Control type="date" value={this.state.model.datePayementAssurance} 
                    onChange={ e => this.setValue(e, 'datePayementAssurance') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.datePayementAssurance}
                    </Form.Text>
                </Form.Group>
                            <Form.Group controlId="coutAssurance">
                            <Form.Label>Cout</Form.Label>
                            <Form.Control type="number" value={this.state.model.coutAssurance}
                            onChange={ e => this.setValue(e, 'coutAssurance') } placeholder="cout" />
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
            <Button variant="primary" onClick={this.create}>Ajouter </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalModification;