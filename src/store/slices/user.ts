import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, ActionName } from '../../const';
import { TUser, TAuthStatus } from '../../types/user';
import { checkAuth, login, logout } from '../thunks/auth';

type TInitialState = {
	user: TUser | null;
	authorizationStatus: TAuthStatus;
}

const initialState: TInitialState = {
	user: null,
	authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authorizationStatus = AuthorizationStatus.Auth;
			}).
			addCase(checkAuth.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			}).
			addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authorizationStatus = AuthorizationStatus.Auth;
			}).
			addCase(login.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			}).
			addCase(logout.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			});
	},
	initialState,
	name: ActionName.User,
	reducers: {
		clear(state) {
			state.user = null;
			state.authorizationStatus = AuthorizationStatus.NoAuth;
		}
	}
});

export const userActions = { ...userSlice.actions, checkAuth, login, logout };
