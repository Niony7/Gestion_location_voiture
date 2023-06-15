import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './modalModification'
import ModalSuppression from './modalSuppression';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeVisite extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentVisite : {
            idVisiteTechnique: "",
            dateDebutVisiteTechnique :'',
            dateFinVisiteTechnique : '',
            idVoiture : "",
            coutVisiteTechnique : 0,
            datePayementVisiteTechnique : '',
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null);
    }
    afficheModalModification = ( visite) => {
        this.refModalModification.current.changeValue(visite);
        this.refModalModification.current.handleShow();
    }
    afficheModalSuppression = (visite) => {
        this.refModalSuppression.current.changeValue(visite)
        this.refModalSuppression.current.handleShow();
    }
     render = () => {
        console.log(this.modal)
        const { visites } = this.props;
        return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Voiture</th>
                    <th>Debut</th>
                    <th>Fin</th>
                    <th>Payement</th>
                    <th>Cout</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visites.map( (visite, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{visite.voiture}</td>
                                <td>{visite.dateDebutVisiteTechnique}</td>
                                <td>{visite.dateFinVisiteTechnique}</td>
                                <td>{visite.datePayementVisiteTechnique}</td>
                                <td>{visite.coutVisiteTechniqueL + ' Ar'}</td>
                                <td>
                                    <ButtonIconModifier
                                    onClick={ e => this.afficheModalModification(visite)}/>
                                    <ButtonIconSupprimer variant="danger" onClick={ e => this.afficheModalSuppression(visite)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierVisite={this.props.modifierVisite}/>
            <ModalSuppression ref= {this.refModalSuppression} supprimerVisite={this.props.supprimerVisite}/>
        </>
        )
    }
}

//