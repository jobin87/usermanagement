// Loading is true by default. Use case: When needed to call an api on page load.
export const basicInitialState:  basicInitialStateProps  = {
  data: null,
  loading: false,
  error: {},
};
export const basicInitialArrayState:  basicInitialStateProps  = {
  data: [],
  loading: false,
  error: {},
};

export interface basicInitialStateProps {
  data: null | object | any;
  loading: boolean;
  error: null | object;
}

