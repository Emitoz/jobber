import Axios from 'axios';
import { useReducer, useEffect } from 'react';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer (state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] };
            break;

        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs };
            break;

        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.errors, jobs: [] };
            break;

        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
    
        default:
            break;
    }
}

export default function useFetchJobs(params, page){

    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        const cancelToken1 = Axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        Axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
            })
            .then((res) => {
                dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
            })
            .catch((err) => {
                if(Axios.isCancel(err)) return
                dispatch({ type: ACTIONS.ERROR, payload: { errors: err } });
            });

            const cancelToken2 = Axios.CancelToken.source();
            Axios.get(BASE_URL, {
                cancelToken: cancelToken2.token,
                params: { markdown: true, page: page + 1, ...params }
                })
                .then((res) => {
                    dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } });
                })
                .catch((err) => {
                    if(Axios.isCancel(err)) return
                    dispatch({ type: ACTIONS.ERROR, payload: { errors: err } });
                });
        
        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page]);

    return state;
}