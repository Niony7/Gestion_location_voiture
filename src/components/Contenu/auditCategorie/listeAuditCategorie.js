import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeAssurance extends Component {
    constructor (props) {
        super(props);

    }
     render = () => {
        console.log(this.modal)
        const { auditCategories, recherche } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Id Categorie</th>
                    <th>Dernier Nom</th>
                    <th>Date Change</th>
                    <th>Action</th>
                    <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        auditCategories.filter( (auditCategorie)=> {
                            if(recherche === ''){
                                return auditCategorie;
                            }else if(auditCategorie.voiture.toLowerCase().includes(recherche) ||
                            auditCategorie.lastNomCategorie .toLowerCase().includes(recherche)){
                                return auditCategorie;
                            }
                        }).map( (auditCategorie, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{auditCategorie.idCategorie }</td>
                                <td>{auditCategorie.lastNomCategorie}</td>
                                <td>{auditCategorie.changedon }</td>
                                <td>{auditCategorie.action }</td>
                                <td>{auditCategorie.username }</td>
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