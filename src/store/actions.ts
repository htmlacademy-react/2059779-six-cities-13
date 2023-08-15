import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';
import { ActionName } from '../const';

export const selectCity = createAction<string>('selectCity');
export const getOffers = createAction(`${ActionName.Offers}/getOffers`);
export const loadOffers = createAction<Offer[]>(`${ActionName.Offers}/loadOffers`);
