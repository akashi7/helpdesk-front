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
    case 'WADEN_REQUESTS':
      return {
        ...state,
        wadenReq: action.payload
      };
    case 'WADEN_VIEW_REQUEST':
      return {
        ...state,
        WadenViewReq: action.payload
      };
    case 'LIBRARY_REQUESTS':
      return {
        ...state,
        libraReq: action.payload
      };
    case 'LIBRARY_VIEW_REQUEST':
      return {
        ...state,
        LibraryViewReq: action.payload
      };
    case 'HOD_REQUESTS':
      return {
        ...state,
        HodReq: action.payload
      };
    case 'HOD_VIEW_REQUEST':
      return {
        ...state,
        HodViewReq: action.payload
      };
    case 'STUDENT_FILES':
      return {
        ...state,
        StudentFiles: action.payload
      };
    case 'STUDENT_FILE':
      return {
        ...state,
        StudentFile: action.payload
      };
    default:
      return null;
  }
};
