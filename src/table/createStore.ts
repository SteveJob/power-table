export interface IStore {
    getState: () => any
    setState: (newState: object) => void
    subscribe: (listener: () => void) => () => void
}

export interface IState {
    selectedRowKeys: any[]
}

export default function createStore(initialState: IState): IStore {
    let state = initialState;
    const listeners: any[] = [];

    function getState(): any {
        return state;
    }
    
    function setState(newState: Partial<IState>) {
        state = { ...state, ...newState };
        listeners.forEach(listener => {
            listener(newState)
        });
    }

    function subscribe(listener: () => void): () => void {
        listeners.push(listener);
        return function unsubcribe() {
            listeners.splice(listeners.indexOf(listener), 1);
        }
    }

    return {
        getState,
        setState,
        subscribe
    }
}