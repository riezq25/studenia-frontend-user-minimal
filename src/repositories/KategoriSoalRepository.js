import Client from './Clients/AxiosClient';
const resource = '/api/v1/kategori-soal';

export default {
    get() {
        return Client.get(`${resource}`);
    },
    show(id) {
        return Client.get(`${resource}/${id}`);
    },
    create(payload) {
        return Client.post(`${resource}`, payload);
    },
    update(payload, id) {
        return Client.post(`${resource}/${id}?_method=PUT`, payload);
    },
    delete(id) {
        return Client.delete(`${resource}/${id}`)
    },

};