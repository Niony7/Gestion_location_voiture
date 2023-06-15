import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import { BsFillKanbanFill } from 'react-icons/bs';
export default class Liste extends Component {
    render = () => {
        const {bilans, recherche} = this.props;
        return(
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Immatriculation</th>
                        <th>Nb  Location</th>
                        <th>cumul Jour</th>
                        <th>Recette</th>
                        <th>Assurance</th>
                        <th>Reparation</th>
                        <th>VisiteTechnique</th>
                        <th>Benefice</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bilans.filter(bilan => {
                            if(recherche == ""){
                                return bilan
                            }else if(bilan.immatriculation.toLowerCase().includes(recherche.toLowerCase())){
                                return bilan;
                            }
                        }).map((bilan, index)=> {
                            return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{bilan.immatriculation}</td>
                                <td>{bilan.nombreLocation?bilan.nombreLocation:0}</td>
                                <td>{bilan.cumulJour?bilan.cumulJour:0}</td>
                                <td>{bilan.recette?bilan.recette:0} Ar</td>
                                <td>{bilan.assurance?bilan.assurance:0} Ar</td>
                                <td>{bilan.reparation?bilan.reparation:0} Ar</td>
                                <td>{bilan.visiteTechnique?bilan.visiteTechnique:0} Ar</td>
                                <td>{bilan.benefice} Ar</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
}