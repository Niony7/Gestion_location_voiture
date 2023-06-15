import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeAssurance extends Component {
    constructor (props) {
        super(props);

    }
     render = () => {
        console.log(this.modal)
        const { auditVoitures, recherche } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Id Categorie</th>
                    <th>Dernier lastImmatriculation</th>
                    <th>Dernier Puissance</th>
                    <th>Dernier Nb Place</th>
                    <th>Dernier Prix Location</th>
                    <th>Dernier Marque</th>
                    <th>Dernier Model</th>
                    <th>Date Change</th>
                    <th>Action</th>
                    <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        auditVoitures.filter( (auditVoiture)=> {
                            if(recherche === ''){
                                return auditVoiture;
                            }else if(auditVoiture.lastImmatriculation.toLowerCase().includes(recherche) ||
                            auditVoiture.lastMarque.toLowerCase().includes(recherche)){
                                return auditVoiture;
                            }
                        }).map( (auditVoiture, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{auditVoiture.lastImmatriculation }</td>
                                <td>{auditVoiture.lastCouleur}</td>
                                <td>{auditVoiture.lastPuissance}</td>
                                <td>{auditVoiture.lastNombrePlace}</td>
                                <td>{auditVoiture.lastPrixLocation}</td>
                                <td>{auditVoiture.lastMarque}</td>
                                <td>{auditVoiture.lastModel}</td>
                                <td>{auditVoiture.changedon }</td>
                                <td>{auditVoiture.action }</td>
                                <td>{auditVoiture.username }</td>
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