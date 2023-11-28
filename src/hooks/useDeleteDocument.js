import { useEffect, useReducer, useState } from "react"
import {doc, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase/config'



const initialState = {
    loading: null,
    error: null,
}

const deleteReduce = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading:true, error: null}
        case 'DELETED_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useDeleteDocuments = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReduce, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async(id) => {
        
        checkCancelBeforeDispatch({
            type:'LOADING',
         })

        try {
           const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelBeforeDispatch({
                type:'DELETED_DOC',
                payload: deletedDocument
             })

        } catch (error) {
            checkCancelBeforeDispatch({
                type:'ERROR',
                payload: error.message
             })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])

    return {deleteDocument, response}
}
