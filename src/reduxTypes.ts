export enum Status {
    NONE = 0,
    FETCHING = 1,
    FETCHED = 2,
    REFETCHING = 3,
    ERROR = 4,
}

export type AsyncData<T> = {
    status: Status;
    data: T;
    error?: string | null;
};
