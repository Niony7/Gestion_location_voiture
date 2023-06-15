import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
                idReparation: "",
                dateReparation : '',
                description : "",
                idVoiture : "",
                coutReparation : 0,
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
        await this.props.supprimerReparation(this.state.model.idReparation);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Voulez vous vraiment supprimer la reparation :</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Date : </td>
                                <td>{this.state.model.dateReparation}</td>
                            </tr>
                            <tr>
                                <td>
                                    Description :
                                </td>
                                <td>{this.state.model.description}</td>
                            </tr>
                            <tr>
                                <td>
                                    Voiture :
                                </td>
                                <td>{this.state.model.idVoiture}</td>
                            </tr>
                            <tr>
                                <td>
                                    Cout :
                                </td>
                                <td>{this.state.model.coutReparation}</td>
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