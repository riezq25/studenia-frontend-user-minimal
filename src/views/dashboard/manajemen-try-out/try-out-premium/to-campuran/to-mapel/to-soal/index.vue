<template>
  <div>
    <!-- Tambah To Soal -->
    <b-modal id="tambah-to-soal" scrollable size="lg" title="Scrollable Content" cancel-title="Close" ok-title="Accept" cancel-variant="outline-secondary">
      <b-form>
        <b-form-group>
          <label for="nama-paket">Soal:</label>
          <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="6" />
        </b-form-group>
        <b-card>
          <h3>Pilihan Ganda</h3>
          <div class="d-flex">
            <label for="mapel" class="mr-1">A:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">B:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">C:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">D:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">E:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
        </b-card>
        <b-row>
          <b-col cols="4">
            <label for="nama-paket">Kuci Jawaban:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>

          <b-col cols="4">
            <label for="nama-paket">Mata Pelajaran:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>

          <b-col cols="4">
            <label for="nama-paket">Kategori:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>
        </b-row>
        <b-card>
          <h3>Pembahasan</h3>
          <b-form-group>
            <label for="nama-paket">Pembahasan Soal:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan pembahasan soal di sini" rows="4" />
          </b-form-group>
          <b-form-group>
            <label for="nama-paket">Pembahasan Video:</label>
            <b-form-input id="nama-paket" type="text" placeholder="Cantumkan link video pembahasan soal di sini" rows="4" />
          </b-form-group>
        </b-card>
      </b-form>
    </b-modal>

    <!-- Edit try out -->
    <b-modal id="edit-to-soal" scrollable size="lg" title="Edit Soal" cancel-title="Close" ok-title="Accept" cancel-variant="outline-secondary">
      <b-form>
        <b-form-group>
          <label for="nama-paket">Soal:</label>
          <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="6" />
        </b-form-group>
        <b-card>
          <h3>Pilihan Ganda</h3>
          <div class="d-flex">
            <label for="mapel" class="mr-1">A:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">B:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">C:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">D:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
          <div class="d-flex">
            <label for="mapel" class="mr-1">E:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan Soal di sini" rows="1" />
          </div>
        </b-card>
        <b-row>
          <b-col cols="4">
            <label for="nama-paket">Kuci Jawaban:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>

          <b-col cols="4">
            <label for="nama-paket">Mata Pelajaran:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>

          <b-col cols="4">
            <label for="nama-paket">Kategori:</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
          </b-col>
        </b-row>
        <b-card>
          <h3>Pembahasan</h3>
          <b-form-group>
            <label for="nama-paket">Pembahasan Soal:</label>
            <b-form-textarea id="nama-paket" type="text" placeholder="Ketikkan pembahasan soal di sini" rows="4" />
          </b-form-group>
          <b-form-group>
            <label for="nama-paket">Pembahasan Video:</label>
            <b-form-input id="nama-paket" type="text" placeholder="Cantumkan link video pembahasan soal di sini" rows="4" />
          </b-form-group>
        </b-card>
      </b-form>
    </b-modal>

    <!-- Preview Soal -->
    <b-modal id="lihat-to-soal" scrollable size="lg" title="Lihat Soal" cancel-title="Close" ok-title="Accept" cancel-variant="outline-secondary">
      <b-row>
        <b-col cols="12" class="mb-lg-1">
          <p>1. Secara berurutan konstitusi yang pernah berlaku di Indonesia sejak proklamasi 17 Agustus 1945 sampai 5 Juli 1959 adalah……..</p>
          <!-- Selected Client -->
          <div class="mt-1">
            <b-button variant="light" class="mb-75 pl-2 text-left" block>A. UUD 1945, konstitusi RIS, UUD Sementara</b-button>
            <b-button variant="light" class="mb-75 pl-2 text-left" block>B. UUD 1945, konstitusi RIS, UUD Sementara</b-button>
            <b-button variant="light" class="mb-75 pl-2 text-left" block>C. UUD 1945, konstitusi RIS, UUD Sementara</b-button>
            <b-button variant="light" class="mb-75 pl-2 text-left" block>D. UUD 1945, konstitusi RIS, UUD Sementara</b-button>
            <b-button variant="light" class="mb-75 pl-2 text-left" block>E. UUD 1945, konstitusi RIS, UUD Sementara</b-button>
          </div>
        </b-col>
        <b-col cols="12">
          <p>Jawaban yang benar: A. UUD 1945, konstitusi RIS, UUD Sementara</p>
        </b-col>
        <b-col cols="12">
          <app-collapse>
            <app-collapse-item title="Pembahasan">
              <div>
                <h5>Pembahasan text</h5>
                <p>
                  Pie dragée muffin. Donut cake liquorice marzipan carrot cake topping powder candy. Sugar plum brownie
                  brownie cotton candy. Tootsie roll cotton candy pudding bonbon chocolate cake lemon drops candy. Jelly
                  marshmallow chocolate cake carrot cake bear claw ice cream chocolate. Fruitcake apple pie pudding jelly
                  beans pie candy canes candy canes jelly-o. Tiramisu brownie gummi bears soufflé dessert cake.
                </p>
              </div>
              <div>
                <h5>Pembahasan Video</h5>
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/-MDZB68fOgQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Delete Try Out -->
    <b-modal id="hapus-to-soal" cancel-variant="outline-secondary" ok-title="Hapus" cancel-title="Close" centered title="Hapus Soal">
      <b-form>
        <b-form-group>
          <p>Apakah anda akan menghapus Soal ini?</p>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Show</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." />
              <b-button variant="primary" v-b-modal.tambah-to-soal>
                <span class="text-nowrap">Tambah TO Soal</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="fetchUsers" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
        <!-- Column: User -->
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar size="32" :src="data.item.avatar" :text="avatarText(data.item.fullName)" :variant="`light-${resolveUserRoleVariant(data.item.role)}`" :to="{ name: 'apps-users-view', params: { id: data.item.id } }" />
            </template>
            <b-link :to="{ name: 'apps-users-view', params: { id: data.item.id } }" class="font-weight-bold d-block text-nowrap">{{ data.item.fullName }}</b-link>
            <small class="text-muted">@{{ data.item.username }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon :icon="resolveUserRoleIcon(data.item.role)" size="18" class="mr-50" :class="`text-${resolveUserRoleVariant(data.item.role)}`" />
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
          </div>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge pill :variant="`light-${resolveUserStatusVariant(data.item.status)}`" class="text-capitalize">{{ data.item.status }}</b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)>
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <b-dropdown-item v-b-modal.lihat-to-soal>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Lihat Soal</span>
            </b-dropdown-item>

            <b-dropdown-item v-b-modal.edit-to-soal>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item v-b-modal.hapus-to-soal>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BFormTextarea,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { avatarText } from "@core/utils/filter";
import useUsersList from "./useUsersList";
import userStoreModule from "./userStoreModule";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormTextarea,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
    AppCollapse,
    AppCollapseItem,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = "app-user";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const isAddNewUserSidebarActive = ref(false);

    const roleOptions = [
      { label: "Admin", value: "admin" },
      { label: "Author", value: "author" },
      { label: "Editor", value: "editor" },
      { label: "Maintainer", value: "maintainer" },
      { label: "Subscriber", value: "subscriber" },
    ];

    const planOptions = [
      { label: "Basic", value: "basic" },
      { label: "Company", value: "company" },
      { label: "Enterprise", value: "enterprise" },
      { label: "Team", value: "team" },
    ];

    const statusOptions = [
      { label: "Pending", value: "pending" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ];

    const {
      fetchUsers,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList();

    const tableColumns = [
      { key: "id", sortable: true },
      { key: "soal", sortable: true },
      { key: "mata_pelajaran", sortable: true },
      { key: "kategori", sortable: true },
      { key: "actions" },
    ];

    return {
      // Sidebar
      isAddNewUserSidebarActive,

      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      roleOptions,
      planOptions,
      statusOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
