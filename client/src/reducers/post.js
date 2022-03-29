import * as types from "../actions/types"



const initialState = {
    posts:[],
    currentPost:null
}


const postReducer = (state = initialState,action)=>{
    switch (action.type) {
       

            case types.FETCH_SINGLE_POST:
                return {
                    ...state,
                    currentPost:action.payload
                }
                break;
    
            case types.CREATE_POST:
                return {
                    ...state,
                    posts:[...state.posts,action.payload]
                }
                break;
        
        default:
            return {
                ...state
            }
                
            
            break;
    }
}

export default postReducer