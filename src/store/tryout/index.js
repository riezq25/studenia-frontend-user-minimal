import router from '@/router'
export default {
    namespaced: true,
    state: {
        isUjian: false,
        data: null,
        selisihWaktu: null,
        waktuSelesaiTryout: null,
    },
    getters: {

    },
    mutations: {
        setSoalState(state, payload) {
            state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel].soals[payload.current_index] = payload.soal
        },
        setPaketMapel(state, payload) {
            let current = state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel]

            current.soals = payload.soals
            current.finished_at = Math.floor((Date.now() / 1000) + state.selisihWaktu)
            current.is_done = true
            current.waktu = current.finished_at - current.start_at
        },

        setWaktuMulaiMapel(state, payload) {
            let current = state.data.pengerjaan.paket[payload.index_paket_kategori].paket_mapels[payload.index_paket_mapel]

            if (current.start_at == null) {
                current.start_at = Math.floor((Date.now() / 1000) + state.selisihWaktu)
            }
        },
        simpanSesi(state, pengerjaan) {
            state.data.pengerjaan = pengerjaan
        },
        setSelisihWaktu(state, waktu) {
            state.selisihWaktu = waktu
        },
        setWaktuSelesaiTryout(state, waktu) {
            state.waktuSelesaiTryout = waktu
        },
        clearState(state) {
            state.isUjian = false
            state.data = null
            state.selisihWaktu = null
            state.waktuSelesaiTryout = null
        }
    },
    actions: {

    },
}
