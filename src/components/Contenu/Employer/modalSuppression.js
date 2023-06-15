import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
            nom : "",
              prenomEmployer : '',
              idEmployer : "",
              telephoneEmployer : "",
              adresseEmployer : ""
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
        await this.props.supprimerEmployer(this.state.model.idEmployer);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Voulez vous vraiment supprimer l' employer :</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Identifiant : </td>
                                <td>{this.state.model.idEmployer}</td>
                            </tr>
                            <tr>
                                <td>
                                    Nom :
                                </td>
                                <td>{this.state.model.nomEmployer}</td>
                            </tr>
                            <tr>
                                <td>
                                    Prenom :
                                </td>
                                <td>{this.state.model.prenomEmployer}</td>
                            </tr>
                            <tr>
                                <td>
                                    Telephone :
                                </td>
                                <td>{this.state.model.telephoneEmployer}</td>
                            </tr>
                            <tr>
                                <td>
                                    Adresse :
                                </td>
                                <td>{this.state.model.adresseEmployer}</td>
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