import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
                idClient: "",
                nom : "",
                email : "",
                telephone : "",
                adresse : ""
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
        await this.props.supprimerClient(this.state.model.id_client);
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
                                    Nom :
                                </td>
                                <td>{this.state.model.nom}</td>
                            </tr>
                            <tr>
                                <td>
                                    Email :
                                </td>
                                <td>{this.state.model.email}</td>
                            </tr>
                            <tr>
                                <td>
                                    Telephone :
                                </td>
                                <td>{this.state.model.telephone}</td>
                            </tr>
                            <tr>
                                <td>
                                    Adresse :
                                </td>
                                <td>{this.state.model.adresse}</td>
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