// On importe la classe LightningElement (base pour tout composant LWC)
// et api, qui nous permet d'utiliser les propriétés publiques comme recordId
import { LightningElement, api, wire } from 'lwc';

// On importe la méthode Apex getProducts depuis notre classe Apex
import getProducts from '@salesforce/apex/OpportunityLineItemController.getProducts';

export default class OpportunityProducts extends LightningElement {
    // On récupère automatiquement l'ID de l'enregistrement (opportunité) sur lequel le composant est placé
    @api recordId;

    // On prépare une liste vide qui contiendra les produits
    products = [];

    // Cette propriété nous permettra de savoir s'il y a des produits ou non
    hasProducts = false;

    // On appelle la méthode Apex automatiquement avec @wire dès que recordId est disponible
    @wire(getProducts, { opportunityId: '$recordId' })
    wiredProducts({ data, error }) {
        // Si on reçoit bien les données depuis Apex
        if (data) {
            this.products = data;

            // On vérifie si la liste est vide ou non
            this.hasProducts = data.length > 0;
        } 
        // Si une erreur se produit pendant l'appel Apex
        else if (error) {
            console.error('Erreur lors de la récupération des produits : ', error);
            this.hasProducts = false;
        }
    }
}
