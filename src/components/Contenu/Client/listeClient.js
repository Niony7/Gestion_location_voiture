import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './modalModification';
import ModalSupprimer from './modalSuppression';
import ModalSuppression from './modalSuppression';
import {ButtonIconSupprimer, ButtonIconModifier} from '../../Button-icon/ButtonIcon';
export default class ListeClient extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentClient : {
            id_client: "",
            nom : "",
            email : "",
            motDePasse : "",
            telephone : "",
            adresse : ""
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null);
    }

    afficheModalModification = ( client) => {
        this.refModalModification.current.changeValue(client); 
        this.refModalModification.current.handleShow();
    }
    afficheModalSuppression = (client) => {
        this.refModalSuppression.current.changeValue(client);
        this.refModalSuppression.current.handleShow();
    }
     render = () => {
        console.log(this.modal)
        const { clients, recherche } = this.props;
        return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>nom</th>
                    <th>mail</th>
                    <th>Telephone</th>
                    <th>Adresse</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.filter(client=>{
                            if(recherche == ''){
                                return client;
                            }else if(client.nom.toLowerCase().includes(recherche) || 
                            client.email.toLowerCase().includes(recherche) ||
                            client.telephone.toLowerCase().includes(recherche) ||
                            client.adresse.toLowerCase().includes(recherche)){
                                return client;
                            }
                        }).map( (client, index) => (
                            <tr key={client.id_client}>
                                <td>{index+1}</td>
                                <td>{client.nom}</td>
                                <td>{client.email}</td>
                                <td>{client.telephone}</td>
                                <td>{client.adresse}</td>
                                <td>
                                    <ButtonIconModifier
                                    onClick={ e => this.afficheModalModification(client)}/>
                                    <ButtonIconSupprimer onClick={ e => this.afficheModalSuppression(client)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierClient={this.props.modifierClient} modifierClientAvecMotDePasse={this.props.modifierClientAvecMotDePasse}/>
            <ModalSupprimer ref={this.refModalSuppression} supprimerClient={this.props.supprimerClient}/>
        </>
        )
    }
}

//