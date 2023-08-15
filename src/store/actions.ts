import { createAction } from '@reduxjs/toolkit';
import { ActionName } from '../const';

export const selectCity = createAction<string>('selectCity');
export const dropOffer = createAction<undefined>(`${ActionName.Offer}/dropOffer`);
