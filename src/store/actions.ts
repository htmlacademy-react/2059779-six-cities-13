import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../mocks/offers';
import { ActionName } from '../const';

export const selectCity = createAction<string>('selectCity');
export const getOffers = createAction(`${ActionName.Offers}/getOffers`);
export const loadOffers = createAction<TOffer[]>(`${ActionName.Offers}/loadOffers`);
