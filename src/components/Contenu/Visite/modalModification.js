import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';

class ModalModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
              idVisiteTechnique : '',
              dateDebutVisiteTechnique : '',
              dateFinVisiteTechnique : '',
              idVoiture : '',
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
    const erreur = {
      dateDebutVisiteTechnique : '',
      dateFinVisiteTechnique : '',
      idVoiture : '',
      coutVisiteTechnique : '',
      datePayementVisiteTechnique : '',
    }
    this.setState({erreur});
    this.setState({model:''})
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
  if(this.state.model.cout <= 0){
    erreur.cout = "le cout doit etre superieur a 0"
  }
  if( erreur.dateDebutVisiteTechnique || erreur.dateFinVisiteTechnique|| erreur.idVoiture || erreur.coutVisiteTechnique ){
    this.setState({erreur});
    return false;
  } else{
    return true; 
  }
}

update = async () => {
  const valide = this.validation();
    if(valide) {
    await this.props.modifierVisite(this.state.model);
    this.handleClose();
    }
}
  render = () => {
      const {voitures} = this.state;
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modification visite technique</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group controlId="idVisiteTechnique">
                    <Form.Label>ID Visite</Form.Label>
                    <Form.Control type="text" value={this.state.model.idVisiteTechnique}
                    onChange={ e => this.setValue(e, 'idVisiteTechnique') } placeholder="idVisiteTechnique" />
                </Form.Group>
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
                                   <option key={voiture.idVoiture} value={voiture.idVoiture}>{voiture.immatriculation}</option>
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