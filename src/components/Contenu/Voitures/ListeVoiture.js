import React, { Component } from 'react';
import { Table} from 'react-bootstrap';
import ModalVoir from './modalVoir';
import ModalSuppression from './modalSuppression';
import {Link} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi'
import {ButtonIconSupprimer, ButtonIconVoir, LinkIconModifier} from '../../Button-icon/ButtonIcon'

class ListeVoiture extends Component {
    constructor(props){
        super(props);
        this.refModalVoir = React.createRef(null);
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null)
    }
    afficheModalVoir = (voiture) => {
        this.refModalVoir.current.changeValue(voiture);
        this.refModalVoir.current.handleShow();
    }
    afficheModalModification = (voiture) => {
        this.refModalModification.current.handleShow();
        this.refModalModification.current.changeValue(voiture);
    }
    afficheModalSuppresstion = (voiture) => {
        this.refModalSuppression.current.changeValue(voiture);
        this.refModalSuppression.current.handleShow();
    }
    render () {
        const {voitures, recherche, radioValue} = this.props;
        return (
            <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Marque</th>
                        <th>Model</th>
                        <th>matriculation</th>
                        <th>Boite Vitesse</th>
                        <th>Source Energie</th>
                        <th>Puissance</th>
                        <th>Nb Place</th>
                        <th>Prix location</th>
                        <th>Etat</th>
                        <th>Disponibilite</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        voitures.filter( (voiture) => {
                            if(radioValue === 'tout'){
                                if(recherche === "") {
                                    return voiture;
                                }else if(voiture.immatriculation.toLowerCase().includes(recherche.toLowerCase())
                                || voiture.marque.toLowerCase().includes(recherche.toLowerCase())
                                || voiture.model.toLowerCase().includes(recherche.toLowerCase())){
                                    return voiture
                                }
                            }else if(radioValue === 'disponible'){
                                if(recherche === "" && voiture.disponibilite===1) {
                                    return voiture;
                                }else if((voiture.immatriculation.toLowerCase().includes(recherche.toLowerCase()) && voiture.disponibilite===1)
                                || (voiture.marque.toLowerCase().includes(recherche.toLowerCase())  && voiture.disponibilite===1)
                                || (voiture.model.toLowerCase().includes(recherche.toLowerCase()) && voiture.disponibilite===1)){
                                    return voiture
                                }
                            }
                            else if(radioValue === 'nonDisponible'){
                                if(recherche === "" && voiture.disponibilite===0) {
                                    return voiture;
                                }else if((voiture.immatriculation.toLowerCase().includes(recherche.toLowerCase()) && voiture.disponibilite===0)
                                || (voiture.marque.toLowerCase().includes(recherche.toLowerCase())  && voiture.disponibilite===0)
                                || (voiture.model.toLowerCase().includes(recherche.toLowerCase()) && voiture.disponibilite===0)){
                                    return voiture
                                }
                            }
                            
                        }).map( (voiture, index) => (
                            <tr key={voiture.idVoiture}>
                                <td>{index+1}</td>
                                <td>{voiture.marque}</td>
                                <td>{voiture.model}</td>
                                <td>{voiture.immatriculation}</td>
                                <td>{voiture.boiteVitesse}</td>
                                <td>{voiture.sourceEnergie}</td>
                                <td>{voiture.puissance}</td>
                                <td>{voiture.nombrePlace}</td>
                                <td>{voiture.prixLocationL+' Ar'}</td>
                                <td>{voiture.etat}</td>
                                <td>{(voiture.disponibilite)?'oui':'non'}</td>
                                <td>
                                
                                    <ButtonIconVoir onClick={ e => this.afficheModalVoir(voiture)}/>
                                    <LinkIconModifier to={"/voiture/modifier/"+voiture.idVoiture}/>
                                    <ButtonIconSupprimer onClick={ e => this.afficheModalSuppresstion(voiture)}/>
                                </td>
                            </tr>
                         ))
                    }
                   
                </tbody>
            </Table>
            <ModalVoir ref={this.refModalVoir}/>
            <ModalSuppression ref={this.refModalSuppression} supprimerVoiture={this.props.supprimerVoiture}/>
            </>
        )
    }
}

export default ListeVoiture;