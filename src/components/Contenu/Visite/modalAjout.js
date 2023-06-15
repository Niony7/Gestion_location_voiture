import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
var dateFormat = require('dateformat');
class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              dateDebutVisiteTechnique : '',
              dateFinVisiteTechnique : '',
              idVoiture : "",
              coutVisiteTechnique : 0,
              datePayementVisiteTechnique : '',
            },
            erreur : {
              dateDebutVisiteTechnique : '',
              dateFinVisiteTechnique : '',
              idVoiture : '',
              coutVisiteTechnique : '',
              datePayementVisiteTechnique : '',
            },
            voitures : []
        }
        this.UrlVoiture = 'http://localhost:3001/voiture';
    }
    handleClose = () => {
        this.setState({show:false});
        var dateTmp = new Date(Date.now());
        const model = {
          dateDebutVisiteTechnique : dateFormat(dateTmp, 'yyyy-mm-dd'),
          datePayementVisiteTechnique : dateFormat(dateTmp, 'yyyy-mm-dd'),
          dateFinVisiteTechnique : dateFormat(dateTmp.setDate(dateTmp.getDate()+365), 'yyyy-mm-dd'),
          idVoiture : "",
          coutVisiteTechnique : 0,

        };
        this.setState({model});
        this.setState({erreur:''});
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
        var dateTmp = new Date(Date.now())
        const model = {
          dateDebutVisiteTechnique : dateFormat(dateTmp, 'yyyy-mm-dd'),
          datePayementVisiteTechnique : dateFormat(dateTmp, 'yyyy-mm-dd'),
          dateFinVisiteTechnique : dateFormat(dateTmp.setDate(dateTmp.getDate()+365), 'yyyy-mm-dd'),
          idVoiture : "",
          coutVisiteTechnique : 0,
        };
        this.setState({model})
    }
    validation = () => {
      let erreur = {
        dateDebutVisiteTechnique : '',
              dateFinVisiteTechnique : '',
              idVoiture : '',
              coutVisiteTechnique : '',
              datePayementVisiteTechnique : '',
      };

      if(!this.state.model.idVoiture){
        erreur.idVoiture = "vous devez selectionner un voiture"
      }
      if(this.state.model.coutVisiteTechnique <= 0){
        erreur.coutVisiteTechnique = "le cout doit etre superieur a 0"
      }
      if( erreur.dateDebutVisiteTechnique || erreur.dateFinVisiteTechnique || erreur.idVoiture || erreur.coutVisiteTechnique){
        this.setState({erreur});
        return false;
      } else{
        return true; 
      }
    }
    create = async () => {
      const valide = this.validation();
        if(valide) {
          await this.props.ajouterVisite(this.state.model);
          this.handleClose();
        }
    }
  render = () => {
    const {voitures} = this.state;
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Technique</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

                <Form.Group controlId="dateDebutVisiteTechnique">
                    <Form.Label>Date debut </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateDebutVisiteTechnique} 
                    onChange={ e => this.setValue(e, 'dateDebutVisiteTechnique') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.dateDebutVisiteTechnique}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="dateFinVisiteTechnique">
                    <Form.Label>Date Fin </Form.Label>
                    <Form.Control type="date" value={this.state.model.dateFinVisiteTechnique} 
                    onChange={ e => this.setValue(e, 'dateFinVisiteTechnique') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.dateFinVisiteTechnique}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="idVoiture">
                            <Form.Label>Voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.idVoiture} onChange = { e => this.setValue( e, 'idVoiture')}>
                            <option>----------</option>
                            {
                               voitures.map( (voiture) => (
                                   <option key={voiture.idVoiture} value={voiture.idVoiture}>{voiture.immatriculation + ' : ' + voiture.marque + '-' + voiture.model}</option>
                               ))
                            }
                            </Form.Control>
                            <Form.Text className="text-muted">
                    {this.state.erreur.idVoiture}
                    </Form.Text>
                    <Form.Group controlId="datePayementVisiteTechnique">
                    <Form.Label>Date Payement </Form.Label>
                    <Form.Control type="date" value={this.state.model.datePayementVisiteTechnique} 
                    onChange={ e => this.setValue(e, 'datePayementVisiteTechnique') } placeholder="" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.datePayementVisiteTechnique}
                    </Form.Text>
                </Form.Group>
                </Form.Group>
                            <Form.Group controlId="coutVisiteTechnique">
                            <Form.Label>Cout</Form.Label>
                            <Form.Control type="number" value={this.state.model.coutVisiteTechnique}
                            onChange={ e => this.setValue(e, 'coutVisiteTechnique') } placeholder="coutVisiteTechnique" />
                  <Form.Text className="text-muted">
                    {this.state.erreur.coutVisiteTechnique}
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