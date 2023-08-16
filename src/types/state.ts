import { AxiosInstance } from 'axios';
import { store } from '../store/index.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TThunkAPI = {
	dispatch: AppDispatch;
	extra: AxiosInstance;
	state: State;
}
