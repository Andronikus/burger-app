import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients).map(
        ingredientKey => { 
            return [...Array(props.ingredients[ingredientKey])].map(
                (_,index) => {return <BurgerIngredient key={ingredientKey+index} type={ingredientKey}></BurgerIngredient>}
            )
        }
    )

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'></BurgerIngredient>
        </div>
    );
}

export default burger;