import Client from './Clients/AxiosClient';
const resource = '/api/v1/user/tryout';

export default {
    get(jenis, kategori) {
        return Client.get(`${resource}/${jenis}/${kategori}`);
    },
    show(id) {
        return Client.get(`${resource}/detail/${id}`);
    },
    // create(payload) {
    //     return Client.post(`${resource}`, payload);
    // },
    // update(payload, id) {
    //     return Client.post(`${resource}/${id}?_method=PUT`, payload);
    // },
    // delete(id) {
    //     return Client.delete(`${resource}/${id}`)
    // },

};