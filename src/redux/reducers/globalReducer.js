const globalState = {
    idBuku: 0
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case 'ADD_IDBUKU':
            return {
                ...state,
                idBuku: action.newValue 
            }
        default:
            return state;
    }
    // return state;
}

export default rootReducer;