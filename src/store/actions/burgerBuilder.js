import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    console.log('action creator- addIngredient');
    return {
        type:actionTypes.ADD_INGREDIENT, 
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    console.log('action creator- removeIngredient');
    return {
        type:actionTypes.REMOVE_INGREDIENT, 
        ingredientName: name
    }
}