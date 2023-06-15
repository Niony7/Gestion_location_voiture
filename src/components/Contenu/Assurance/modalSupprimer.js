import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
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
        await this.props.supprimerAssurance(this.state.model.idAssurance);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Voulez vous vraiment supprimer l' assurance :</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Numero : </td>
                                <td>{this.state.model.idAssurance}</td>
                            </tr>
                            <tr>
                                <td>
                                    Agence :
                                </td>
                                <td>{this.state.model.agence}</td>
                            </tr>
                            <tr>
                                <td>
                                    Voiture :
                                </td>
                                <td>{this.state.model.voiture}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date debut :
                                </td>
                                <td>{this.state.model.dateDebutAssurance}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date fin :
                                </td>
                                <td>{this.state.model.dateFinAssurance}</td>
                            </tr>
                            <tr>
                                <td>
                                    Cout :
                                </td>
                                <td>{this.state.model.coutAssurance}</td>
                            </tr>
                            <tr>
                                <td>
                                    Payement :
                                </td>
                                <td>{this.state.model.datePayementAssurance}</td>
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