import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalSupprimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
                idCategorie : "",
                nomCategorie : ""
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
        await this.props.supprimerCategorie(this.state.model.idCategorie);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Voulez vous vraiment supprimer la categorie :</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Numero : </td>
                                <td>{this.state.model.idCategorie}</td>
                            </tr>
                            <tr>
                                <td>
                                    Nom :
                                </td>
                                <td>{this.state.model.nomCategorie}</td>
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