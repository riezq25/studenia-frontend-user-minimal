import router from '@/router'
export default {
    namespaced: true,
    state: {
        isUjian: false,
        data: null,
        serverTime: null,
    },
    getters: {

    },
    mutations: {
        setJawaban(state, payload) {
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals[payload.current_index].jawaban = payload.jawaban.toUpperCase()
        },
        setRagu(state, payload) {
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals[payload.current_index].ragu = payload.ragu
        },
        setRagu(state, payload) {
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals[payload.current_index].waktu = payload.waktu
        },
        setSoalState(state, payload){
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals[payload.current_index] = payload.soal
        },
        setPaketMapel(state, payload) {
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals = payload.soals

            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].is_done = true
        },
        simpanSesi(state, pengerjaan) {
            state.data.pengerjaan = pengerjaan
        },
        setServerTime(state, timestamp) {
            state.serverTime = timestamp
        },
        clearState(state) {
            state.isUjian = false
            state.data = null
            state.serverTime = null
        }
    },
    actions: {

    },
}
