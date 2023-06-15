import { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class ModalFinLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            model : {
              idLocation : "",
              date_debut : '',
              date_fin : "",
              idVoiture : "",
              idVlient : "",
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

    payerLocation = async () => {
        await this.props.payerLocation(this.state.model.idLocation);
        this.handleClose();
    }
    render = () => {
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Payement location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Confirmation du payement de location : </h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Client :
                                </td>
                                <td>{this.state.model.client}</td>
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
                            <tr>
                                <td>
                                    Prix Location Journalier : 
                                </td>
                                <td>{this.state.model.coutLocationJournalier + ' Ar'}</td>
                            </tr>
                            <tr>
                                <td>
                                    Prix Location Finale : 
                                </td>
                                <td>{this.state.model.coutFinalLocation+ ' Ar'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                   Fermer
                </Button>
                <Button variant="primary" onClick={this.payerLocation}>
                    Confirmer Payement
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalFinLocation;