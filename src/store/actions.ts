import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';

export const selectCity = createAction<string>('city/selectCity');
export const getOffers = createAction('offers/getOffers');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
