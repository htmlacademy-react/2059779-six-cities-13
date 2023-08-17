import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, ActionName } from '../../const';
import { TReview } from '../../types/review';
import { fetchReviews } from '../thunks/reviews';

type TInitialState = {
	reviews: TReview[];
	reviewsStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TInitialState = {
	reviews: [],
	reviewsStatus: RequestStatus.Idle,
};

export const reviewsSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(fetchReviews.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.reviewsStatus = RequestStatus.Success;
			}).
			addCase(fetchReviews.pending, (state) => {
				state.reviewsStatus = RequestStatus.Pending;
			}).
			addCase(fetchReviews.rejected, (state) => {
				state.reviewsStatus = RequestStatus.Failed;
			});
	},
	initialState,
	name: ActionName.Reviews,
	reducers: {
		clear(state) {
			state.reviews = [];
			state.reviewsStatus = RequestStatus.Idle;
		}
	}
});

export const reviewsActions = { ...reviewsSlice.actions, fetchReviews };
