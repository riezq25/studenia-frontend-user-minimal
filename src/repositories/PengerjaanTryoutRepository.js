import Client from './Clients/AxiosClient';
const resource = '/api/v1/user/pengerjaan/tryout';

export default {
    request(id) {
        return Client.get(`${resource}/request/${id}`);
    },
    kerjakan(id) {
        return Client.get(`${resource}/kerjakan/${id}`);
    },
    show(id) {
        return Client.get(`${resource}/detail/${id}`);
    },
    simpanJawaban(id, payload) {
        return Client.post(`${resource}/simpan/${id}`, payload);
    },
    akhiriSesi(id, payload) {
        return Client.post(`${resource}/end/${id}`, payload);
    }
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