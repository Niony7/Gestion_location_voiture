import { Component } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';

class ModalModification extends Component {
    constructor(props) {
      super(props);
      this.state = {
          model : {
              idCategorie : "",
              nomCategorie : ""
          },
          erreur : {
            idCategorie : "",
            nomCategorie : ""
          },
          show : false
      }
      console.log("Modal Liste Props");
      console.log(this.props);
  }
  handleClose = () => {
    let  initialeValeur= {
      idCategorie : "",
      nomCategorie : ""
    };
    this.setState({erreur:initialeValeur});
    this.setState({model:initialeValeur});
    this.setState({show:false})
  }
  handleShow = () => {
    this.setState({show:true});
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
      idCategorie : '',
      nomCategorie : ''
  }
  if(this.state.model.idCategorie==''){
      erreur.idCategorie = 'le numero de la categorie ne doit pas etre vide'
  }
  if(this.state.model.nomCategorie==''){
      erreur.nomCategorie = 'le nom de la categorie ne doit pas etre vide'
  }
  if(erreur.idCategorie != '' || erreur.nomCategorie != ''){
      this.setState({erreur});
      return false;
  }else {
    return true;  }
  
}
update = async () => {
  const validee = this.validation();
  if(validee){
    let data = {
      idCategorie : this.state.model.idCategorie,
      nomCategorie : this.state.model.nomCategorie
    }
    await this.props.modifierCategorie(data);
    this.handleClose();
  }
}
  render = () => {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                  <Form.Group controlId="id_categorie" >
                      <Form.Label>ID Categorie</Form.Label>
                      <Form.Control type="text" value={this.state.model.idCategorie}
                      onChange={ e => this.setValue(e, 'idCategorie') } placeholder="Numero de la Categorie" disabled/>
                       <Form.Text className="text-muted">
                    {this.state.erreur.idCategorie}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="nom_categorie">
                      <Form.Label>Categorie</Form.Label>
                      <Form.Control type="text" value={this.state.model.nomCategorie} 
                      onChange={ e => this.setValue(e, 'nomCategorie') } placeholder="Nom de la Categorie" />
                      <Form.Text className="text-muted">
                    {this.state.erreur.nomCategorie}
                    </Form.Text>
                  </Form.Group>
                  
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.update}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalModification;