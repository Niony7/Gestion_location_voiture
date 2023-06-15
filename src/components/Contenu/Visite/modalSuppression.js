import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
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
        await this.props.supprimerVisite(this.state.model.idVisiteTechnique);
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
                                <td>
                                    Voiture :
                                </td>
                                <td>{this.state.model.idVoiture}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date debut :
                                </td>
                                <td>{this.state.model.dateDebutVisiteTechnique}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date fin :
                                </td>
                                <td>{this.state.model.dateFinVisiteTechnique}</td>
                            </tr>
                            <tr>
                                <td>
                                    Date payement :
                                </td>
                                <td>{this.state.model.datePayementVisiteTechnique}</td>
                            </tr>
                            <tr>
                                <td>
                                    Cout :
                                </td>
                                <td>{this.state.model.coutVisiteTechnique}</td>
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