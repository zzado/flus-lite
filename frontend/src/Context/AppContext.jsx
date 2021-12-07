import { useMemo, createContext, useReducer } from 'react';


export const AppContext = createContext();

const initialState = {
  projectList : [],
  currentProject : {},
  currentUser : {},
  currentArea : '',
};

const contextReducer = (state, action) => {
  // console.log(action);
  // console.log(state);
  const newState = { projectList : state.projectList, currentProject : state.currentProject, currentUser : state.currentUser, currentArea : state.currentArea,};
  switch (action.type) {
    case 'setProjectList':
      newState.projectList = action.value;
      return newState;
    case 'setProject':
      newState.currentProject = newState.projectList.find( (e) => e.id === parseInt(action.value))
      return newState;
    case 'setUser':
      newState.currentUser = action.value;
      return newState;
    case 'setArea':
      newState.currentArea = action.value;
      return newState;
  }
};

export const AppContextProvider = ({children}) => {
  const [contextState, contextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ contextState, contextDispatch }),[contextState, contextDispatch]);
  
  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};