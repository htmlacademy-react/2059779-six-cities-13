import { createAsyncThunk } from '@reduxjs/toolkit';
import { TReview, TReviewData } from '../../types/review';
import { TThunkAPI } from '../../types/state';
import { APIRoute, ActionName } from '../../const';

export const fetchReviews = createAsyncThunk<TReview, TReview['id'], TThunkAPI>(
	`${ActionName.Reviews}/fetchReviews`,
	async (offerId, { extra: api }) => {
		const { data } = await api.get<TReview>(`${APIRoute.Reviews}/${offerId}`);

		return data;
	},
);

export const postReview = createAsyncThunk<TReview, {
	reviewData: TReviewData;
	offerId: TReview['id'];
}, TThunkAPI>(
	`${ActionName.Reviews}/postReview`,
	async ({ reviewData, offerId }, { extra: api }) => {
		const { data } = await api.post<TReview>(`${APIRoute.Reviews}/${offerId}`,
			reviewData
		);

		return data;
	}
);
