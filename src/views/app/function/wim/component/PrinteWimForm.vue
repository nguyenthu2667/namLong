<template>
  <div>
    <!-- PDF -->
    <b-row>
      <b-col>
        <div
          class="d-flex align-items-md-center flex-column flex-md-row justify-content-md-between"
        >
          <div class="text-left w-100 pt-2">
            <h3 v-if="isNew == 1">
              <strong>{{ $t('wim.print.create-balance') }}</strong>
            </h3>
            <h3 v-else-if="isEdit == 1 && isNew == 0">
              <strong>{{ $t('wim.print.update-balance') }}</strong>
            </h3>
            <h3 v-else>
              <strong>{{ $t('wim.print.watch-balance') }}</strong>
            </h3>
          </div>
          <b-button
            v-show="isNew == 1"
            style="white-space: nowrap; font-weight: 700"
            variant="success"
            class="mb-2"
            @click="createReportVim"
          >
            <i class="fas fa-plus-circle"></i>
            {{ $t('wim.print.create') }}
          </b-button>
          <b-button
            v-show="isEdit == 1 && isNew == 0"
            style="white-space: nowrap; font-weight: 700"
            variant="success"
            class="mb-2"
            @click="createReportVim"
          >
            <i class="fas fa-edit"></i>
            {{ $t('wim.print.update') }}
          </b-button>
          <b-button
            style="white-space: nowrap; font-weight: 700"
            variant="primary"
            class="mb-2"
            @click="printSheet"
          >
            <i class="fas fa-print"></i>
            {{ $t('wim.print.print') }}
          </b-button>
        </div>
      </b-col>
    </b-row>
    <!-- FORM -->
    <b-card v-show="isEdit == 1 || isNew == 1" id="form-pdf">
      <div class="sheet-d-flex flex-direction-column margin-top-sheet-1">
        <div
          class="sheet-header-left sheet-d-flex"
          style="flex-direction: column"
        >
          <p
            class="font-18 text-transform-uppercase fw-700 font-custom-general text-center text-md-left margin-top-sheet-1"
          >
            {{
              $t(
                'wim.print.department-of-transportation-connect-investment-joint-stock-company',
              )
            }}
          </p>
          <p
            class="font-17 fw-300 text-transform-uppercase font-custom-general text-center text-md-left margin-top-sheet-1"
          >
            &emsp; {{ $t('wim.print.ktttx-station-dong-thuan-weight-sector') }}
          </p>
        </div>
        <div class="sheet-header-right">
          <div
            class="sheet-d-flex sheet-justify-space-between margin-top-sheet-1"
          >
            <div
              class="
                font-15
                fw-300
                font-custom-general
              "
              style="white-space:unset !important"
            >
              {{ $t('wim.print.process') }}
              <span class="sheet-width-input-small"> {{ lyTrinh }}</span>
            </div>
            <div
              class="
                font-15
                fw-300
                text-align-right
                font-custom-general
              "
            >
              {{ $t('wim.print.lane') }}:
              <span> {{ lane }}</span>
            </div>
          </div>

          <div
            class="margin-top-sheet-1 sheet-d-flex-responsive justify-space-center"
          >
            <div class="font-15 fw-300 font-custom-general sheet-d-unset">
              {{ 'wim.print.number-of-votes' }}:
              <span class="sheet-width-input-small"> {{ pCodeId }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <p class="mb-2 font-18 fw-600 font-custom-general margin-top-sheet-1 ">
          <strong>{{ $t('wim.print.vehicle-weight-check-sheet') }}</strong>
        </p>
      </div>
      <div style="display: flex; gap: 16px; margin-bottom: 4px">
        <div style="width: 50%; display: flex">
          <img
            height="160"
            style="width: 100%"
            :src="img1"
            alt="img-frontlicenseplate"
            class="print-img"
          />
        </div>
        <div style="width: 50%; display: flex">
          <img
            height="160"
            style="width: 100%"
            :src="img2"
            alt="img-behindlicenseplate"
            class="print-img"
          />
        </div>
      </div>
      <div class="border-1">
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 pl-1 sheet-width-50 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general white-space-response-nowrap"
            >
              {{ $t('wim.print.car-control-plate') }}:
              <div class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="licenseplate"
                ></b-form-input>
              </div>
            </div>
          </div>
          <div class="pl-1 sheet-width-50 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general white-space-response-nowrap"
            >
              BKS SMRM/RM:
              <div class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="BKSSMRM"
                ></b-form-input>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              Loại xe:
              <div class="sheet-width-input">
                <b-form-select
                  v-model="vehicleType"
                  class="sheet-custom-input height-100 height-response-unset"
                  :options="optionType"
                  size="sm"
                ></b-form-select>
              </div>
            </div>
          </div>
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.total-alex') }} {{ totalAlex }}
            </p>
          </div>
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <p
              class="font-14 fw-300 font-custom-general pl-1 sheet-d-flex white-space-response-nowrap"
            >
              {{ $t('wim.print.forward-color') }}:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="mauXePhiaTruoc"
                ></b-form-input
              ></span>
            </p>
          </div>
          <div class="sheet-width-25 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.liquid-tankers') }}:
              <span class="sheet-width-input">
                <input
                  class="sheet-custom-input"
                  min="0"
                  max="1"
                  name="num"
                  maxlength="1"
                  :value="xiTec"
                  @input="formatInput"
                  id="xiTec"
                  style="width: 100%"
              /></span>
            </div>
          </div>
        </div>
        <div class="border-b-1">
          <div
            class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
          >
            {{ $t('wim.print.owner-address') }}:
            <span class="sheet-width-input">
              <b-form-input
                class="sheet-custom-input"
                v-model="vehicleOwnerName"
                @input="vehicleOwnerName = vehicleOwnerName.toUpperCase()"
              ></b-form-input
            ></span>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.name-lx') }}:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="tenLX"
                  @input="tenLX = tenLX.toUpperCase()"
                ></b-form-input
              ></span>
            </div>
          </div>
          <div class="border-r-1 sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.gplx') }}:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="GPLX"
                ></b-form-input
              ></span>
            </div>
          </div>
          <div class="sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.gplhx') }}:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  v-model="GPLHX"
                ></b-form-input
              ></span>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.speed') }} <span>[km/h]</span>:
              {{ vehicleSpeed }}
            </p>
          </div>
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.time-enter') }}
              <span class="fw-700">{{ timeIn }}</span>
            </p>
          </div>
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.date') }}
              <span class="fw-700">{{ dateTime }} </span>
            </p>
          </div>
          <div class=" sheet-width-25 sheet-width-response-100">
            <div
              class="font-14 fw-300 font-custom-general pl-1 sheet-d-flex white-space-response-nowrap"
            >
              {{ $t('wim.print.regime') }}:
              <span class="sheet-width-input"> &nbsp; {{ modeWim }}</span>
            </div>
          </div>
        </div>
        <div class="border-b-1 text-align-center">
          <p
            class="font-16 fw-700 text-transform-uppercase font-custom-general"
          >
            {{ $t('wim.print.allowed-mass-dimensions') }}
          </p>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="sheet-width-50 sheet-width-response-100 border-r-1">
            <div
              class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general white-space-response-nowrap"
            >
              {{ $t('wim.print.mass') }}
              <span>[{{ $t('wim.print.ton') }}]</span>:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  type="number"
                  min="0"
                  v-model.number="khoiLuongBanThanOto"
                  @input="khoiLuongBanThanOto = Math.abs(khoiLuongBanThanOto)"
                ></b-form-input
              ></span>
            </div>
          </div>
          <div class="sheet-width-50 sheet-width-response-100">
            <div class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general">
              {{ $t('wim.print.mass-smrm') }}
              <span>[{{ $t('wim.print.ton') }}]</span>:
              <span class="sheet-width-input">
                <b-form-input
                  class="sheet-custom-input"
                  type="number"
                  v-model.number="khoiLuongBanThanSMRM"
                  @input="khoiLuongBanThanSMRM = Math.abs(khoiLuongBanThanSMRM)"
                ></b-form-input
              ></span>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex border-b-1">
          <div
            style="width: 100%"
            class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general"
          >
            {{ $t('wim.print.allowed-people') }}
            <span>[{{ $t('wim.print.ton') }}]</span>: [0,065
            {{ $t('wim.print.ton') }} x {{ $t('wim.print.people') }}]
            <span class="sheet-width-input border-r-1">
              <b-form-input
                class="sheet-custom-input text-align-center"
                type="number"
                min="0"
                v-model.number="khoiLuongChoPhepTrenOto"
                @input="
                  khoiLuongChoPhepTrenOto = Math.abs(khoiLuongChoPhepTrenOto)
                "
              ></b-form-input
            ></span>
            <span class="sheet-width-input text-align-center">
              {{ totalPeopleAllow }}
            </span>
          </div>
        </div>
        <div style="display: flex" class="border-b-1">
          <div
            class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general"
            style="width: 100%"
          >
            {{ $t('wim.print.allowed-hhcc') }}
            <span>[{{ $t('wim.print.ton') }}]</span>:
            <span class="sheet-width-input">
              <b-form-input
                class="sheet-custom-input"
                v-model.number="khoiLuongHHCC"
                type="number"
                min="0"
                @input="khoiLuongHHCC = Math.abs(khoiLuongHHCC)"
              ></b-form-input
            ></span>
          </div>
        </div>
        <div>
          <table
            style="width: 100%"
            class="font-14 fw-300 font-custom-general text-align-center table-overflow"
          >
            <thead>
              <tr class="border-b-1">
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.classification') }}
                </th>
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.kt-bao') }} <span>[m]</span>
                </th>
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.kt-thung-hang') }} <span>[m]</span>
                </th>
                <th class="border-collapse sheet-width-25">
                  {{ $t('wim.print.width') }} <span>[m]</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b-1">
                <td class="border-r-1 border-collapse font-italic">
                  {{ $t('wim.print.car') }}
                </td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuDaiOTo"
                        @input="chieuDaiOTo = Math.abs(chieuDaiOTo)"
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        type="number"
                        class="sheet-custom-input text-align-center"
                        v-model.number="chieuRongOTo"
                        @input="chieuRongOTo = Math.abs(chieuRongOTo)"
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuCaoOTo"
                        @input="chieuCaoOTo = Math.abs(chieuCaoOTo)"
                      ></b-form-input
                    ></span>
                  </div>
                </td>
                <td class="border-r-1 border-collapse">
                  <span class="sheet-width-input"> </span>
                </td>
                <td class="border-collapse">
                  <div class="sheet-d-flex">
                    <span
                      class="sheet-width-input"
                      style="display:flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        v-model="chieuDaiOTo1"
                        :type="changeTypeChieuDai"
                        @focus="changeTypeChieuDai = 'number'"
                        @blur="changeTypeChieuDai = 'text'"
                        @input="chieuDaiOTo1 = Math.abs(chieuDaiOTo1)"
                      ></b-form-input
                    ></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="border-r-1 border-collapse font-italic">SMRM/RM</td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuDaiXeKeo"
                        @input="chieuDaiXeKeo = Math.abs(chieuDaiXeKeo)"
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuRongXeKeo"
                        @input="chieuRongXeKeo = Math.abs(chieuRongXeKeo)"
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuCaoXeKeo"
                        @input="chieuCaoXeKeo = Math.abs(chieuCaoXeKeo)"
                      ></b-form-input
                    ></span>
                  </div>
                </td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuDaiKTThungHang"
                        @input="
                          chieuDaiKTThungHang = Math.abs(chieuDaiKTThungHang)
                        "
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuRongKTThungHang"
                        @input="
                          chieuRongKTThungHang = Math.abs(chieuRongKTThungHang)
                        "
                      ></b-form-input
                      >x</span
                    >
                    <span
                      class="sheet-width-input"
                      style="display: flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        type="number"
                        v-model.number="chieuCaoKTThungHang"
                        @input="
                          chieuCaoKTThungHang = Math.abs(chieuCaoKTThungHang)
                        "
                      ></b-form-input
                    ></span>
                  </div>
                </td>
                <td class="border-collapse">
                  <div class="sheet-d-flex">
                    <span
                      class="sheet-width-input"
                      style="display:flex; flex: 1"
                    >
                      <b-form-input
                        class="sheet-custom-input text-align-center"
                        v-model="chieuDaiXeKeo1"
                        :type="changeTypeChieuDaiSMRM"
                        @focus="changeTypeChieuDaiSMRM = 'number'"
                        @blur="changeTypeChieuDaiSMRM = 'text'"
                        @input="chieuDaiXeKeo1 = Math.abs(chieuDaiXeKeo1)"
                      ></b-form-input
                    ></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="text-align-center border-b-1">
          <p
            class="
              font-16
              fw-700
              pl-1
              text-transform-uppercase
              font-custom-general
            "
          >
            I. {{ $t('wim.print.long-6') }}
          </p>
        </div>
        <table
          style="width: 100%; white-space: unset"
          class="font-14 fw-300 font-custom-general border-collapse table-overflow"
        >
          <thead class="text-align-center">
            <tr class="border-b-1">
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.axis-type') }}
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.weight-number') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.error') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.minus-error') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.allowed-weight') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                {{ $t('wim.print.mass-overload') }}
                <span>[{{ $t('wim.print.ton') }}]</span>
              </th>
              <th class="border-collapse sheet-width-11">
                <div>{{ $t('wim.print.mass-overload') }}</div>
                <div>(%)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(axle, i) in axles" :key="i">
              <td class="border-r-1 border-collapse">
                {{ axle.AxleType }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ axle.AxleWeight }}
              </td>
              <td class="border-r-1 border-collapse">
                <span class="sheet-width-input" v-if="Number(axle.AxleWeight)">
                  <b-form-input
                    type="number"
                    min="0"
                    class="sheet-custom-input text-align-right"
                    v-model="axle.AxleWeightError"
                    @input="
                      axle.AxleWeightError = changeFixed(
                        Math.abs(axle.AxleWeightError),
                        2,
                      )
                    "
                  ></b-form-input
                ></span>
                <div class="sheet-width-input text-align-right" v-else>
                  <!-- {{ changeFixed(axle.AxleWeightError, 2) }} -->
                  {{ axle.AxleWeightError }}
                </div>
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{
                  (axle.AxleWeightAfterError =
                    axle.AxleWeight - axle.AxleWeightError < 0
                      ? changeFixed(0, 2)
                      : changeFixed(axle.AxleWeight - axle.AxleWeightError, 2))
                }}
              </td>
              <td class="border-r-1 border-collapse">
                <span class="sheet-width-input" v-if="Number(axle.AxleWeight)">
                  <b-form-input
                    class="sheet-custom-input text-align-right"
                    v-model.number="axle.AllowAxleWeight"
                    type="number"
                    min="0"
                    @input="
                      axle.AllowAxleWeight = Math.abs(axle.AllowAxleWeight)
                    "
                  ></b-form-input
                ></span>
                <div class="sheet-width-input text-align-right" v-else>
                  {{ axle.AllowAxleWeight }}
                </div>
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{
                  (axle.AxleWeightOverload =
                    axle.AxleWeightAfterError - axle.AllowAxleWeight < 0
                      ? changeFixed(0, 2)
                      : changeFixed(
                          axle.AxleWeightAfterError - axle.AllowAxleWeight,
                          2,
                        ))
                }}
              </td>
              <td class="border-collapse text-align-right fw-700">
                {{
                  (axle.AxlePercentOverload =
                    (axle.AxleWeightOverload / axle.AllowAxleWeight) * 100 ===
                      Infinity ||
                    '' +
                      (axle.AxleWeightOverload / axle.AllowAxleWeight) * 100 ===
                      'NaN'
                      ? changeFixed(0, 1)
                      : numberWithCommas(
                          Math.round(
                            changeFixed(
                              (axle.AxleWeightOverload / axle.AllowAxleWeight) *
                                100,
                              1,
                            ) * 10,
                          ) / 10,
                        ))
                }}
              </td>
            </tr>
            <tr class="border-t-1 fw-700">
              <td class="border-r-1 border-collapse">
                {{ $t('wim.print.total') }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalWeight, 2)) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalWeightError, 2)) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{
                  numberWithCommas(changeFixed(totalAxleWeightAfterError, 2))
                }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(totalAllowAxleWeight) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalAxleWeightOverload, 2)) }}
              </td>
              <td class="border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalAxlePercentOverload, 1)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="text-align-center border-b-1">
          <p
            class="
              font-16
              fw-700
              text-transform-uppercase
              pl-1
              font-custom-general
            "
          >
            II. {{ $t('wim.print.long-7') }}
          </p>
        </div>
        <table
          style="width: 100%; white-space: unset"
          class="font-14 fw-300 font-custom-general border-collapse"
        >
          <thead class="text-align-center">
            <tr class="border-b-1">
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.stock-weight') }}
              </th>
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.stock-overload') }}
              </th>
              <th class="border-collapse sheet-width-33">
                {{ $t('wim.print.percent-overload') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-1">
              <td class="border-r-1 border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ KLhangCCcanDuoc }}
                  <div class="sheet-relative-right">
                    <span>[{{ $t('wim.print.ton') }}]</span>
                  </div>
                </div>
              </td>
              <td class="border-r-1 border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ vuotKLhang }}
                  <span class="sheet-relative-right"
                    >[{{ $t('wim.print.ton') }}]</span
                  >
                </div>
              </td>
              <td class="border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ phanTramKLHHCCvuot }}
                  <span class="sheet-relative-right" style="font-style: italic"
                    >(%)</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="sheet-d-flex flex-response-wrap">
          <div class="border-r-1 sheet-width-33 sheet-width-response-100">
            <div class="text-align-center">
              <p
                class="font-16 fw-700 pl-1 font-custom-general "
                style="white-space: unset !important"
              >
                III. {{ $t('wim.print.long-8') }}
                <span style="text-transform: lowercase">[m]</span>
              </p>
            </div>
          </div>
          <div class="sheet-width-66 sheet-width-response-100">
            <table
              style="width: 100%; white-space: unset"
              class="border-collapse font-14 fw-300 font-custom-general"
            >
              <thead style="">
                <tr class="border-b-1">
                  <th class="border-r-1 border-collapse sheet-width-50">
                    {{ $t('wim.print.pack-overload') }}
                  </th>
                  <th class="sheet-width-50 white-space-response-nowrap">
                    {{ $t('wim.print.trunk-overload') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border-r-1 border-collapse">
                    <div class="sheet-d-flex">
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuDaiKichThuocBaoVuot"
                          @input="
                            chieuDaiKichThuocBaoVuot = Math.abs(
                              chieuDaiKichThuocBaoVuot,
                            )
                          "
                        ></b-form-input
                        >x</span
                      >
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuRongKichThuocBaoVuot"
                          @input="
                            chieuRongKichThuocBaoVuot = Math.abs(
                              chieuRongKichThuocBaoVuot,
                            )
                          "
                        ></b-form-input
                        >x</span
                      >
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuCaoKichThuocBaoVuot"
                          @input="
                            chieuCaoKichThuocBaoVuot = Math.abs(
                              chieuCaoKichThuocBaoVuot,
                            )
                          "
                        ></b-form-input
                      ></span>
                    </div>
                  </td>
                  <td style="border-collapse: collapse">
                    <div class="sheet-d-flex">
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuDaiThungHangDoDuoc"
                          @input="
                            chieuDaiThungHangDoDuoc = Math.abs(
                              chieuDaiThungHangDoDuoc,
                            )
                          "
                        ></b-form-input
                        >x</span
                      >
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuRongThungHangDoDuoc"
                          @input="
                            chieuRongThungHangDoDuoc = Math.abs(
                              chieuRongThungHangDoDuoc,
                            )
                          "
                        ></b-form-input
                        >x</span
                      >
                      <span
                        class="sheet-width-input"
                        style="display: flex; flex: 1"
                      >
                        <b-form-input
                          class="sheet-custom-input text-align-center"
                          type="number"
                          v-model.number="chieuCaoThungHangDoDuoc"
                          @input="
                            chieuCaoThungHangDoDuoc = Math.abs(
                              chieuCaoThungHangDoDuoc,
                            )
                          "
                        ></b-form-input
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="mt-sheet-2 ml-2">
        <p class="font-16 fw-700 text-transform-uppercase font-custom-general">
          IV. {{ $t('wim.print.conclusion') }}
        </p>
        <p
          class="font-15 fw-700 font-custom-general sheet-d-flex sheet-align-items-center sheet-d-unset"
        >
          1. {{ $t('wim.print.allowed-weight-overload') }}:
          <b-form-input
            class="sheet-custom-input mt-response-2 sheet-width-10 sheet-width-50 "
            id="BridgePercentOverload"
            :value="xeVuotTongTrongLuongCauDuong"
            @input="changeTwoBind"
          ></b-form-input>
          %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          2. {{ $t('wim.print.allowed-axis-overload') }}: {{ maxXeVuotTai }} %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          3. {{ $t('wim.print.allowed-stock-overload') }}:
          <span>{{ phanTramKLHHCCCPTGGT }}</span> %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          4. {{ $t('wim.print.vehicle-overload') }}:
          {{ $t('wim.print.overload-pack-size') }} <span>{{ overBag }}</span> m;
          {{ $t('wim.print.overload-trunk-size') }} <span>{{ overBin }}</span> m
        </p>
        <p class="font-15 fw-700 font-custom-general">
          5. {{ $t('wim.print.no-violate') }}!
        </p>
      </div>
      <div
        class="sheet-d-flex flex-response-wrap"
        style="margin-top: 12px; display: flex"
      >
        <div class="sheet-width-55 sheet-width-response-100">
          <p class="font-16 fw-700 sheet-d-flex font-custom-general">
            {{ $t('wim.print.note') }}:
            <b-form-input
              class="sheet-custom-input"
              v-model="note"
            ></b-form-input>
          </p>
        </div>
        <div class="sheet-width-response-100 sheet-width-45 mt-response-2">
          <div class="sheet-width-response-100 sheet-width-50">
            <p class="font-16 fw-700 font-custom-general text-align-center">
              {{ $t('wim.print.creator') }}
            </p>
            <p
              class="
                font-14 font-italic
                fw-700
                text-align-center
                font-custom-general
              "
            >
              ({{ $t('wim.print.sign') }})
            </p>
            <p class="font-custom-general">
              <b-form-input
                class="sheet-custom-input font-18 text-align-center fw-700"
                v-model="Wim_Creator"
              ></b-form-input>
            </p>
          </div>
        </div>
      </div>
    </b-card>
    <!-- TEMPLATE -->
    <b-card v-show="isEdit == 0 && isNew == 0" id="print-template">
      <div class="sheet-d-flex flex-direction-column margin-top-sheet-1">
        <div
          class="sheet-header-left sheet-d-flex"
          style="flex-direction: column"
        >
          <p
            class="font-17 text-transform-uppercase fw-700 font-custom-general text-center text-md-left margin-top-sheet-1"
            style="white-space: unset !important"
          >
            {{
              $t(
                'wim.print.department-of-transportation-connect-investment-joint-stock-company',
              )
            }}
          </p>
          <p
            class="font-16 fw-300 text-transform-uppercase font-custom-general text-center text-md-left margin-top-sheet-1"
          >
            &emsp; Trạm KTTTX/BỘ PHẬN CÂN KTTTX ĐỒNG THUẬN
          </p>
        </div>
        <div class="sheet-header-right">
          <div
            class="sheet-d-flex margin-top-sheet-1 sheet-justify-space-between"
          >
            <div
              class="
                font-15
                fw-300
                font-custom-general
              "
              style="white-space:unset !important"
            >
              {{ $t('wim.print.process') }}:
              <span class="sheet-width-input-small"> {{ lyTrinh }}</span>
            </div>
            <div
              class="
                font-15
                fw-300
                text-align-right
                font-custom-general
              "
            >
              {{ $t('wim.print.lane') }}:
              <span> {{ lane }}</span>
            </div>
          </div>

          <div
            class="margin-top-sheet-1 sheet-d-flex-responsive justify-space-center"
          >
            <div class="font-15 fw-300 font-custom-general sheet-d-unset">
              {{ 'wim.print.number-of-votes' }}:
              <span class="sheet-width-input-small"> {{ pCodeId }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center" class="margin-top-sheet-1">
        <p class="mb-2 font-18 fw-600 font-custom-general margin-top-sheet-1 ">
          <strong> PHIẾU CÂN KIỂM TRA TẢI TRỌNG XE</strong>
        </p>
      </div>
      <div style="display: flex; gap: 16px; margin-bottom: 4px">
        <div style="width: 50%; display: flex">
          <img
            height="160"
            style="width: 100%"
            :src="img1"
            alt="img-frontlicenseplate"
            class="print-img"
          />
        </div>
        <div style="width: 50%; display: flex">
          <img
            height="160"
            style="width: 100%"
            :src="img2"
            alt="img-behindlicenseplate"
            class="print-img"
          />
        </div>
      </div>
      <div class="border-1">
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 pl-1 sheet-width-50 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general white-space-response-nowrap"
            >
              {{ $t('wim.print.car-control-plate') }}: {{ licenseplate }}
            </div>
          </div>
          <div class="pl-1 sheet-width-50 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general white-space-response-nowrap"
            >
              BKS SMRM/RM:
              <div class="sheet-width-input">
                {{ BKSSMRM }}
              </div>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.classification') }}: {{ vehicleTypeCustom }}
            </p>
          </div>
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.total-alex') }}: {{ totalAlex }}
            </p>
          </div>
          <div class="sheet-width-25 sheet-width-response-100 border-r-1">
            <p
              class="font-14 fw-300 font-custom-general pl-1 sheet-d-flex white-space-response-nowrap"
            >
              {{ $t('wim.print.forward-color') }}:
              <span class="sheet-width-input"> {{ mauXePhiaTruoc }}</span>
            </p>
          </div>
          <div class="sheet-width-25 sheet-width-response-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.liquid-tankers') }}:
              <span class="sheet-width-input"> {{ xiTec }}</span>
            </div>
          </div>
        </div>
        <div class="border-b-1">
          <div
            class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
          >
            {{ $t('wim.print.owner-address') }}:
            <span class="sheet-width-input"> {{ vehicleOwnerName }}</span>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.name-lx') }}:
              <span class="sheet-width-input"> {{ tenLX }}</span>
            </div>
          </div>
          <div class="border-r-1 sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              {{ $t('wim.print.gplx') }}:
              <span class="sheet-width-input"> {{ GPLX }}</span>
            </div>
          </div>
          <div class="sheet-width-33 sheet-width-100">
            <div
              class="sheet-d-flex font-14 fw-300 font-custom-general pl-1 white-space-response-nowrap"
            >
              Số GPLHX:
              <span class="sheet-width-input"> {{ GPLHX }}</span>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.speed') }} <span>[km/h]</span>:
              {{ vehicleSpeed }}
            </p>
          </div>
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.time-enter') }}:
              <span class="fw-700">{{ timeIn }}</span>
            </p>
          </div>
          <div class="border-r-1 sheet-width-25 sheet-width-response-100">
            <p class="font-14 fw-300 font-custom-general pl-1">
              {{ $t('wim.print.date') }}:
              <span class="fw-700">{{ dateTime }} </span>
            </p>
          </div>
          <div class=" sheet-width-25 sheet-width-response-100">
            <div
              class="font-14 fw-300 font-custom-general pl-1 sheet-d-flex white-space-response-nowrap"
            >
              {{ $t('wim.print.regime') }}:
              <span class="sheet-width-input"> &nbsp; {{ modeWim }}</span>
            </div>
          </div>
        </div>
        <div class="border-b-1 text-align-center">
          <p
            class="font-16 fw-700 text-transform-uppercase font-custom-general"
          >
            {{ $t('wim.print.allowed-mass-dimensions') }}:
          </p>
        </div>
        <div class="sheet-d-flex flex-response-wrap border-b-1">
          <div class="sheet-width-50 sheet-width-response-100 border-r-1">
            <div
              class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general white-space-response-nowrap"
            >
              {{ $t('wim.print.mass') }}
              <span>[{{ $t('wim.print.ton') }}]</span>:
              <span class="sheet-width-input"> {{ khoiLuongBanThanOto }}</span>
            </div>
          </div>
          <div class="sheet-width-50 sheet-width-response-100">
            <div class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general">
              {{ $t('wim.print.mass-smrm') }}
              <span>[{{ $t('wim.print.ton') }}]</span>:
              <span class="sheet-width-input"> {{ khoiLuongBanThanSMRM }}</span>
            </div>
          </div>
        </div>
        <div class="sheet-d-flex border-b-1">
          <div
            style="width: 100%"
            class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general"
          >
            {{ $t('wim.print.station-part') }}
            <span>[{{ $t('wim.print.ton') }}]</span>: [0,065
            {{ $t('wim.print.ton') }} x {{ $t('wim.print.people') }}]
            <span class="sheet-width-input">
              {{ khoiLuongChoPhepTrenOto }}</span
            >
          </div>
        </div>
        <div style="display: flex;" class="border-b-1">
          <div class="sheet-d-flex font-14 fw-300 pl-1 font-custom-general">
            {{ $t('wim.print.station-part') }}
            <span>[{{ $t('wim.print.ton') }}]</span>:
            <span class="sheet-width-input"> {{ khoiLuongHHCC }}</span>
          </div>
        </div>
        <div>
          <table
            style="width: 100%; border-collapse: collapse"
            class="font-14 fw-300 font-custom-general text-align-center table-overflow"
          >
            <thead>
              <tr class="border-b-1">
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.classification') }}
                </th>
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.kt-bao') }} <span>[m]</span>
                </th>
                <th class="border-r-1 border-collapse sheet-width-25">
                  {{ $t('wim.print.kt-thung-hang') }} <span>[m]</span>
                </th>
                <th class="border-collapse sheet-width-25">
                  {{ $t('wim.print.width') }} <span>[m]</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b-1">
                <td class="border-r-1 border-collapse font-italic">
                  {{ $t('wim.print.car') }}
                </td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span class="sheet-width-input"> {{ chieuDaiOTo }}</span> x
                    <span class="sheet-width-input"> {{ chieuRongOTo }}</span> x
                    <span class="sheet-width-input"> {{ chieuCaoOTo }}</span>
                  </div>
                </td>
                <td class="border-r-1 border-collapse">
                  <span class="sheet-width-input"></span>
                </td>
                <td class="border-collapse">
                  <div class="sheet-d-flex">
                    <span class="sheet-width-input"> {{ chieuDaiOTo1 }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="border-r-1 border-collapse font-italic">SMRM/RM</td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span class="sheet-width-input"> {{ chieuDaiXeKeo }}</span>
                    x
                    <span class="sheet-width-input"> {{ chieuRongXeKeo }}</span>
                    x
                    <span class="sheet-width-input"> {{ chieuCaoXeKeo }}</span>
                  </div>
                </td>
                <td class="border-r-1 border-collapse">
                  <div class="sheet-d-flex">
                    <span class="sheet-width-input">
                      {{ chieuDaiKTThungHang }}</span
                    >
                    x
                    <span class="sheet-width-input">
                      {{ chieuRongKTThungHang }}</span
                    >
                    x
                    <span class="sheet-width-input">
                      {{ chieuCaoKTThungHang }}</span
                    >
                  </div>
                </td>
                <td class="border-collapse">
                  <div class="sheet-d-flex">
                    <span class="sheet-width-input"> {{ chieuDaiXeKeo1 }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="text-align-center border-b-1">
          <p
            class="
              font-16
              fw-700
              pl-1
              text-transform-uppercase
              font-custom-general
            "
          >
            I. {{ $t('wim.print.long-6') }}
          </p>
        </div>
        <table
          style="width: 100%; white-space: unset !important"
          class="font-14 fw-300 font-custom-general border-collapse table-overflow"
        >
          <thead class="text-align-center">
            <tr class="border-b-1">
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.axis-type') }}
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.weight-number') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.error') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.ton') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                <div>{{ $t('wim.print.allowed-weight') }}</div>
                <div>[{{ $t('wim.print.ton') }}]</div>
              </th>
              <th class="border-r-1 border-collapse sheet-width-11">
                {{ $t('wim.print.mass-overload')
                }}<span>[{{ $t('wim.print.ton') }}]</span>
              </th>
              <th class="border-collapse sheet-width-11">
                <div>{{ $t('wim.print.mass-overload') }}</div>
                <div>(%)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(axle, i) in axles" :key="i">
              <td class="border-r-1 border-collapse">
                {{ axle.AxleType }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ axle.AxleWeight }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ axle.AxleWeightError }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ axle.AxleWeightAfterError }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                <span class="sheet-width-input">
                  {{ axle.AllowAxleWeight }}
                </span>
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ axle.AxleWeightOverload }}
              </td>
              <td class="border-collapse text-align-right fw-700">
                {{ axle.AxlePercentOverload }}
              </td>
            </tr>
            <tr class="border-t-1 fw-700">
              <td class="border-r-1 border-collapse">
                {{ $t('wim.print.total') }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalWeight, 2)) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalWeightError, 2)) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{
                  numberWithCommas(changeFixed(totalAxleWeightAfterError, 2))
                }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(totalAllowAxleWeight) }}
              </td>
              <td class="border-r-1 border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalAxleWeightOverload, 2)) }}
              </td>
              <td class="border-collapse text-align-right">
                {{ numberWithCommas(changeFixed(totalAxlePercentOverload, 1)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="text-align-center border-b-1">
          <p
            class="
              font-16
              fw-700
              text-transform-uppercase
              pl-1
              font-custom-general
            "
          >
            II. {{ $t('wim.print.long-7') }}
          </p>
        </div>
        <table
          style="width: 100%; white-space: unset"
          class="font-14 fw-300 font-custom-general border-collapse"
        >
          <thead class="text-align-center">
            <tr class="border-b-1">
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.stock-weight') }}
              </th>
              <th class="border-r-1 border-collapse sheet-width-33">
                {{ $t('wim.print.stock-overload') }}
              </th>
              <th
                class="border-collapse sheet-width-33
              "
              >
                {{ $t('wim.print.percent-overload') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-1">
              <td class="border-r-1 border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ KLhangCCcanDuoc }}
                  <div class="sheet-relative-right">
                    <span>[{{ $t('wim.print.ton') }}]</span>
                  </div>
                </div>
              </td>
              <td class="border-r-1 border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ vuotKLhang }}
                  <span class="sheet-relative-right"
                    >[{{ $t('wim.print.ton') }}]</span
                  >
                </div>
              </td>
              <td class="border-collapse">
                <div class="sheet-relative text-align-center">
                  {{ phanTramKLHHCCvuot }}
                  <span class="sheet-relative-right" style="font-style: italic"
                    >(%)</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-1 mt-sheet-2">
        <div class="sheet-d-flex flex-response-wrap">
          <div class="border-r-1 sheet-width-33 sheet-width-response-100">
            <div class="text-align-center">
              <p
                class="font-16 fw-700 pl-1 font-custom-general"
                style="white-space: unset !important"
              >
                III. {{ $t('wim.print.long-8') }}
                <span style="text-transform: lowercase">[m]</span>
              </p>
            </div>
          </div>
          <div class="sheet-width-66 sheet-width-response-100">
            <table
              style="width: 100%; white-space: unset"
              class="border-collapse font-14 fw-300 font-custom-general"
            >
              <thead style="">
                <tr class="border-b-1">
                  <th class="border-r-1 border-collapse sheet-width-50">
                    {{ $t('wim.print.pack-overload') }}
                  </th>
                  <th class="sheet-width-50 white-space-response-nowrap">
                    {{ $t('wim.print.trunk-overload') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border-r-1 border-collapse">
                    <div class="sheet-d-flex">
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuDaiKichThuocBaoVuot }}</span
                      >
                      x
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuRongKichThuocBaoVuot }}</span
                      >
                      x
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuCaoKichThuocBaoVuot }}
                      </span>
                    </div>
                  </td>
                  <td style="border-collapse: collapse">
                    <div class="sheet-d-flex">
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuDaiThungHangDoDuoc }}</span
                      >x
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuRongThungHangDoDuoc }}</span
                      >x
                      <span
                        class="sheet-width-input text-align-center"
                        style="flex: 1"
                      >
                        {{ chieuCaoThungHangDoDuoc }}</span
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-sheet-2 ml-2">
        <p class="font-16 fw-700 text-transform-uppercase font-custom-general">
          IV. {{ $t('wim.print.conclusion') }}
        </p>
        <p class="font-15 fw-700 font-custom-general">
          1. {{ $t('wim.print.allowed-weight-overload') }}:
          {{ xeVuotTongTrongLuongCauDuong }} %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          2. {{ $t('wim.print.allowed-axis-overload') }}: {{ maxXeVuotTai }} %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          3. {{ $t('wim.print.allowed-stock-overload') }}:
          <span>{{ phanTramKLHHCCCPTGGT }}</span> %
        </p>
        <p class="font-15 fw-700 font-custom-general">
          4. {{ $t('wim.print.vehicle-overload') }}:
          {{ $t('wim.print.overload-pack-size') }} <span>{{ overBag }}</span> m;
          {{ $t('wim.print.overload-trunk-size') }} <span>{{ overBin }}</span> m
        </p>
        <p class="font-15 fw-700 font-custom-general">
          5. {{ $t('wim.print.no-violate') }}!
        </p>
      </div>
      <div
        class="sheet-d-flex flex-response-wrap"
        style="margin-top: 12px; display: flex"
      >
        <div class="sheet-width-55 sheet-width-response-100"></div>
        <div class="sheet-width-45">
          <div class="sheet-width-50">
            <p class="font-16 fw-700 font-custom-general text-align-center">
              {{ $t('wim.print.creator') }}
            </p>
            <p
              class="
                font-14 font-italic
                fw-700
                text-align-center
                font-custom-general
              "
            >
              ({{ $t('wim.print.sign') }})
            </p>
            <p class="font-18 fw-700 text-align-center font-custom-general">
              {{ Wim_Creator }}
            </p>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
