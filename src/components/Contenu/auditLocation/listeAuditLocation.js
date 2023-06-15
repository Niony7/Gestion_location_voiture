import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeAuditLocation extends Component {
    constructor (props) {
        super(props);

    }
     render = () => {
        console.log(this.modal)
        const { auditLocations, recherche } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Id Location</th>
                    <th>Dernier date debut</th>
                    <th>Dernier nb jour</th>
                    <th>Dernier id voiture</th>
                    <th>Dernier id client</th>
                    <th>Dernier en cour</th>
                    <th>Dernier cout</th>
                    <th>Dernier payer</th>
                    <th>Date Change</th>
                    <th>Action</th>
                    <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        auditLocations.filter( (auditLocation)=> {
                            if(recherche === ''){
                                return auditLocation;
                            }else if(auditLocation.lastIdVoiture.toLowerCase().includes(recherche)){
                                return auditLocation;
                            }
                        }).map( (auditLocation, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{auditLocation.idLocation }</td>
                                <td>{auditLocation.lastDateDebut }</td>
                                <td>{auditLocation.lastNombreJour }</td>
                                <td>{auditLocation.lastIdVoiture }</td>
                                <td>{auditLocation.lastIdClient }</td>
                                <td>{auditLocation.lastEnCour }</td>
                                <td>{auditLocation.lastCoutLocationJournalier }</td>
                                <td>{auditLocation.lastPayer  }</td>
                                <td>{auditLocation.changedon }</td>
                                <td>{auditLocation.action }</td>
                                <td>{auditLocation.username }</td>
                                <td>
                                    <ButtonIconSupprimer/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
        )
    }
}

//