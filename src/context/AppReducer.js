export default (state, action) => {
  switch(action.type) {
    case 'GET_GROCERY_ITEMS':
      return {
        ...state,
        groceryItems: action.payload,
        isLoading: false,
        isError: false,
      }
    case 'DELETE_GROCERY_ITEM':
      return {
        ...state,
        groceryItems: state.groceryItems.filter(groceryItem => groceryItem.id !== action.payload),
        isLoading: false,
        isError: false,
      }
    case 'ADD_GROCERY_ITEM':
      return {
        ...state,
        groceryItems: [action.payload, ...state.groceryItems],
        isLoading: false,
        isError: false,
      }
    case 'UPDATE_GROCERY_ITEM':
      const updatedComponent = action.payload;
      const updatedComponents = state.groceryItems.filter(groceryItem => groceryItem.id !== updatedComponent.id);
      updatedComponents.unshift(updatedComponent);
      return {
        ...state,
        groceryItems: updatedComponents,
        isLoading: false,
        isError: false,
      }
    case 'FILTER_GROCERY_ITEMS':
      return {
        ...state,
        groceryItems: action.payload,
        isLoading: false,
        isError: false,
      }
    case 'SEARCH_GROCERY_ITEM':
      return {
        ...state,
        groceryItems: action.payload,
        isLoading: false,
        isError: false,
      }
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modalState: action.payload
      }
    case 'ERROR':
      return {
        ...state,
        isError: action.payload
      }
    default:
      return state;
  }
}