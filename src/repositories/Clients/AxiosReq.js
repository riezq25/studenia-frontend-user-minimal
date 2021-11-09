import Client from './AxiosClient';
import Response from "./AxiosRes";

export default {
    get(resource) {
        return Client.get(`${resource}`).then(res => {
            return Response(res)
        }).catch((error) => {
            if (error.response) {
                return Response(error.response.data)
            }
        });
    },
    post(resource, payload) {
        return Client.post(`${resource}`, payload).then(res => {
            return Response(res)
        }).catch((error) => {
            if (error.response) {
                return Response(error.response.data)
            }
        });
    },
    update(resource, payload) {
        return Client.put(`${resource}`, payload).then(res => {
           return Response(res)
        }).catch((error) => {
            if (error.response) {
                return Response(error.response.data)
            }
        });
    },
    delete(resource) {
        return Client.delete(`${resource}`).then(res => {
            return Response(res)
        }).catch((error) => {
            if (error.response) {
                return Response(error.response.data)
            }
        });
    },
};