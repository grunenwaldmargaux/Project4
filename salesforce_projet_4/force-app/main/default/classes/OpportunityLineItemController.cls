public with sharing class OpportunityLineItemController {

    @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getProducts(Id opportunityId) {
        return [
            SELECT Id, Product2.Name, Quantity, UnitPrice, TotalPrice, 
                    Product2.QuantityInStock__c
            FROM OpportunityLineItem
            WHERE OpportunityId = :opportunityId
        ];
    }
}

