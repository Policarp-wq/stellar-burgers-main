import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

interface IBuilderState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IBuilderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
        if (action.payload.type === 'bun') 
            return;
         state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>){
        const ingredient = {...action.payload, id: uuidv4()};
        if (action.payload.type === 'bun'){
            state.constructorItems.bun = ingredient;
            return;
        }
        state.constructorItems.ingredients.push(ingredient);
    },
    deleteIngredient(
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = null;
        return;
      }
      state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (item) => item.id !== action.payload.id
          );
    },
    clearBuilder(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
export const selectBun = (state: RootState) =>
  state.burgerConstructor.constructorItems.bun;
export const selectConstructorTotalCount = (state: RootState) =>
  state.burgerConstructor.constructorItems.ingredients.length;

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  clearBuilder
} = constructorSlice.actions;

export default constructorSlice.reducer;
