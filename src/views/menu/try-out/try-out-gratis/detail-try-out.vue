<template>
  <div class="mb-2">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <div class="d-flex align-items-center justify-content-end">
          <div class="d-none d-sm-block">
            <b-button variant="relief-success py-1" v-b-modal.modal-success>
              <span style="font-size:1.2rem">Kerjakan</span>
            </b-button>
          </div>
        </div>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-card-actions title="TPS" action-collapse>
            <app-timeline>
              <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
            </app-timeline>
          </b-card-actions>
        </b-col>

        <b-col cols="12">
          <b-card-actions title="TKA Saintek" action-collapse>
            <app-timeline>
              <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
            </app-timeline>
          </b-card-actions>
        </b-col>

        <b-col cols="12">
          <b-card-actions title="TKA Soshum" action-collapse>
            <app-timeline>
              <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

              <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
            </app-timeline>
          </b-card-actions>
        </b-col>
      </b-row>
    </app-collapse>

    <!-- <div>
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="my-2">TPS</h3>
        <div class="d-none d-sm-block">
          <b-button variant="relief-success py-1" v-b-modal.modal-success>
            <span style="font-size:1.2rem">Kerjakan</span>
          </b-button>
        </div>
      </div>
    </div>
    <div class="my-2">
      <h3 class="my-2">TKA Saintek</h3>
      <app-timeline>
        <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="InfoIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
      </app-timeline>
    </div>
    <div class="my-2">
      <h3 class="my-2">TKA Soshum</h3>
      <app-timeline>
        <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="InfoIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

        <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
      </app-timeline>
    </div>-->

    <div class="w-100 p-0 d-sm-none fixed-bottom">
      <div>
        <b-button block variant="relief-success py-2" v-b-modal.modal-success>
          <span style="font-size:1.2rem">Kerjakan</span>
        </b-button>
      </div>
    </div>

    <b-modal id="modal-success" ok-variant="success" ok-title="Kerjakan" cancel-title="Batal" cancel-variant="outline-secondary" modal-class="modal-success" centered title="Kerjakan Soal">
      <b-card-text>
        Sebelum mengerjakan jangan lupa untuk berdoa dan pastikan jaringan internet Anda lancar. Setelah klik kerjakan Anda harus menyelesaikan semua pengerjaan Anda dan
        <span class="text-danger fw-bolder">dilarang meninggalkan aplikasi</span>.
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem.vue";
import { BButton, BModal, VBModal, BCardText } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BButton,
    BModal,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BCardActions,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>