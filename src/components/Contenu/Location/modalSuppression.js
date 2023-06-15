import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
    constructor(props){
        super(props);
        this.state = {
            model : {
              idLocation : "",
              dateDebut : '',
              dateFin : "",
              idVoiture : "",
              idClient : "",
            },
            show : false
          }
    }
    handleClose = () => {
        this.setState({show:false})
    }
    handleShow = () => {
        this.setState({show:true})
    }
    changeValue = (nextProps) => {
        this.setState({
        model : nextProps
        })
    }

    delete = async () => {
        await this.props.supprimerLocation(this.state.model.idLocation);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Voulez vous vraiment supprimer la location </h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Numero : </td>
                                <td>{this.state.model.idLocation}</td>
                            </tr>
                            <tr>
                                <td>
                                    Client :
                                </td>
                                <td>{this.state.model.idClient}</td>
                            </tr>
                            <tr>
                                <td>
                                    Voiture :
                                </td>
                                <td>{this.state.model.idVoiture}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date debut :
                                </td>
                                <td>{this.state.model.dateDebut}</td>
                            </tr>
                            <tr>
                                <td>
                                    Nombre de Jour :
                                </td>
                                <td>{this.state.model.nombreJour}</td>
                            </tr>
                            <tr>
                                <td>
                                    En Cour : 
                                </td>
                                <td>{this.state.model.enCour?'oui':'non'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                   Fermer
                </Button>
                <Button variant="primary" onClick={this.delete}>
                    Supprimer
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalSupprimer;