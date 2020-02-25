export interface Button {
    text?: string;
    url?: string;
    update: Boolean;
}

export interface Item {
    id: string,
    description: string,
    dummyProperty1: string,
    dummyProperty2: string,
    dummyProperty3: string,
    dummyProperty4: string,
    dummyProperty5: string,
    dummyProperty6: string,
    dummyProperty7: string,
    dummyProperty8: string,
    dummyProperty9: string,
    dummyProperty10: string,
    dummyProperty11: DummyProperty,
    formula: FormulaItem
}

export class InvalidItem {
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

export interface DummyProperty {
    dummySubproperty1: string,
    dummySubproperty2: string,
    dummySubproperty3: string,
    dummySubproperty4: string
}

export interface FormulaItem {
    formulaItem: Ingredient[]
}

export interface Ingredient {
    dummyIngredientProperty1: string,
    dummyIngredientProperty2: string,
    id: string,
    description: string,
    dummyIngredientProperty3: string,
    dummyIngredientProperty4: string,
    dummyIngredientProperty5: string,
    dummyIngredientProperty6: boolean | string,
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