// import {
//   addReportVim,
//   editReportVim,
//   getVehicleTypeActive,
// } from '@/api/modules/wimAPI'
import wimAPI from '@/api/modules/wimAPI'
import { validationMixin } from 'vuelidate'
const { required, maxLength, minLength } = require('vuelidate/lib/validators')
import handling from '@/constants/handling'
export default {
  props: [
    'pCodeId',
    'dataForm',
    'pReferenceId',
    'pAxleDatas',
    'pLane',
    'pFrontImgLicenseplate',
    'pBehindImgLicenseplate',
    'pLicenseplate',
    'pTrailerLicenseplate',
    'pTotalAlex',
    'pVehicleOwnerName',
    'pVehicleSpeed',
    'pVehicleType',
    'pHeight',
    'pLength',
    'pWeight',
    'pWidth',
    'pWimPercentOverload',
    'pWimWeightOverload',
    'pTimeIn',
    'pDateTime',
    'isEdit',
    'isNew',
    'pDrivingLicense',
    'pGoodsPercentOverload',
    'pGoodsWeightOverload',
    'pGoodsWeight',
    'pGoodsWeight',
    'pTrailerDragWeightAllow',
    'pTrailerHeight',
    'pTrailerLength',
    'pTrailerWeight',
    'pTrailerWheelBase',
    'pTrailerWidth',
    'pVehicleCirculationLicense',
    'pVehicleColor',
    'pVehicleDragHeight',
    'pVehicleDragLength',
    'pVehicleDragWeightAllow',
    'pVehicleDragWidth',
    'pVehicleDriverName',
    'pVehicleHeight',
    'pVehicleIsTankTruck',
    'pVehicleLength',
    'pVehiclePeopleAllow',
    'pVehicleWeight',
    'pVehicleWheelBase',
    'pVehicleWidth',
    'pWimCreator',
    'pWimDragHeight',
    'pWimDragLength',
    'pWimDragWidth',
    'pBridgePercentOverload',
    'pBridgeAxialPercentOverload',
    'pCargoVolumePercentOverload',
    'pNote',
  ],
  data() {
    return {
      changeTypeChieuDai: 'text',
      changeTypeChieuDaiSMRM: 'text',
      optionType: [],
      //fill
      axles:
        this.pAxleDatas &&
        this.pAxleDatas[0].hasOwnProperty('AxleWeightOverload')
          ? this.pAxleDatas.map((item) => {
              return {
                ...item,
                AxleWeight: this.changeFixed(item.AxleWeight, 2),
                AxleWeightError: this.changeFixed(item.AxleWeightError, 2),
                AxleWeightAfterError: this.changeFixed(
                  item.AxleWeightAfterError,
                  2,
                ),
                AxleWeightOverload: this.changeFixed(
                  item.AxleWeightOverload,
                  2,
                ),
                AxlePercentOverload: this.changeFixed(
                  item.AxlePercentOverload,
                  2,
                ),
              }
            })
          : this.pAxleDatas.map((item) => {
              return {
                ...item,
                AxleWeight: this.changeFixed(item.AxleWeight, 2),
                AxleWeightError: this.changeFixed(0, 2),
                AxleWeightAfterError: this.changeFixed(0, 2),
                AxleWeightOverload: this.changeFixed(0, 2),
                AxlePercentOverload: this.changeFixed(0, 2),
                AllowAxleWeight: 0,
              }
            }),
      lane: this.pLane,
      licenseplate: this.pLicenseplate,
      BKSSMRM: this.pTrailerLicenseplate
        ? this.pTrailerLicenseplate
        : 'Chờ cập nhật',
      img1: this.pFrontImgLicenseplate,
      img2: this.pBehindImgLicenseplate,
      totalAlex: this.pTotalAlex,
      vehicleOwnerName: this.pVehicleOwnerName,
      vehicleSpeed: this.pVehicleSpeed,
      vehicleType: +this.pVehicleType ? +this.pVehicleType : 0,
      height: this.pHeight,
      length: this.pLength,
      weight: this.pWeight,
      width: this.pWidth,
      percentOverload: this.pWimPercentOverload,
      weightOverload: this.pWimWeightOverload,
      timeIn: this.pTimeIn,
      dateTime: this.pDateTime,
      //input
      lyTrinh: 'KM1859+715 QL1 Tuyến tránh, TP. Biên Hòa, Tỉnh Đồng Nai',
      soPhieuCan: this.pReferenceId ?? '',
      mauXePhiaTruoc: this.pVehicleColor ?? '',
      xiTec: this.pVehicleIsTankTruck ?? '',
      tenLX: this.pVehicleDriverName ?? '',
      GPLX: this.pDrivingLicense ?? '',
      GPLHX: this.pVehicleCirculationLicense ?? '',
      modeWim: 'Cân Động',
      khoiLuongBanThanOto: this.pVehicleWeight ?? '',
      khoiLuongBanThanSMRM: this.pTrailerWeight ?? '',
      khoiLuongChoPhepTrenOto: this.pVehiclePeopleAllow ?? '',
      khoiLuongHHCC: this.pTrailerDragWeightAllow ?? '',
      chieuDaiOTo: this.pVehicleLength ?? '',
      chieuRongOTo: this.pVehicleWidth ?? '',
      chieuCaoOTo: this.pVehicleHeight ?? '',
      chieuDaiXeKeo: this.pTrailerLength ?? '',
      chieuRongXeKeo: this.pTrailerWidth ?? '',
      chieuCaoXeKeo: this.pTrailerHeight ?? '',
      chieuDaiOTo1: this.pVehicleWheelBase ?? '',
      chieuDaiXeKeo1: this.pTrailerWheelBase ?? '',
      chieuDaiKTThungHang: this.pVehicleDragLength ?? '',
      chieuRongKTThungHang: this.pVehicleDragWidth ?? '',
      chieuCaoKTThungHang: this.pVehicleDragHeight ?? '',
      kichThuocThungVuot: '',
      Wim_Creator: this.pWimCreator ?? '',
      note: this.pNote ?? '',
      kichThuocBaoVuot: '',
      chieuDaiKichThuocBaoVuot: this.pLength ?? '',
      chieuRongKichThuocBaoVuot: this.pWidth ?? '',
      chieuCaoKichThuocBaoVuot: this.pHeight ?? '',
      chieuDaiThungHangDoDuoc: this.pWimDragLength ?? '',
      chieuRongThungHangDoDuoc: this.pWimDragWidth ?? '',
      chieuCaoThungHangDoDuoc: this.pWimDragHeight ?? '',
      CodeID: this.pCodeId ?? '',
      xeVuotTongTrongLuongCauDuong: this.pBridgePercentOverload ?? 0,
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      username: {
        minLength: minLength(3),
        required,
      },
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(3),
      },
    },
  },
  computed: {
    overBag() {
      if (
        this.chieuDaiKichThuocBaoVuot &&
        this.chieuRongKichThuocBaoVuot &&
        this.chieuCaoKichThuocBaoVuot
      ) {
        return this.numberWithCommas(
          this.chieuDaiKichThuocBaoVuot *
            this.chieuRongKichThuocBaoVuot *
            this.chieuCaoKichThuocBaoVuot,
        )
      }
      return 0
    },
    overBin() {
      if (
        this.chieuDaiThungHangDoDuoc &&
        this.chieuRongThungHangDoDuoc &&
        this.chieuCaoThungHangDoDuoc
      ) {
        return this.numberWithCommas(
          this.chieuDaiThungHangDoDuoc *
            this.chieuRongThungHangDoDuoc *
            this.chieuCaoThungHangDoDuoc,
        )
      }
      return 0
    },
    vehicleTypeCustom() {
      let str = ''
      this.optionType.forEach((x) => {
        if (x.value === this.vehicleType) {
          str = x.text
          return str
        }
      })
      return str
    },
    maxXeVuotTai() {
      let arrNew = []
      if (this.axles && this.axles.length > 0) {
        this.axles.forEach((item) => {
          const itemRemoveComma = item.AxlePercentOverload.replace(/,/g, '')
          arrNew.push(itemRemoveComma)
        })
        return '' + Math.max(...arrNew) === 'Infinity' ||
          '' + Math.max(...arrNew) === 'NaN'
          ? this.changeFixed(0, 1)
          : this.numberWithCommas(this.changeFixed(Math.max(...arrNew), 1))
      }
    },
    KLhangCCcanDuoc() {
      if (this.khoiLuongBanThanOto && this.khoiLuongChoPhepTrenOto) {
        return this.totalAxleWeightAfterError -
          this.khoiLuongBanThanOto -
          this.khoiLuongChoPhepTrenOto * 0.065 >
          0
          ? this.numberWithCommas(
              this.changeFixed(
                this.totalAxleWeightAfterError -
                  this.khoiLuongBanThanOto -
                  this.khoiLuongChoPhepTrenOto * 0.065,
                2,
              ),
            )
          : this.changeFixed(0, 2)
      }
      return 0
    },
    vuotKLhang() {
      if (this.KLhangCCcanDuoc && this.khoiLuongHHCC) {
        return this.KLhangCCcanDuoc - this.khoiLuongHHCC > 0
          ? this.numberWithCommas(
              this.changeFixed(this.KLhangCCcanDuoc - this.khoiLuongHHCC, 2),
            )
          : this.changeFixed(0, 2)
      }
      return 0
    },
    phanTramKLHHCCvuot() {
      if (this.vuotKLhang && this.khoiLuongHHCC) {
        return (this.vuotKLhang / this.khoiLuongHHCC) * 100 > 0
          ? this.numberWithCommas(
              this.changeFixed((this.vuotKLhang / this.khoiLuongHHCC) * 100, 1),
            )
          : this.changeFixed(0, 1)
      }
      return 0
    },
    phanTramKLHHCCCPTGGT() {
      if (
        this.totalAxleWeightAfterError &&
        this.khoiLuongBanThanOto &&
        this.khoiLuongBanThanSMRM &&
        this.totalPeopleAllow &&
        this.khoiLuongHHCC
      ) {
        let total =
          this.totalAxleWeightAfterError -
          (this.khoiLuongBanThanOto +
            this.khoiLuongBanThanSMRM +
            Number(this.totalPeopleAllow) +
            this.khoiLuongHHCC)
        return total > 0
          ? this.numberWithCommas(
              this.changeFixed((total / this.khoiLuongHHCC) * 100, 1),
            )
          : this.changeFixed(0, 1)
      }
      return this.changeFixed(0, 1)
    },
    totalPeopleAllow() {
      return this.changeFixed(this.khoiLuongChoPhepTrenOto * 0.065, 2)
    },
    totalWeight() {
      if (this.axles && this.axles.length > 0) {
        return this.axles.reduce((from, to) => from + Number(to.AxleWeight), 0)
      }
      return this.changeFixed(0, 1)
    },
    totalWeightError() {
      if (this.axles && this.axles.length > 0) {
        return this.axles.reduce(
          (from, to) => from + Number(to.AxleWeightError),
          0,
        )
      }
      return 0
    },
    totalAxleWeightAfterError() {
      if (this.axles && this.axles.length > 0) {
        return this.axles.reduce(
          (from, to) => from + Number(to.AxleWeightAfterError),
          0,
        )
      }
      return 0
    },
    totalAllowAxleWeight() {
      if (this.axles && this.axles.length > 0) {
        return this.axles.reduce(
          (from, to) => from + Number(to.AllowAxleWeight),
          0,
        )
      }
      return 0
    },
    totalAxleWeightOverload() {
      if (this.axles && this.axles.length > 0) {
        return this.axles.reduce(
          (from, to) => from + Number(to.AxleWeightOverload),
          0,
        )
      }
      return 0
    },
    totalAxlePercentOverload() {
      if (
        this.axles &&
        this.axles.length > 0 &&
        this.totalAxleWeightOverload &&
        this.totalAllowAxleWeight
      ) {
        return (
          (Number(this.totalAxleWeightOverload) /
            Number(this.totalAllowAxleWeight)) *
          100
        )
      }
      return 0
    },
  },
  async created() {
    this.changeTwoBind(this.xeVuotTongTrongLuongCauDuong)
    await this.getOptionVehicleType()
  },
  methods: {
    formatInput(e) {
      document.getElementById('xiTec').value = document
        .getElementById('xiTec')
        .value.replace(/[^0-1]/g, '')
        .replace(/(.{1})/g, '$1 ')
        .trim()
      this.xiTec = document.getElementById('xiTec').value
    },
    changeTwoBind(e) {
      this.xeVuotTongTrongLuongCauDuong = String(e)
        .replace(/,/g, '')
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    revertFloatChange(id) {
      document.getElementById(id).value =
        '' + this.revertFloat(document.getElementById(id).value)
    },
    convertFloat(n) {
      return Number(n)
        .toFixed(1)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    revertFloat(n) {
      return handling.revertFloat(n)
    },
    convertFloatChange(id = null) {
      if (id) {
        document.getElementById(id).value = +Math.abs(
          document.getElementById(id).value,
        )
        document.getElementById(id).value = this.convertFloat(
          this.revertFloat(document.getElementById(id).value),
        )
        this.xeVuotTongTrongLuongCauDuong = document.getElementById(id).value
        this.numberWithCommas(
          this.changeFixed(Number(this.xeVuotTongTrongLuongCauDuong), 1),
        )
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    changeFixed(value, number) {
      return value.toFixed(number)
    },
    getOptionVehicleType() {
      wimAPI.getVehicleTypeActive()
        .then((val) => {
          this.optionType = []
          let result = val.status ? val.data : null
          if (result) {
            result.forEach((e) => {
              let obj = {
                text: e.VehicleTypeName,
                value: e.VehicleTypeID,
              }
              this.optionType.push(obj)
            })
          }
        })
        .catch((err) => console.log(err))
    },
    printSheet() {
      this.$htmlToPaper('print-template')
    },
    reloadParentData(val, ID) {
      this.$emit('reload-data', val, ID)
    },
    createReportVim() {
      let body = {
        ReferenceID: this.pReferenceId,
        LaneNumber: this.lane,
        Front_Imglicenseplate: this.img1,
        Behind_Imglicenseplate: this.img2,
        Licenseplate: this.licenseplate ? this.licenseplate : 'Chờ cập nhật',
        TrailerLicenseplate: this.BKSSMRM ? this.BKSSMRM : 'Chờ cập nhật',
        VehicleType: this.vehicleType,
        Total_Alex: this.totalAlex,
        Vehicle_Color: this.mauXePhiaTruoc
          ? this.mauXePhiaTruoc
          : 'Chờ cập nhật',
        Vehicle_Is_Tank_Truck: Number(this.xiTec) ? +this.xiTec : 0,
        Vehicle_OwnerName: this.vehicleOwnerName
          ? this.vehicleOwnerName
          : 'Chờ cập nhật',
        Vehicle_DriverName: this.tenLX ? this.tenLX : 'Chờ cập nhật',
        DrivingLicense: this.GPLX ? this.GPLX : 'Chờ cập nhật',
        VehicleCirculationLicense: this.GPLHX ? this.GPLHX : 'Chờ cập nhật',
        Vehicle_Speed: this.vehicleSpeed,
        InputDate: this.dateTime,
        Vehicle_Weight: this.khoiLuongBanThanOto ? this.khoiLuongBanThanOto : 0,
        Trailer_Weight: this.khoiLuongBanThanSMRM
          ? this.khoiLuongBanThanSMRM
          : 0, // khoiluongbanthanxekeo
        Vehicle_People_Allow: this.khoiLuongChoPhepTrenOto
          ? this.khoiLuongChoPhepTrenOto
          : 0, // khoiluongchophepoto
        Trailer_Drag_Weight_Allow: this.khoiLuongHHCC ? this.khoiLuongHHCC : 0, // khoiluongkeotheochophepcuaxekeo
        Vehicle_Length: this.chieuDaiOTo ? this.chieuDaiOTo : 0,
        Vehicle_Width: this.chieuRongOTo ? this.chieuRongOTo : 0,
        Vehicle_Height: this.chieuCaoOTo ? this.chieuCaoOTo : 0,
        Trailer_Length: this.chieuDaiXeKeo ? this.chieuDaiXeKeo : 0,
        Trailer_Width: this.chieuRongXeKeo ? this.chieuRongXeKeo : 0,
        Trailer_Height: this.chieuCaoXeKeo ? this.chieuCaoXeKeo : 0,
        Vehicle_Wheel_Base: this.chieuDaiOTo1
          ? '' + this.chieuDaiOTo1
          : 'Chờ cập nhật', // Chiều dài cơ sở ô tô
        Trailer_Wheel_Base: this.chieuDaiXeKeo1
          ? '' + this.chieuDaiXeKeo1
          : 'Chờ cập nhật', //Chiều dài cơ sở xe kéo
        Vehicle_Drag_Length: this.chieuDaiKTThungHang
          ? this.chieuDaiKTThungHang
          : 0, //KTthung
        Vehicle_Drag_Width: this.chieuRongKTThungHang
          ? this.chieuRongKTThungHang
          : 0, //KTthunghang
        Vehicle_Drag_Height: this.chieuCaoKTThungHang
          ? this.chieuCaoKTThungHang
          : 0, //KTthunghang
        Wim_Weight: this.totalWeight,
        Wim_Weight_Overload: this.totalAxleWeightOverload,
        Wim_Percent_Overload: this.totalAxlePercentOverload,
        Wim_Length: this.chieuDaiKichThuocBaoVuot,
        Wim_Width: this.chieuRongKichThuocBaoVuot,
        Wim_Height: this.chieuCaoKichThuocBaoVuot,
        Wim_Drag_Length: this.chieuDaiThungHangDoDuoc
          ? this.chieuDaiThungHangDoDuoc
          : 0,
        Wim_Drag_Width: this.chieuRongThungHangDoDuoc
          ? this.chieuRongThungHangDoDuoc
          : 0,
        Wim_Drag_Height: this.chieuCaoThungHangDoDuoc
          ? this.chieuCaoThungHangDoDuoc
          : 0,
        Goods_weight: this.revertFloat('' + this.KLhangCCcanDuoc),
        Goods_Weight_Overload: this.revertFloat('' + this.vuotKLhang),
        Goods_Percent_Overload: this.revertFloat('' + this.phanTramKLHHCCvuot),
        Wim_Creator: this.Wim_Creator ? this.Wim_Creator : 'Chờ cập nhật',
        Bridge_Percent_Overload: this.revertFloat(
          document.getElementById('BridgePercentOverload').value,
        ),
        Bridge_Axial_Percent_Overload: this.revertFloat(this.maxXeVuotTai),
        Cargo_Volume_Percent_Overload: this.revertFloat(
          this.phanTramKLHHCCCPTGGT,
        ),
        Awning_Size: this.overBag ? this.revertFloat(this.overBag) : 0,
        Container_Overheight: this.overBin ? this.revertFloat(this.overBin) : 0,
        AxleDatas: this.axles.map((item) => {
          return {
            ...item,
            AxleWeight: +('' + item.AxleWeight).replace(/,/g, ''),
            AxleWeightError: +('' + item.AxleWeightError).replace(/,/g, ''),
            AxleWeightAfterError: +('' + item.AxleWeightAfterError).replace(
              /,/g,
              '',
            ),
            AllowAxleWeight: +('' + item.AllowAxleWeight).replace(/,/g, ''),
            AxleWeightOverload: +('' + item.AxleWeightOverload).replace(
              /,/g,
              '',
            ),
            AxlePercentOverload: +('' + item.AxlePercentOverload).replace(
              /,/g,
              '',
            ),
          }
        }),
        Note: this.note ? this.note : 'Chờ cập nhật',
      }
      if (this.isNew == 1 && this.isEdit == 0) {
        wimAPI.addReportVim(body)
          .then((val) => {
            if (val.status) {
              this.$bvModal.hide('modal-printe-vim-form')
              this.reloadParentData(val, this.pReferenceId)
              setTimeout(() => {
                this.makeToast(
                  'success',
                  this.$t('toast.success').toUpperCase(),
                  val.message,
                )
              }, 500)
            } else {
              this.makeToast(
                'danger',
                this.$t('toast.fail').toUpperCase(),
                val.message,
              )
            }
          })
          .catch((err) => console.log(err))
      } else {
        wimAPI.editReportVim(body)
          .then((val) => {
            if (val.status) {
              this.$bvModal.hide('modal-printe-vim-form')
              this.reloadParentData(val, this.pReferenceId)
              setTimeout(() => {
                this.makeToast(
                  'success',
                  this.$t('toast.success').toUpperCase(),
                  val.message,
                )
              }, 500)
            } else {
              this.makeToast(
                'danger',
                this.$t('toast.fail').toUpperCase(),
                val.message,
              )
            }
          })
          .catch((err) => console.log(err))
      }
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      })
    },
  },
}
</script>

<style lang="css" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.sheet-custom-input {
  padding: unset !important;
  border: unset !important;
  background-color: #d6d6d6 !important;
}
.sheet-d-flex {
  display: flex;
}

.sheet-width-input {
  width: 100%;
}

.sheet-width-input-small {
  width: 100px;
}

.sheet-d-flex sup {
  top: 0.5em !important;
}

.font-custom-general {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: 'Times New Roman', Times, serif;
  white-space: nowrap;
}

.font-18 {
  font-size: 18px;
}

.font-17 {
  font-size: 17px;
}

.font-16 {
  font-size: 16px;
}

.font-15 {
  font-size: 15px;
}

.font-14 {
  font-size: 14px;
}

.fw-300 {
  font-weight: 300;
}

.fw-400 {
  font-weight: 400;
}

.fw-500 {
  font-weight: 500;
}

.fw-600 {
  font-weight: 600;
}

.fw-700 {
  font-weight: 700;
}

.text-align-right {
  text-align: right;
}

.text-align-center {
  text-align: center;
}

.text-transform-uppercase {
  text-transform: uppercase;
}

.font-italic {
  font-style: italic;
}

.ml-1 {
  margin-left: 4px;
}

.ml-4 {
  margin-left: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mt-sheet-2 {
  margin-top: 8px;
}

.pl-1 {
  padding-left: 2px;
}

.border-r-1 {
  border-right: 1px solid black;
}

.border-b-1 {
  border-bottom: 1px solid black;
}

.border-t-1 {
  border-top: 1px solid black;
}

.border-l-1 {
  border-left: 1px solid black;
}

.border-1 {
  border: 1px solid black;
}

.border-collapse {
  border-collapse: collapse;
}

.flex-1 {
  flex: 1;
}

.print-img {
  height: 250px;
}

.sheet-header-left {
  width: 70%;
}

.sheet-header-right {
  width: 30%;
}

.sheet-width-50 {
  width: 50%;
}

.sheet-width-25 {
  width: 25%;
}

.sheet-width-33 {
  width: 33.33%;
}

.sheet-width-11 {
  width: 11.11%;
}

.sheet-width-66 {
  width: 66.66%;
}

.sheet-width-100 {
  width: 100%;
}

.sheet-width-10 {
  width: 10%;
}

.height-100 {
  height: 100%;
}

.sheet-relative {
  position: relative;
}

.sheet-relative-right {
  top: 0;
  right: 0;
  position: absolute;
}

.sheet-width-45 {
  width: 45%;
}

.sheet-width-55 {
  width: 55%;
}

.sheet-justify-space-between {
  justify-content: space-between;
}

.sheet-align-items-center {
  align-items: center;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .font-custom-general {
    white-space: unset;
  }

  .sheet-d-flex-responsive {
    display: flex;
  }

  .margin-top-sheet-1 {
    margin-top: 4px;
  }

  .sheet-header-left {
    width: 100%;
  }

  .flex-direction-column {
    flex-direction: column;
  }

  .justify-space-center {
    justify-content: center;
  }

  .sheet-header-right {
    width: 100%;
  }

  .text-md {
    font-size: 12px;
  }

  .text-lg {
    font-size: 14px;
    font-family: 'Courier New', Courier, monospace;
  }

  .margin-left-10 {
    margin-left: 5%;
  }

  .top-right-button-container {
    float: right !important;
  }

  .table-condensed {
    font-size: 12px;
  }

  .custom-h1 {
    font-size: 1rem;
    padding-top: 0.5rem;
  }

  .sheet-d-unset {
    display: unset;
  }

  .sheet-width-response-100 {
    width: 100%;
  }

  .flex-response-wrap {
    flex-wrap: wrap;
  }

  .white-space-response-nowrap {
    white-space: nowrap;
  }

  .height-response-unset {
    height: unset;
  }

  .print-img {
    height: 150px;
  }

  .table-overflow {
    overflow-x: auto;
    display: block;
    white-space: nowrap;
  }

  .mt-response-2 {
    margin-top: 8px;
  }

  .sheet-width-10 {
    width: 50%;
  }
}

/* Tablet: width >= 740px and width < 1024px  */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .gap-5 {
    gap: 12px;
  }

  .font-custom-general {
    white-space: unset;
  }

  .sheet-d-flex-responsive {
    display: flex;
  }

  .margin-top-sheet-1 {
    margin-top: 4px;
  }

  .sheet-header-left {
    width: 100%;
  }

  .flex-direction-column {
    flex-direction: column;
  }

  .justify-space-center {
    justify-content: center;
  }

  .sheet-header-right {
    width: 100%;
  }

  .text-md {
    font-size: 12px;
  }

  .text-lg {
    font-size: 14px;
    font-family: 'Courier New', Courier, monospace;
  }

  .margin-left-10 {
    margin-left: 5%;
  }

  .top-right-button-container {
    float: right !important;
  }

  .table-condensed {
    font-size: 12px;
  }

  .custom-h1 {
    font-size: 1rem;
    padding-top: 0.5rem;
  }

  .sheet-d-unset {
    display: unset;
  }

  .sheet-width-response-100 {
    width: 100%;
  }

  .flex-response-wrap {
    flex-wrap: wrap;
  }

  .white-space-response-nowrap {
    white-space: nowrap;
  }

  .height-response-unset {
    height: unset;
  }

  .print-img {
    height: 150px;
  }

  .table-overflow {
    overflow-x: auto;
    display: block;
    white-space: nowrap;
  }

  .mt-response-2 {
    margin-top: 8px;
  }
}
</style>
