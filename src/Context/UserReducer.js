export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'FINANCE_REQUESTS':
      return {
        ...state,
        FinanceReq: action.payload
      };
    case 'FINANCE_VIEW_REQUEST':
      return {
        ...state,
        FinanceViewReq: action.payload
      };
    default:
      return null;
  }
};
