import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './modalModification';
import ModalSuppression from './modalSuppression';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeReparation extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentReparation : {
            idReparation: "",
            dateReparation : Date.now(),
            description : "",
            idVoiture : "",
            coutReparation : 0,
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null);
    }
    afficheModalModification = ( reparation) => {
        this.refModalModification.current.changeValue(reparation);
        this.refModalModification.current.handleShow();
    }
    afficheModalSuppression = (reparation) => {
        this.refModalSuppression.current.changeValue(reparation);
        this.refModalSuppression.current.handleShow();
    }
     render = () => {
        console.log(this.modal)
        const { reparations } = this.props;
        return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Voiture</th>
                    <th>Cout</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reparations.map( (reparation,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{reparation.dateReparation}</td>
                                <td>{reparation.description}</td>
                                <td>{reparation.voiture}</td>
                                <td>{reparation.coutReparationL + ' Ar'}</td>
                                <td>
                                    <ButtonIconModifier
                                    onClick={ e => this.afficheModalModification(reparation)}/>
                                    <ButtonIconSupprimer onClick={ e => this.afficheModalSuppression(reparation)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierReparation={this.props.modifierReparation}/>
            <ModalSuppression ref={this.refModalSuppression} supprimerReparation={this.props.supprimerReparation}/>
        </>
        )
    }
}

//