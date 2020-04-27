class DataStore {

    constructor() {
        if (DataStore.instance) {
            return DataStore.instance;
        }

        this._locations = {};
        this._events = {};
        this._organizations = {};

        DataStore.instance = this;
    }

    get locations() {
        return this._locations;
    }

    get events() {
        return this._events;
    }

    get organizations() {
        return this._organizations;
    }
}

export default DataStore;
