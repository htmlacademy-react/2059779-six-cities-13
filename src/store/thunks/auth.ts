import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TLoginData } from '../../types/user';
import { TThunkAPI } from '../../types/state';
import { APIRoute, ActionName } from '../../const';
import { saveToken, dropToken } from '../../services/token';

export const checkAuth = createAsyncThunk<TUser, undefined, TThunkAPI>(
	`${ActionName.User}/checkAuth`,
	async (_arg, { extra: api }) => {
		const { data } = await api.get<TUser>(APIRoute.Login);

		return data;
	},
);

export const login = createAsyncThunk<TUser, TLoginData, TThunkAPI>(
	`${ActionName.User}/login`,
	async (body, { extra: api }) => {
		const { data } = await api.post<TUser>(APIRoute.Login, body);
		saveToken(data.token);
		return data;
	},
);

export const logout = createAsyncThunk<unknown, undefined, TThunkAPI>(
	`${ActionName.User}/logout`,
	async (_arg, { extra: api }) => {
		await api.delete<string>(APIRoute.Logout);
		dropToken();
	},
);
