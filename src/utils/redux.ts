import { createSlice, createNextState } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

import { Status, AsyncData } from 'reduxTypes';
import { Dispatch } from 'redux';

export const isFetching = (data: AsyncData<any>): boolean => {
    const { status } = data;

    return status === Status.FETCHING || status === Status.REFETCHING;
};

export const createApiSlice = <DataType>(name: string, initialData: DataType) => {
    const initialState: AsyncData<DataType> = {
        status: Status.NONE,
        error: null,
        data: initialData,
    };

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            requestData(state) {
                state.status = state.status === Status.NONE ? Status.FETCHING : Status.REFETCHING;
                state.error = null;
            },
            errorData(state, { payload }) {
                state.status = Status.ERROR;
                state.error = payload;
            },
            recieveData(state, action) {
                state.data = castDraft(action.payload);
                state.status = Status.FETCHED;
                state.error = null;
            },
        },
    });

    const takeCareOfApiStuff = <T extends any[], U extends Promise<any>>(
        func: (state: DataType, ...args: T) => U,
        selector: (s: any) => AsyncData<DataType>,
    ) => (...args: T) => async (dispatch: Dispatch, getState: () => any) => {
        try {
            dispatch(slice.actions.requestData());

            // @ts-ignore
            const data = await createNextState(func)(selector(getState()).data, ...args);

            dispatch(slice.actions.recieveData(data));

            return data;
        } catch (err) {
            dispatch(slice.actions.errorData(err.toString()));
        }
    };

    return {
        ...slice,
        takeCareOfApiStuff,
    };
};
