import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, ActionName } from '../../const';
import { TReview } from '../../types/review';
import { fetchReviews, postReview } from '../thunks/reviews';

type TInitialState = {
	reviews: TReview[];
	reviewsStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
	postReviewStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TInitialState = {
	reviews: [],
	reviewsStatus: RequestStatus.Idle,
	postReviewStatus: RequestStatus.Idle
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
			}).
			addCase(postReview.rejected, (state) => {
				state.postReviewStatus = RequestStatus.Failed;
			}).
			addCase(postReview.pending, (state) => {
				state.postReviewStatus = RequestStatus.Pending;
			}).
			addCase(postReview.fulfilled, (state) => {
				state.postReviewStatus = RequestStatus.Success;
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

export const reviewsActions = { ...reviewsSlice.actions, fetchReviews, postReview };
