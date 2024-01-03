<template>
  <div>
    <template v-if="isShow">
      <b-tabs content-class="mt-1" fill>
        <b-tab :title="$t('tabs.title.detailed-review').toUpperCase()" active>
          <b-row v-if="dataForm" class="row-custom">
            <b-col xl="4" class="padding-right-custom">
              <div class="box" style="width: 100%">
                <div class="fz-large fw-700 mb-2">
                  {{ dataForm.Images[0] + ":" }}
                </div>
                <carousel
                  v-if="
                    isShow &&
                    dataForm.Images[1] &&
                    dataForm.Images[1]?.length > 0
                  "
                  :autoplay="true"
                  :loop="true"
                  :autoplayLoop="true"
                  :autoplayTimeout="3000"
                  :perPage="1"
                  :navigationEnabled="true"
                  class="custom-tree-navigation"
                  :navigationClickTargetSize="4"
                  navigationNextLabel="⮞"
                  navigationPrevLabel="⮜"
                >
                  <template v-for="(img, i) in dataForm.Images[1]">
                    <slide :key="i" class="slide" navigationNextLabel="->">
                      <div class="container">
                        <b-img
                          :src="img.Image"
                          class="cusimage"
                          style="width: 100% !important; background: #f3f3f3"
                          @error="loadImgDefault"
                          @click="showWallpaper(dataForm.Images[1], i)"
                        />
                      </div>
                    </slide>
                  </template>
                </carousel>
                <div
                  v-else
                  style="min-height: 608px; background: #dddddd"
                  class="text-center text-muted text-small font-italic pt-4 d-flex justify-content-center align-items-center"
                >
                  <img
                    style="width: 100%"
                    :src="loadImgDefault"
                    alt=""
                    @error="loadImgDefault"
                  />
                </div>
              </div>
            </b-col>
            <b-col xl="8">
              <b-row>
                <b-col xl="6" class="padding-right-custom">
                  <div>
                    <div class="fz-large fw-700" style="margin-bottom: 0.65rem">
                      * {{ $t("factual-information") }}
                    </div>
                    <b-row>
                      <b-colxx xl="9" v-if="dataForm.TreeName?.length > 0">
                        <b-form-group
                          :label="dataForm.TreeName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="3" v-if="dataForm.TreeNumber?.length > 0">
                        <b-form-group
                          :label="dataForm.TreeNumber[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-right"
                            v-model="dataForm.TreeNumber[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm.TreeHeight?.length > 0">
                        <b-form-group
                          :label="dataForm.TreeHeight[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeHeight[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm.TreeWidth?.length > 0">
                        <b-form-group
                          :label="dataForm.TreeWidth[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeWidth[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm.FoliageWidth?.length > 0">
                        <b-form-group
                          :label="dataForm.FoliageWidth[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FoliageWidth[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm?.PlantingYear?.length > 0">
                        <b-form-group
                          :label="dataForm.PlantingYear[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            :value="dataForm.PlantingYear[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="8" v-if="dataForm.TreeTypeName?.length > 0">
                        <b-form-group
                          class="has-float-label fw-700"
                          :label="dataForm.TreeTypeName[0] + ':'"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeTypeName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="4" v-if="dataForm?.Lifespan?.length > 0">
                        <b-form-group
                          :label="dataForm.Lifespan[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.Lifespan[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="12"
                        v-if="dataForm.TreeStatusName?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeStatusName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeStatusName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </b-row>
                  </div>
                  <div>
                    <div
                      style="width: 100%"
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <div class="fz-large fw-700">
                        * {{ $t("tree-location-information") }} &nbsp;
                      </div>
                      <div class="d-flex align-items-center">
                        <div>
                          {{
                            " (" +
                            parseFloat(
                              this.latLngState
                                ? this.latLngState?.lat
                                : dataForm.Lat[1]
                            )?.toFixed(7) +
                            " - " +
                            parseFloat(
                              this.latLngState
                                ? this.latLngState?.lng
                                : dataForm.Long[1]
                            )?.toFixed(7) +
                            ")"
                          }}
                        </div>
                        <div
                          class="ml-2"
                          style="cursor: pointer"
                          v-if="
                            this.latLngState &&
                            this.keyComponent?.toUpperCase() !== `MAP`
                          "
                        >
                          <b-img
                            :src="
                              require('@/assets/img/tree/save_warning_icon.svg')
                            "
                            @click="$bvModal.show('confirm-location')"
                            style="width: 20px"
                            id="tooltip-target-1"
                          ></b-img>
                          <b-tooltip
                            target="tooltip-target-1"
                            triggers="hover"
                            custom-class="tooltip-tree-detail"
                          >
                            <div>
                              {{ $t("coordinate-change-confirmation") }}
                            </div>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                    <b-row>
                      <b-colxx xl="12" v-if="dataForm.FullAddress?.length > 0">
                        <b-form-group
                          :label="dataForm.FullAddress[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FullAddress[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="12"
                        v-if="dataForm.TreeRouteName?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeRouteName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeRouteName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="12">
                        <div
                          v-if="dataForm.Long && dataForm.Lat?.length > 0"
                          class="mt-1"
                        >
                          <div class="fz-large fw-700">
                            <div class="map-control">
                              <location-tree
                                ref="formMapTree"
                                :lat-item="dataForm.Lat[1]"
                                :lng-item="dataForm.Long[1]"
                                :type-item="'tree'"
                                :popup-location="false"
                                :plistTreeDataCurrent="
                                  dataParent?.TreeDataCurrents
                                "
                                :pidTree="dataForm.TreeNumber[1]"
                                @emitDraggableLatLng="getLatLng"
                                :pKeyComponent="keyComponent"
                                :pProcessID="dataParent?.ProcessID"
                              ></location-tree>
                            </div>
                          </div>
                        </div>
                      </b-colxx>
                    </b-row>
                  </div>
                </b-col>
                <b-col xl="6">
                  <div>
                    <div class="fz-large fw-700" style="margin-bottom: 0.65rem">
                      * {{ $t("infomation") }}
                    </div>
                    <b-row>
                      <b-colxx
                        xl="12"
                        v-if="dataForm.TreeCategorieName?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeCategorieName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeCategorieName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.TreeGroupName?.length > 0">
                        <b-form-group
                          :label="dataForm.TreeGroupName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeGroupName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.CrownName?.length > 0">
                        <b-form-group
                          :label="dataForm.CrownName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.CrownName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.LeafName?.length > 0">
                        <b-form-group
                          :label="dataForm.LeafName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.LeafName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.ColorLeafName?.length > 0">
                        <b-form-group
                          :label="dataForm.ColorLeafName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.ColorLeafName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.ColorFlowerName?.length > 0"
                      >
                        <b-form-group
                          class="has-float-label fw-700"
                          :label="dataForm.ColorFlowerName[0] + ':'"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.ColorFlowerName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.TreeHeightRefer?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeHeightRefer[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeHeightRefer[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.DiameterFoliagesRefer?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.DiameterFoliagesRefer[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.DiameterFoliagesRefer[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.TreeWidthRefer?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.TreeWidthRefer[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.TreeWidthRefer[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.DeciduousPeriod?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.DeciduousPeriod[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.DeciduousPeriod[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="6"
                        v-if="dataForm.FloweringPeriod?.length > 0"
                      >
                        <b-form-group
                          :label="dataForm.FloweringPeriod[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.FloweringPeriod[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </b-row>
                  </div>
                  <div>
                    <div style="width: 100%" class="fz-large fw-700 mb-2">
                      * {{ $t("collector-information") }}
                    </div>
                    <b-row>
                      <b-colxx xl="6" v-if="dataForm.EmployerName?.length > 0">
                        <b-form-group
                          :label="dataForm.EmployerName[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            v-model="dataForm.EmployerName[1]"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="6" v-if="dataForm.UpdateTime.length > 0">
                        <b-form-group
                          :label="dataForm.UpdateTime[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-input
                            class="text-left"
                            :value="convertDateTime(dataForm.UpdateTime[1])"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx xl="12" v-if="dataForm.Note.length > 0">
                        <b-form-group
                          :label="dataForm.Note[0] + ':'"
                          class="has-float-label fw-700"
                        >
                          <b-form-textarea
                            class="text-left"
                            v-model="dataForm.Note[1]"
                            disabled
                          ></b-form-textarea>
                        </b-form-group>
                      </b-colxx>
                      <b-colxx
                        xl="12"
                        v-if="
                          (dataForm.ProcessID.length > 0 && !keyComponent) ||
                          keyComponent != 'MAP'
                        "
                        class="mt-4"
                      >
                        <template v-if="dataForm.ProcessID[1] < 3">
                          <b-form-group>
                            <b-row>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkred;
                                    border-radius: 0;
                                  "
                                  @click="acceptModal(dataForm, false)"
                                >
                                  <strong>
                                    <i class="fad fa-undo-alt mr-2"></i>
                                    {{ $t("pages.non-confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkblue;
                                    border-radius: 0;
                                  "
                                  @click="acceptModal(dataForm, true)"
                                >
                                  <strong>
                                    <i class="fad fa-check mr-2"></i>
                                    {{ $t("pages.confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                            </b-row>
                          </b-form-group>
                        </template>
                        <template v-else>
                          <b-form-group :label="dataForm.ProcessID[0] + ':'">
                            <b-row>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkred;
                                    border-radius: 0;
                                  "
                                  disabled
                                >
                                  <strong>
                                    <i class="fad fa-undo-alt mr-2"></i>
                                    {{ $t("pages.non-confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                              <b-colxx xl="6">
                                <b-button
                                  style="
                                    height: 100%;
                                    width: 100%;
                                    background: darkblue;
                                    border-radius: 0;
                                  "
                                  disabled
                                >
                                  <strong>
                                    <i class="fad fa-check mr-2"></i>
                                    {{ $t("pages.confirm-tree") }}
                                  </strong>
                                </b-button>
                              </b-colxx>
                            </b-row>
                          </b-form-group>
                        </template>
                      </b-colxx>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab
          v-if="!keyComponent || keyComponent != 'MAP'"
          :title="$t('tabs.title.process').toUpperCase()"
          style="height: 70vh"
        >
          <b-row v-if="dataForm">
            <template v-if="dataForm['ProcessName'].length > 0">
              <b-col md="12" class="mb-2">
                <h3
                  class="font-weight-bold"
                  :style="{
                    color: dataForm['StatusColor'],
                  }"
                >
                  {{ dataForm["ProcessName"][1] }}
                </h3>
                <p class="font-italic">
                  {{ $t("modal.at") }}:
                  <strong>
                    {{ convertDateTime(dataForm["UpdateTime"][1]) }}
                  </strong>
                </p>
              </b-col>
              <b-col md="12">
                <template v-if="custom">
                  <ol class="numbered" :style="custom">
                    <template v-for="(item, index) in dataForm['Process']">
                      <li :key="index">
                        <p
                          class="ont-weight-bold mb-2"
                          :style="{
                            color:
                              item.StatusID === 5
                                ? 'red'
                                : item.StatusID === 4
                                ? 'green'
                                : 'black',
                          }"
                        >
                          {{ item.ProcessName }}
                        </p>
                        <p class="font-italic">
                          {{ item.Note }} -
                          {{ convertDateTime(item.CreateDate) }}
                        </p>
                        <hr />
                      </li>
                    </template>
                  </ol>
                </template>
              </b-col>
            </template>
            <template v-else>
              <b-col md="12">
                <strong class="text-danger font-italic">
                  {{ $t("modal.no-info") }}
                </strong>
              </b-col>
            </template>
          </b-row>
        </b-tab>

        <b-tab
          :title="$t('tabs.title.maintenance-history').toUpperCase()"
          v-if="keyComponent == 'MAP'"
        >
          <b-row v-if="historyMaintenance && historyMaintenance.length > 0">
            <template v-for="(img, index) in dataImages">
              <b-col :key="index" lg="4" class="p-2 pos-parent">
                <b-img
                  v-img
                  class="h-100 w-100"
                  :src="img.ImageLink"
                  alt="image"
                ></b-img>
                <span class="pos-chilren-title">
                  <b>{{ img.LocationName }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("data.function-is-being-updated") }}
          </div>
        </b-tab>
      </b-tabs>
    </template>
    <div id="fullscreen-wallpaper">
      <div class="button-close-wallpaper m-3">
        <b-button variant="outline-primary" @click="hideWallpaper">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
      <div class="image-wallpaper">
        <custom-carousel-component
          :list-image="listImage"
        ></custom-carousel-component>
      </div>
    </div>

    <!-- Modal accept -->
    <b-modal
      id="modal-accept"
      ref="modal-accept"
      :title="
        accept
          ? $t('pages.confirm-tree').toUpperCase() +
            ' ' +
            $t('dashboards.tree').toUpperCase()
          : $t('dashboards.return').toUpperCase()
      "
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalAccept"
      @ok="handleOkAccept"
      title-class="font-weight-bolder"
      v-if="acceptItem"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitAccept">
        <h3>
          {{
            accept
              ? $t("form.question-confirm") + acceptItem.TreeName[1] + "?"
              : $t("form.question-return") + acceptItem.TreeName[1] + "?"
          }}
        </h3>
        <b-form-group
          v-show="accept"
          :label="$t('condition-of-the-tree') + ': '"
          v-if="acceptItem.TreeTypeID[1] === 1"
        >
          <b-form-select
            class="text-left"
            v-model="treeType"
            :options="treeTypeActiveOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group v-show="accept" :label="$t('unit-manager') + ':'">
          <b-form-select
            class="text-left"
            v-model="unitManager"
            :options="unitManagerOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          :state="acceptState"
          :label="
            accept
              ? $t('dashboards.note') +
                '(' +
                $t('dashboards.if-any').toLowerCase() +
                '):'
              : $t('dashboards.reason') +
                '(' +
                $t('dashboards.required').toLowerCase() +
                '):'
          "
          label-for="note-accept-input"
          :invalid-feedback="$t('dashboards.cannot-be-left-blank')"
        >
          <b-form-input
            id="note-accept-input"
            v-model="acceptNote"
            :state="acceptState"
            :required="accept ? false : true"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="confirm-location"
      :title="$t('update-coordinates')"
      v-if="this.latLngState"
      @ok="confirmLatLng"
    >
      <div>
        <div style="font-size: 19px; font-weight: 700" class="mb-2">
          {{ $t("the-original-position-of-the-tree-has-changed") }}
        </div>
        <div class="d-flex flex-column">
          <div style="font-size: 14px" class="mb-1">
            {{ $t("original-location") }}:
            <span
              >{{ dataForm.Lat[1] }} - <span>{{ dataForm.Long[1] }}</span></span
            >
          </div>
          <div style="font-size: 14px" class="mb-1">
            {{ $t("current-position") }}:
            <span style="color: red"
              >{{ latLngState.lat }} - {{ latLngState.lng }}</span
            >
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import GlideComponent from "@/components/Carousel/GlideComponent";
import BCarouselComponent from "@/components/Carousel/BCarouselComponent";
import ImageCard from "@/components/Cards/ImageCard";
import LocationTree from "@/components/Map/tree/LocationTree";
import handling from "@/constants/handling";
import treeAPI from "@/api/modules/treeAPI";
import collectAPI from "@/api/modules/collectAPI";
import systemAPI from "@/api/modules/systemAPI";
import { timer } from "@/constants/config";

export default {
  props: [
    "nameForm",
    "titleForm",
    "dataParent",
    "stateForm",
    "keyComponent",
    "nameFormTable",
  ],
  components: {
    "glide-component": GlideComponent,
    "custom-carousel-component": BCarouselComponent,
    "image-card": ImageCard,
    "location-tree": LocationTree,
  },
  data() {
    return {
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      isShow: true,
      glideIconsOption: {
        gap: 6,
        perView: 3.2,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1.2,
          },
          575: {
            perView: 1.2,
          },
          1081: {
            perView: 1.7,
          },
          1600: {
            perView: 2.2,
          },
          1800: {
            perView: 2.7,
          },
        },
        hideNav: true,
        autoplay: 4000,
      },
      listImage: null,
      dataFormOptions: {
        CollectTypeID: [],
        RouteID: [],
        TreeID: [],
        GroupID: [],
      },
      dataCollectTreeByID: null,
      accept: null,
      acceptItem: null,
      acceptNote: "",
      acceptState: null,
      unitManager: null,
      unitManagerOptions: null,
      treeType: null,
      treeTypeActiveOptions: null,
      selectChartCollect: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      dataForm: null,
      dataImages: null,
      keyString: this.dataParent?.moduleType,
      historyMaintenance: null,
      timer,
      latLngState: null,
      isConfirmLocation: null,
    };
  },
  computed: {
    custom() {
      return (
        "counter-reset: numbered-list " + (this.dataForm["Process"].length + 1)
      );
    },
  },
  watch: {
    dataForm() {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
  },
  async created() {
    if (this.keyComponent && this.keyComponent?.toUpperCase() == "MAP") {
      await this.handleDataTree();
    } else {
      await this.handleDataCollect();
    }
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
  mounted() {},
  methods: {
    confirmLatLng() {
      this.isConfirmLocation = true;
      setTimeout(() => {
        this.makeToast(
          "success",
          this.$t("toast.success").toUpperCase(),
          "Sao lưu thành công"
        );
      }, this.timer + 500);
    },
    getLatLng(v) {
      this.latLngState = v;
    },
    convertDate(string) {
      let date = moment(string, "YYYY/MM/DD");
      return date.format("DD/MM/YYYY");
    },
    handleDataTree() {
      this.isShow = false;
      this.$emit("updateViewTree", this.dataParent.ID);
      let objectNew = { ...this.dataParent };
      let body = {
        ID: this.dataParent.StationID ?? this.dataParent.ID[1],
      };
      treeAPI
        .getDataMapByID(body)
        .then((val) => {
          objectNew = handling.showExtensionFormEdit(val?.data);
          this.dataForm = objectNew;
          this.dataForm.type = this.dataParent.moduleType;
          setTimeout(() => {
            this.isShow = true;
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDataCollect() {
      this.isShow = false;
      this.$emit("updateViewTree", this.dataParent.ID);
      this.dataForm = handling.showExtensionFormEdit(this.dataParent);
      this.dataForm.Process = this.dataParent.Process.reverse();
      this.dataForm.type = this.dataParent.moduleType;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    getDataCollectTreeByID(id) {
      let body = {
        ID: id,
      };
      collectAPI
        .collectDataTreeDetailByID(body)
        .then((val) => {
          this.dataCollectTreeByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getOptionTreeTypeActive() {
      treeAPI
        .getTreeType()
        .then((val) => {
          this.treeTypeActiveOptions = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                text: val.data[i].TreeTypeName,
                value: val.data[i].TreeTypeID,
              };
              this.treeTypeActiveOptions.push(obj);
            }
            this.treeType = this.treeTypeActiveOptions[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
    getOptionUnitManager() {
      treeAPI
        .managementUnitListActive()
        .then((val) => {
          this.unitManagerOptions = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              if (val.data[i].IsActive === 1) {
                let obj = {
                  text: val.data[i].ManagementUnitName,
                  value: val.data[i].ManagementUnitID,
                };
                this.unitManagerOptions.push(obj);
              }
            }
            this.unitManager = this.unitManagerOptions[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
    resetModalAccept() {
      this.accept = null;
      this.acceptItem = null;
      this.acceptState = null;
      this.acceptNote = "";
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.acceptState = valid;
      return valid;
    },
    submitAcceptOK(note, item, accept) {
      if (accept) {
        this.updateConfirmTree(item, note);
      } else {
        this.updateReturnTree(item, note);
      }
    },
    getListDataCollectDetailByOID(id) {
      let body = {
        OID: id,
      };
      collectAPI
        .collectDataTreeByOID(body)
        .then((val) => {
          this.dataCollectTree = val.status ? val.data : [];
          this.objectKeyCollectTree =
            val.status && val.data.length ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateConfirmTree(items, note) {
      let body = {
        ManagementUnitID: this.unitManager,
        ID: items.ID[1],
        Note: note,
        Lat: this.isConfirmLocation ? "" + this.latLngState.lat : items?.Lat[1],
        Long: this.isConfirmLocation
          ? "" + this.latLngState.lng
          : items?.Long[1],
        TreeTypeID:
          items?.TreeTypeID[1] === 1 ? this.treeType : items.TreeTypeID[1],
      };
      collectAPI
        .collectDataTreeUpdateApproval(body)
        .then((val) => {
          if (val.status) {
            this.getDataCollectTreeByID(items.ID[1]);
            setTimeout(() => {
              this.dataForm = handling.showExtensionFormEdit(
                this.dataCollectTreeByID
              );
              this.getListDataCollectDetailByOID(this.OIDCollectTree);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer + 500);
              this.$bvModal.hide(this.nameForm);
            }, this.timer);
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.$emit(
            "emitGetTreeAndChart",
            this.selectChartCollect.value,
            this.nameFormTable
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReturnTree(items, note) {
      let body = {
        ID: items.ID[1],
        Note: note,
      };
      collectAPI
        .collectDataTreeUpdateReturn(body)
        .then((val) => {
          if (val.status) {
            this.getDataCollectTreeByID(items.ID[1]);
            setTimeout(() => {
              this.dataForm = handling.showExtensionFormEdit(
                this.dataCollectTreeByID
              );
              this.getListDataCollectDetailByOID(this.OIDCollectTree);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer + 500);
              this.$bvModal.hide(this.nameForm);
            }, this.timer);
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.$emit(
            "emitGetTreeAndChart",
            this.selectChartCollect.value,
            this.nameFormTable
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitAccept() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitAcceptOK(this.acceptNote, this.acceptItem, this.accept);
        this.$bvModal.hide("modal-accept");
      });
    },
    handleOkAccept(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitAccept();
    },
    acceptModal(items, accept) {
      this.getOptionUnitManager();
      if (items.TreeTypeID[1] === 1 && accept) {
        this.getOptionTreeTypeActive();
        setTimeout(() => {
          this.makeToast(
            "warning",
            this.$t("form.warning").toUpperCase(),
            this.$t("tree-type-not-updated")
          );
        }, this.timer);
      }
      this.accept = accept;
      this.acceptItem = items;
      setTimeout(() => {
        this.$bvModal.show("modal-accept");
      }, 200);
    },
    loadImgDefault(e) {
      return (e.target.src =
        "https://static.thenounproject.com/png/586523-200.png");
    },
    showWallpaper(list, key) {
      let result = [];
      list.forEach((item, index) => {
        let obj = {
          ...item,
          ID: index,
          Image: item.Image, //img
        };
        result.push(obj);
      });
      // handle image index for click
      result.forEach((item, index) => {
        if (index == key) {
          const tmp = result[0];
          result[0] = result[index];
          result[index] = tmp;
        }
      });
      this.listImage = result;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      if (
        targetDiv.style.display === "none" ||
        targetDiv.style.display === ""
      ) {
        targetDiv.style.display = "block";
      }
    },
    hideWallpaper() {
      this.listImage = null;
      let targetDiv = document.getElementById("fullscreen-wallpaper");
      targetDiv.style.display = "none";
    },
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    resetModal() {
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        this.dataForm[Object.keys(this.dataForm)[i]][1] = null;
        this.stateForm[Object.keys(this.dataForm)[i]] = null;
      }
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm DD/MM/YYYY");
    },
    convertDateTimeYear(string) {
      return handling.convertDateTimeYear(string);
    },
  },
};
</script>
<style scoped>
.padding-right-custom {
  padding-right: 0px !important;
}

.map-control {
  height: 220px;
}

.absolute-div-glide {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 168px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  color: white;
  cursor: pointer;
}

.absolute-div-glide-text {
  margin: 4.5rem auto;
  width: 70%;
  text-align: center;
}

.absolute-div-glide-text p {
  font-size: 30px;
}

#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}

.foliage-width {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-55%, 50%);
}

.tree-width {
  position: absolute;
  top: 45%;
  left: 65%;
  transform: translate(-50%, 20%);
}

.tree-height {
  position: absolute;
  top: 30%;
  left: 90%;
  transform: translate(-20%, -50%);
}

.land-name {
  position: absolute;
  top: 45%;
  left: 20%;
  transform: translate(-50%, -20%);
}

.roots-depth {
  position: absolute;
  top: 60%;
  left: 90%;
  transform: translate(-20%, 0);
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 80%);
  }

  .tree-width {
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-60%, -50%);
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-15%, -50%);
  }

  .land-name {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -70%);
  }

  .roots-depth {
    position: absolute;
    top: 70%;
    left: 90%;
    transform: translate(-15%, -80%);
  }
}

@media screen and (min-width: 576px) and (max-width: 991px) {
  .padding-right-custom {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 50%);
    font-size: 12px;
  }

  .tree-width {
    position: absolute;
    top: 45%;
    left: 65%;
    transform: translate(-40%, -50%);
    font-size: 12px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 12px;
  }

  .land-name {
    position: absolute;
    top: 45%;
    left: 20%;
    transform: translate(-50%, -100%);
    font-size: 12px;
  }

  .roots-depth {
    position: absolute;
    top: 60%;
    left: 90%;
    transform: translate(-20%, -60%);
    font-size: 12px;
  }
}

@media screen and (min-width: 556px) and (max-width: 575px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 30);
    font-size: 12px;
  }

  .tree-width {
    position: absolute;
    top: 45%;
    left: 65%;
    transform: translate(-50%, -20%);
    font-size: 12px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 12px;
  }

  .land-name {
    position: absolute;
    top: 45%;
    left: 20%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }

  .roots-depth {
    position: absolute;
    top: 60%;
    left: 90%;
    transform: translate(-20%, -30%);
    font-size: 12px;
  }
}
/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .padding-right-custom {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
}
@media screen and (max-width: 555px) {
  .foliage-width {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-55%, 30);
    font-size: 10px;
  }

  .tree-width {
    position: absolute;
    top: 40%;
    left: 70%;
    transform: translate(-60%, -40%);
    font-size: 10px;
  }

  .tree-height {
    position: absolute;
    top: 30%;
    left: 90%;
    transform: translate(-20%, -50%);
    font-size: 10px;
  }

  .land-name {
    position: absolute;
    top: 35%;
    left: 20%;
    transform: translate(-40%, 0);
    font-size: 10px;
  }

  .roots-depth {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-30%, -30%);
    font-size: 10px;
  }
}
</style>
<style lang="scss" scoped>
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
  margin: 100px;
  padding: 20px;
}

ol.numbered {
  $bullet-line-width: 3px;
  $bullet-color: grey;
  $bullet-border-width: $bullet-line-width;
  $bullet-background-color: white;
  $bullet-size: 25px;
  border-left: $bullet-line-width solid $bullet-color;
  // counter-reset: numbered-list;
  margin-left: 10px;
  position: relative;
  list-style-type: none;

  li {
    font-size: 13px;
    line-height: 1.2;
    margin-bottom: 15px;
    padding-left: 30px;
    &:last-child {
      border-left: $bullet-line-width solid $bullet-background-color;
      margin-left: -$bullet-line-width;
    }

    &:before {
      $half-of-font-size: -0.5em;
      background-color: $bullet-color;
      border: $bullet-border-width solid $bullet-background-color;
      border-radius: 50%;
      color: $bullet-background-color;
      content: counter(numbered-list, decimal);
      counter-increment: numbered-list -1;
      display: block;
      font-weight: bold;
      width: $bullet-size + 5px;
      height: $bullet-size + 5px;
      margin-top: $half-of-font-size;
      line-height: $bullet-size;
      position: absolute;
      left: -$bullet-size / 2 - $bullet-line-width / 2 - $bullet-border-width;
      text-align: center;
    }
  }
}
.custom-image {
  border: 1px solid #d7d7d7;
  height: 150px;
  width: 100%;
}
</style>
<style scoped>
.fz-large {
  font-size: 16px;
}

.fw-700 {
  font-weight: 700;
}

.container {
  width: 100%;
  padding: 0;
  position: relative;
}
.label-img {
  position: absolute;
  z-index: 99999;
  top: 80px;
  left: 320px;
  font-size: 19px;
  font-weight: 700;
  width: 100%;
}
.cusimage {
  width: 100%;
  height: 592px;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .cusimage {
    height: 250px;
  }
}
</style>
<style>
.body-custom-tree-modal {
  padding: 0.5rem 1rem !important;
  padding-bottom: 1rem !important;
}

.header-custom-tree-modal {
  padding: 0.5rem 0.75rem !important;
}
.body-custom-tree-modal {
  padding: 0.5rem 1rem !important;
  padding-bottom: 1rem !important;
  overflow: auto;
}

.custom-tree-navigation {
  cursor: grab;
}

.custom-tree-navigation:active {
  cursor: grabbing;
}

.custom-tree-navigation:hover
  .VueCarousel-navigation
  .VueCarousel-navigation-button {
  opacity: 1;
}
.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-prev {
  left: 25px !important;
}

.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-next {
  right: 25px !important;
}

.custom-tree-navigation .VueCarousel-navigation .VueCarousel-navigation-button {
  color: white !important;
  background-color: black !important;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3 linear;
}

.box .VueCarousel-pagination {
  display: none;
}
</style>

<style>
.tooltip-tree-detail {
  top: 0px !important;
}
</style>
