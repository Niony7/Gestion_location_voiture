import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './ModalModif'
import ModalSuppression from './modalSuppression';
import ModalFinLocation from './modalFinLocation';
import ModalPayementLocation from './modalPayeLocation';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd, ButtonIconPaye} from '../../Button-icon/ButtonIcon';
export default class ListeAssurance extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentAssurance : {
            id_location : "",
            date_debut : Date.now(),
            date_fin : "",
            id_voiture : "",
            id_client : "",
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null);
        this.refModalFinLocation = React.createRef(null);
        this.refModalPayementLocation = React.createRef(null)
    }

    afficheModalModification = (location) => {
        this.refModalModification.current.changeValue(location); 
        this.refModalModification.current.handleShow();
    }
    afficheModalSuppression = (location) => {
        this.refModalSuppression.current.changeValue(location);
        this.refModalSuppression.current.handleShow();
    }
    afficheModalFinLocation = (location) => {
        this.refModalFinLocation.current.changeValue(location);
        this.refModalFinLocation.current.handleShow();
    }
    afficheModalPayementLocation = (location) => {
        this.refModalPayementLocation.current.changeValue(location);
        this.refModalPayementLocation.current.handleShow();
    }
     render = () => {
        console.log(this.modal)
        const { locations, recherche, radioValue } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Voiture</th>
                    <th>Debut</th>
                    <th>Restitution</th>
                    <th>Nb Jour</th>
                    <th>Prix Journalier</th>
                    <th>Prix Finale</th>
                    <th>Payer</th>
                    <th>Etat</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locations.filter( (location) => {
                            if(radioValue === 'tout'){
                                if(recherche === ''){
                                    return location;
                                }else if( location.client.toLowerCase().includes(recherche) ||
                                location.voiture.toLowerCase().includes(recherche)){
                                    return location;
                                }
                            }else if(radioValue === 'enCour'){
                                if(recherche === '' && location.enCour===1){
                                    return location;
                                }else if( (location.client.toLowerCase().includes(recherche) && location.enCour===1) ||
                                (location.voiture.toLowerCase().includes(recherche) && location.enCour === 1 )){
                                    return location;
                                }
                            }else if(radioValue === 'terminer'){
                                if(recherche === '' && location.enCour===0){
                                    return location;
                                }else if( (location.client.toLowerCase().includes(recherche) && location.enCour===0) ||
                                (location.voiture.toLowerCase().includes(recherche) && location.enCour === 0 )){
                                    return location;
                                }
                            }
                        }).map( (location, index) => (
                            <tr key={location.idLocation}>
                                <td>{index+1}</td>
                                <td>{location.client}</td>
                                <td>{location.voiture}</td>
                                <td>{location.dateDebut}</td>
                                <td>{location.dateRestitution}</td>
                                <td>{location.nombreJour}</td>
                                <td>{location.coutLocationJournalier + ' Ar'}</td>
                                <td>{location.coutFinalLocation+ ' Ar'}</td>
                                <td>{location.payer?'oui':'non'}</td>
                                <td>{location.enCour?'en Cour':'Terminer'}</td>
                                <td>
                                    <ButtonIconModifier  onClick={ e => this.afficheModalModification(location)}/>
                                    <ButtonIconSupprimer  onClick={ e => this.afficheModalSuppression(location)}/>
                                    {location.payer?'':<ButtonIconPaye onClick={ e => this.afficheModalPayementLocation(location)}/>}
                                    {location.enCour?<ButtonIconEnd onClick={ e => this.afficheModalFinLocation(location)}/>:''}      
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierLocation={this.props.modifierLocation}/>
            <ModalSuppression ref={this.refModalSuppression} supprimerLocation={this.props.supprimerLocation}/>
            <ModalFinLocation ref={this.refModalFinLocation} terminerLocation={this.props.terminerLocation}/>
            <ModalPayementLocation ref={this.refModalPayementLocation} payerLocation={this.props.payerLocation}/>
        </>
        )
    }
}

//