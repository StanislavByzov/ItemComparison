export interface Button {
    text?: string;
    url?: string;
    update: Boolean;
}

export interface Item {
    id: string,
    Alternate: string,
    Version: string,
    Status: string,
    AuthorizationGroup: string,
    PlantCode: string,
    ValidFrom: string,
    ValidTo: string,
    description: string,
    Type: string,
    ValidityArea: string,
    SpecGroup: string,
    CharacteristicValues: TFC,
    formula: formulaItem
}

export class InvalidItem {
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

export interface TFC {
    formulationOwnerCategory: string,
    formulationType: string,
    formulationClass: string,
    formulationSubClass: string
}

export interface formulaItem {
    formulaItem: Ingredient[]
}

export interface Ingredient {
    ItemNumber: string,
    ItemType: string,
    id: string,
    description: string,
    ItemMaterial: string,
    ManualPrice: string,
    ValidityArea: string,
    BalancingIngredient: boolean | string,
    mass: {
        kilograms: string,
        percentage: string
    }
}

export interface StructuredData extends Array<ComparatorID | (Item | InvalidItem)[]> {

}

export interface ComparatorID {
    comparator: string
}

export interface SimplifiedStructuredData {
    comparatorItem: SimplifiedItem,
    itemsToCompare: SimplifiedItem[],
    invalidItems: InvalidItem[],
    ingredients: SimplifiedIngredients
}

export type SimplifiedItem = {
    id: string,
    description: string
} & {
    [prop: string]: string
}

export type SimplifiedIngredients = {
    [prop: string]: IngredientDetails
}

export interface IngredientDetails {
    description: string,
    percentage: string
}