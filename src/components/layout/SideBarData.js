import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
export const sideBarData = [

    {
        title : 'Voiture',
        path : '/voiture',
        icon : <AiIcons.AiFillCar/>,
        cName : 'nav-text'
    },
    {
        title : 'Location',
        path : '/location',
        icon : <FaIcons.FaHandshake/>,
        cName : 'nav-text'
    },
    {
        title : 'Categorie',
        path : '/categorie',
        icon : <BsIcons.BsBoundingBox/>,
        cName : 'nav-text'
    },
    {
        title : 'Assurance',
        path : '/assurance',
        icon : <AiIcons.AiTwotoneInsurance
        />,
        cName : 'nav-text'
    },
    {
        title : 'Visite Technique',
        path : '/visiteTechnique',
        icon : <MdIcons.MdVerifiedUser/>,
        cName : 'nav-text'
    },
    {
        title : 'Reparation',
        path : '/reparation',
        icon : <GiIcons.GiAutoRepair
        />,
        cName : 'nav-text'
    },
    {
        title : 'Client',
        path : '/client',
        icon : <FaIcons.FaUser/>,
        cName : 'nav-text'
    },
    {
        title : 'Interface Client',
        path : '/interfaceClient',
        icon : <AiIcons.AiFillCar/>,
        cName : 'nav-text'
    },
]

export const sideBarDataAdmin = [
    {
        title : 'Employer',
        path : '/employer',
        icon : <FaIcons.FaUserShield/>,
        cName : 'nav-text'
    },
    {
        title : 'Bilan',
        path : '/bilan',
        icon : <BiIcons.BiStats/>,
        cName : 'nav-text'
    },
    {
        title : 'Histogramme',
        path : '/histogramme',
        icon : <RiIcons.RiBarChartHorizontalFill/>,
        cName : 'nav-text'
    },
    {
        title : 'Audit Categorie',
        path : '/auditCategorie',
        icon : <RiIcons.RiBarChartHorizontalFill/>,
        cName : 'nav-text'
    },
    {
        title : 'Audit Voiture',
        path : '/auditVoiture',
        icon : <RiIcons.RiBarChartHorizontalFill/>,
        cName : 'nav-text'
    },
    {
        title : 'Audit Location',
        path : '/auditLocation',
        icon : <RiIcons.RiBarChartHorizontalFill/>,
        cName : 'nav-text'
    },
    {
        title : 'Parametre',
        path : '/parametre',
        icon : <BsIcons.BsGear/>,
        cName : 'nav-text'
    }    
]