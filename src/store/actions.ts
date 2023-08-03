import { createAction } from '@reduxjs/toolkit';

export const selectCity = createAction<string>('city/selectCity');
export const getOffers = createAction('offers/getOffers');
