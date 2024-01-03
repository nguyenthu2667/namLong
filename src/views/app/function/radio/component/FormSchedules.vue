<template>
  <div>
    <form ref="form" @submit.stop.prevent="emitSubmit">
      <b-row>
        <b-col lg="3">
          <b-form-group :label="'Mã chương trình:'">
            <b-form-input
              :id="'ID-input'"
              value="AUTO"
              disabled
              class="text-center"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="9">
          <b-form-group :label="'Tên chương trình:'">
            <b-form-input :id="'Name-input'" v-model="form.Name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="7" class="mb-2">
          <div class="text-muted" style="font-size: 14px">
            <strong>Thông tin nguồn phát</strong>
          </div>
          <div class="separator mb-2" />
          <b-card no-body style="min-height: 105px; overflow: auto">
            <b-tabs fill>
              <b-tab
                title="Bảng Tin"
                :active="form['IsNews'] == 1 ? true : false"
                class="mt-3"
                @click="handleChangeTabActive('IsNews')"
              >
                <template #title>
                  <strong> <i class="far fa-newspaper"></i> Bảng Tin</strong>
                </template>
                <b-form-file
                  :placeholder="$t('report.action.file') + '...'"
                  v-model="form.News"
                  :file-name-formatter="formatNames"
                  :browse-text="$t('browse-text')"
                  accept="audio/*"
                  multiple
                ></b-form-file>
                <AudioPlayerList
                  :data="form.LinkNews"
                  :dataBase64="NewsBase64"
                  :keyString="'News'"
                  @watch-sort="handleWatchSort"
                ></AudioPlayerList>
              </b-tab>
              <b-tab
                title="Tiếp Sóng"
                class="mt-3"
                @click="handleChangeTabActive('IsRelay')"
                :active="form['IsRelay'] == 1 ? true : false"
              >
                <template #title>
                  <strong>
                    <i class="fas fa-broadcast-tower"></i> Tiếp Sóng
                  </strong>
                </template>
                <b-form-select
                  class="text-left"
                  v-model="form.RelayID"
                  :options="optionsReplay"
                  size="sm"
                  :id="'RelayID-input'"
                ></b-form-select>
                <div style="border: 1px solid #d7d7d7" class="mt-1">
                  <b-card
                    no-body
                    style="height: 242px; overflow: auto"
                    class="d-flex justify-content-center align-items-center"
                  >
                    <div
                      class="text-center text-muted"
                      v-if="optionsReplay && optionsReplay.length > 0"
                    >
                      <strong>
                        {{
                          optionsReplay.find((e) => e.value == form.RelayID)
                            ? optionsReplay.find((e) => e.value == form.RelayID)
                                .text
                            : "Dữ liệu không tồn tại !"
                        }}
                      </strong>
                    </div>
                  </b-card>
                </div>
              </b-tab>
              <b-tab
                title="FM"
                class="mt-3"
                @click="handleChangeTabActive('IsFMTransceiver')"
                :active="form['IsFMTransceiver'] == 1 ? true : false"
              >
                <template #title>
                  <strong> <i class="fad fa-radio-alt mr-1"></i>FM </strong>
                </template>
                <b-form-select
                  class="text-left"
                  v-model="form.FMTransceiverID"
                  :options="optionsFM"
                  size="sm"
                  :id="'RelayID-input'"
                ></b-form-select>
                <div style="border: 1px solid #d7d7d7" class="mt-1">
                  <b-card
                    no-body
                    style="height: 242px; overflow: auto"
                    class="d-flex justify-content-center align-items-center"
                  >
                    <div
                      class="text-center text-muted"
                      v-if="optionsFM && optionsFM.length > 0"
                    >
                      <strong>
                        {{
                          optionsFM.find((e) => e.value == form.FMTransceiverID)
                            ? optionsFM.find(
                                (e) => e.value == form.FMTransceiverID
                              ).text
                            : "Dữ liệu không tồn tại !"
                        }}
                      </strong>
                    </div>
                  </b-card>
                </div>
              </b-tab>
              <b-tab
                title="Ghi Âm"
                class="mt-3"
                @click="handleChangeTabActive('IsRecordingFiles')"
                :active="form['IsRecordingFiles'] == 1 ? true : false"
              >
                <template #title>
                  <strong><i class="fas fa-microphone"></i> Ghi Âm </strong>
                </template>
                <div
                  class="
                    content-microphone
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  style="height: 163px"
                >
                  <div class="text-center">
                    <VueRecordAudio
                      ref="refVueRecordAudio"
                      :mode="'press'"
                      @stream="onStream"
                      @result="onResult"
                    />
                    <audio controls hidden></audio>
                    <div class="text-center text-muted">
                      <strong>Bật/tắt ghi âm</strong>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab
                title="Văn Bản"
                class="mt-3"
                @click="handleChangeTabActive('IsTextNewsletter')"
                :active="form['IsTextNewsletter'] == 1 ? true : false"
              >
                <template #title>
                  <strong><i class="fas fa-print"></i> Văn Bản </strong>
                </template>
                <b-form-file
                  :placeholder="$t('report.action.file') + '...'"
                  v-model="form.TextNewsletter"
                  :file-name-formatter="formatNames"
                  :browse-text="$t('browse-text')"
                  accept="audio/*"
                  multiple
                ></b-form-file>
                <AudioPlayerList
                  :data="form.LinkTextNewsletter"
                  :dataBase64="LinkTextNewsletterBase64"
                  :keyString="'TextNewsletter'"
                  @watch-sort="handleWatchSort"
                ></AudioPlayerList>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col lg="5">
          <div class="text-muted" style="font-size: 14px">
            <strong>Thông tin lịch phát</strong>
          </div>
          <div class="separator mb-2" />
          <b-row>
            <b-col lg="6">
              <b-form-group :label="'Chế độ:'" class="mt-2">
                <b-form-radio-group
                  v-model="form.IsReplay"
                  :options="optionsMode"
                  name="radio-inline"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group :label="'Thời gian bắt đầu:'" class="mt-2">
                <b-form-timepicker
                  class="cus-form-group"
                  v-model="timeNow"
                  :locale="locale"
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
            <b-col :lg="form.IsReplay == 1 ? 6 : 12">
              <b-form-group :label="'Ngày bắt đầu:'">
                <b-form-datepicker
                  :id="'StartAt-input'"
                  :locale="locale"
                  v-model="form.StartAt"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col lg="6" v-if="form.IsReplay == 1 ? true : false">
              <b-form-group :label="'Ngày kết thúc:'">
                <b-form-datepicker
                  :id="'EndAt-input'"
                  :locale="locale"
                  v-model="form.EndAt"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col
              lg="12"
              v-if="form.IsReplay == 1 ? true : false"
              class="mb-3"
            >
              <div class="d-flex">
                <b-form-checkbox class="mr-2" v-model="isSelectedAll"
                  ><span style="font-weight: 600">Tất Cả (Ngày)</span>
                </b-form-checkbox>
              </div>
              <b-form-checkbox-group
                id="checkbox-group"
                v-model="selectedDay"
                :options="optionsDay"
                name="checkbox-group"
              ></b-form-checkbox-group>
            </b-col>
            <b-col lg="6">
              <b-form-group :label="'Thời lượng phát (phút)'">
                <b-form-spinbutton
                  v-model="form.Duration"
                  min="1"
                  max="10000"
                ></b-form-spinbutton> </b-form-group
            ></b-col>
            <b-col lg="6">
              <b-form-group :label="'Âm lượng: '">
                <b-form-spinbutton
                  v-model="form.VocalStrength"
                  min="0"
                  max="100"
                ></b-form-spinbutton>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="'Ghi chú:'">
            <b-form-textarea
              :id="'Note-input'"
              class="text-left"
              v-model="form.Note"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <span>
            <b-form-checkbox v-model="isSelectTableAll" size="md" class="mb-2">
              <b>{{ $t("all").toUpperCase() }} (CHỌN VỊ TRÍ PHÁT)</b>
            </b-form-checkbox>
          </span>
          <b-table
            :responsive="true"
            :sticky-header="true"
            :no-border-collapse="true"
            :bordered="true"
            :hover="true"
            :items="dataTable"
            :fields="fieldTable"
            selectable
            selectedVariant="primary"
            select-mode="multi"
            head-variant="light"
            class="mb-0"
            thead-class="text-center"
            style="height: 220px; overflow: auto"
          >
            <template v-slot:cell(Actions)="row">
              <b-form-checkbox
                v-if="isShow"
                v-model="row.item.IsSelected"
                @change="handleChangeIsSelect(row.item)"
                size="md"
              ></b-form-checkbox>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import radioAPI from "@/api/modules/radioAPI";
import AudioPlayerList from "@/components/Audio/AudioPlaylist.vue";
import { VueRecordAudio } from "@codekraft-studio/vue-record";

// if (signalR) {
//   var connection = new signalR.HubConnectionBuilder()
//     .withUrl("http://system.namlongtekgroup.com/streamHub", {
//       headers: {
//         APIKEY: "664106681A98FAA1BA91BC90F44F72F5",
//       },
//       withCredentials: true,
//     })
//     .build();
// }

export default {
  props: ["dataForm", "type", "id"],
  components: {
    AudioPlayerList,
    VueRecordAudio,
  },
  data() {
    return {
      isShow: true,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      date: moment().format("YYYY-MM-DD"),
      isSelectedAll: false,
      isSelectTableAll: false,
      optionsMode: [
        { text: "Một lần", value: 0 },
        { text: "Lặp lại", value: 1 },
      ],
      selectedDay: [],
      optionsDay: [
        { text: "CN", value: 1 },
        { text: "T2", value: 2 },
        { text: "T3", value: 3 },
        { text: "T4", value: 4 },
        { text: "T5", value: 5 },
        { text: "T6", value: 6 },
        { text: "T7", value: 7 },
      ],
      optionsReplay: [],
      optionsFM: [],
      form: this.dataForm ?? {
        Name: "",
        IsReplay: 0, //0: một lần |1:lặp lại
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        CN: 0,
        Hour: moment(new Date()).format("HH"),
        Minute: moment(new Date()).format("mm"),
        StartAt: moment().format("YYYY-MM-DD"),
        EndAt: moment().format("YYYY-MM-DD"),
        VocalStrength: 50, //âm lượng
        Duration: 1, //thời lượng
        IsNews: 1, //bảng tin
        News: [], //arrfile
        LinkNews: [], //links
        IsRelay: 0, //tiếp sóng
        RelayID: 4, //bind options
        IsFMTransceiver: 0, //FM
        FMTransceiverID: 0, //bind options
        IsTextNewsletter: 0, //văn bản
        TextNewsletter: [], //arrfile
        LinkTextNewsletter: [], //links
        IsRecordingFiles: 0, //ghi âm
        RecordingFiles: [], //arrfile
        LinkRecordingFiles: [], //links
        Note: "",
        Details: [], //arrID
      },
      NewsBase64: [],
      LinkRecordingFilesBase64: [],
      LinkTextNewsletterBase64: [],
      dataTable: [],
      fieldTable: [
        {
          key: "Actions",
          label: "Chọn",
          tdClass: "text-center",
        },
        {
          key: "StationName",
          label: "Tên",
        },
        {
          key: "StationAddress",
          label: "Địa chỉ",
        },
        {
          key: "Note",
          label: "Ghi Chú",
        },
      ],
      timeNow: "",
      //ghi âm
      isInterval: null,
      mediaRecorder: null,
    };
  },
  watch: {
    "form.News"(arr) {
      for (const file of arr) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        setTimeout(() => {
          this.form.LinkNews.push(file.name);
          this.NewsBase64.push({
            name: file.name,
            url: reader.result,
            type: file.type,
            isPlay: false,
          });
        }, 500);
      }
    },
    "form.RecordingFiles"(arr) {
      for (const file of arr) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        setTimeout(() => {
          this.form.LinkRecordingFiles.push(file.name);
          this.LinkRecordingFilesBase64.push({
            name: file.name,
            url: reader.result,
            type: file.type,
            isPlay: false,
          });
        }, 500);
      }
    },
    "form.TextNewsletter"(arr) {
      for (const file of arr) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        setTimeout(() => {
          this.form.LinkTextNewsletter.push(file.name);
          this.LinkTextNewsletterBase64.push({
            name: file.name,
            url: reader.result,
            type: file.type,
            isPlay: false,
          });
        }, 500);
      }
    },
    selectedDay(days) {
      this.form.CN = 0;
      this.form.T2 = 0;
      this.form.T3 = 0;
      this.form.T4 = 0;
      this.form.T5 = 0;
      this.form.T6 = 0;
      this.form.T7 = 0;
      days.forEach((value) => {
        if (value == 1) {
          this.form.CN = 1;
        }
        if (value == 2) {
          this.form.T2 = 1;
        }
        if (value == 3) {
          this.form.T3 = 1;
        }
        if (value == 4) {
          this.form.T4 = 1;
        }
        if (value == 5) {
          this.form.T5 = 1;
        }
        if (value == 6) {
          this.form.T6 = 1;
        }
        if (value == 7) {
          this.form.T7 = 1;
        }
      });
    },
    timeNow(time) {
      this.form.Hour = parseInt(moment(time, "HH:mm:ss").format("HH"));
      this.form.Minute = parseInt(moment(time, "HH:mm:ss").format("mm"));
    },
    isSelectedAll(bol) {
      if (bol == true) {
        this.selectedDay = this.optionsDay.map((d) => d.value);
      } else {
        this.selectedDay = [];
      }
    },
    isSelectTableAll(bol) {
      this.isShow = false;
      if (bol == true) {
        this.dataTable.forEach((item) => {
          if (item.IsSelected == false) {
            item.IsSelected = true;
            this.add(item);
          }
        });
      } else {
        this.form.Details = [];
        this.dataTable.forEach((detail) => {
          detail.IsSelected = false;
        });
      }
      setTimeout(() => {
        this.isShow = true;
      }, 50);
    },
  },
  async created() {
    await this.getDataTable();
    await this.getOptionRelay();
    await this.getOptionFM();
    await this.handleDefaultDay();
    this.timeNow = `${this.form.Hour}:${this.form.Minute}`;
    //ghi âm lắng nghe
    // await connection.on("SendToClient", (value) => {
    //   console.log("SendToClient", value);
    // });
  },
  async destroyed() {
    await this.onResult(); // tắt
  },
  methods: {
    //ghi âm
    async onStream(stream) {
      console.log("start stream:", stream);

      // await connection.start();

      const audioEl = document.getElementsByTagName("audio")[0];
      audioEl.srcObject = stream;
      audioEl.play();

      const stations = ["Saab", "Volvo", "BMW"];
      // this.$socket.send("StartStream", stations);
      // connection.send("StartStream", stations);

      this.mediaRecorder = new MediaRecorder(stream);
      // console.log(1, "mediaRecorder", this.mediaRecorder);
      this.mediaRecorder.start();
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.isInterval = setInterval(() => {
        this.mediaRecorder?.requestData();
      }, 500);
    },
    async handleDataAvailable(event) {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      let reader = new FileReader();
      await reader.readAsDataURL(event.data);

      setTimeout(() => {
        if (reader.readyState == 2) {
          // console.log(1, "b64 =>", reader.result.split(",")[1]);
          const b64 = reader.result.split(",")[1];
          // this.$socket.send("TransferStream", b64);
          // if (connection.state == "Connected") {
          //   connection.send("TransferStream", b64);
          // } else {
          //   console.log("lưu phần else này vào bộ nhớ tạm");
          // }
        }
      }, 300);
    },

    async onResult(data) {
      console.log("off stream return", data);
      this.mediaRecorder.stop();
      clearInterval(this.isInterval);
      // await connection.stop();
    },
    //
    handleWatchSort(newArr, key) {
      if (key.toUpperCase() == "NEWS") {
        let arrSorted = [];
        let arrString = [];
        newArr.forEach((a) => {
          this.form.LinkNews.forEach((link) => {
            if (typeof link == "object" && a.STT == link.STT) {
              arrSorted.push(link);
            }
          });
        });
        this.form.LinkNews.forEach((link) => {
          if (typeof link == "string") {
            arrString.push(link);
          }
        });
        setTimeout(() => {
          if (arrSorted?.length > 0) {
            this.form.LinkNews = [...arrSorted, ...arrString];
          }
        }, 500);
      }
      if (key.toUpperCase() == "RECORDINGFILES") {
        let arrSorted = [];
        let arrString = [];
        newArr.forEach((a) => {
          this.form.LinkRecordingFiles.forEach((link) => {
            if (typeof link == "object" && a.STT == link.STT) {
              arrSorted.push(link);
            }
          });
        });
        this.form.LinkRecordingFiles.forEach((link) => {
          if (typeof link == "string") {
            arrString.push(link);
          }
        });
        setTimeout(() => {
          if (arrSorted?.length > 0) {
            this.form.LinkRecordingFiles = [...arrSorted, ...arrString];
          }
        }, 500);
      }
      if (key.toUpperCase() == "TEXTNEWSLETTER") {
        let arrSorted = [];
        let arrString = [];
        newArr.forEach((a) => {
          this.form.LinkTextNewsletter.forEach((link) => {
            if (typeof link == "object" && a.STT == link.STT) {
              arrSorted.push(link);
            }
          });
        });
        this.form.LinkTextNewsletter.forEach((link) => {
          if (typeof link == "string") {
            arrString.push(link);
          }
        });
        setTimeout(() => {
          if (arrSorted?.length > 0) {
            this.form.LinkTextNewsletter = [...arrSorted, ...arrString];
          }
        }, 500);
      }
    },
    emitSubmit() {
      this.$emit("submit", this.form, this.type, this.id);
    },
    emitSubmitDelete() {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + " ?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.$emit("submit", this.form, "delete", this.id);
          }
        });
    },
    handleDefaultDay() {
      if (this.form.CN == 1) {
        this.selectedDay.push(1);
      }
      if (this.form.T2 == 1) {
        this.selectedDay.push(2);
      }
      if (this.form.T3 == 1) {
        this.selectedDay.push(3);
      }
      if (this.form.T4 == 1) {
        this.selectedDay.push(4);
      }
      if (this.form.T5 == 1) {
        this.selectedDay.push(5);
      }
      if (this.form.T6 == 1) {
        this.selectedDay.push(6);
      }
      if (this.form.T7 == 1) {
        this.selectedDay.push(7);
      }
    },
    handleChangeIsSelect(item) {
      if (item.IsSelected == true) {
        this.add(item);
      } else {
        this.remove(item);
      }
    },
    add(item) {
      let id = item.StationID;
      this.form.Details.push(id);
    },
    remove(item) {
      const index = this.form.Details.findIndex((id) => id == item.StationID);
      this.form.Details.splice(index, 1);
    },
    handleChangeTabActive(key) {
      this.form.IsNews = 0;
      this.form.IsRelay = 0;
      this.form.IsFMTransceiver = 0;
      this.form.IsTextNewsletter = 0;
      this.form.IsRecordingFiles = 0;
      this.form[key] = 1;
    },
    getDataTable() {
      radioAPI
        .getRadioListActive()
        .then((val) => {
          this.dataTable = val.status ? val.data : [];
          this.dataTable.forEach((e) => (e.IsSelected = false));
          if (this.isSelectTableAll) {
            this.form.Details = [];
            this.dataTable.forEach((e) => {
              e.IsSelected = true;
              this.form.Details.push(e.StationID);
            });
          } else {
            this.form.Details.forEach((id) => {
              this.dataTable.forEach((e) => {
                if (e.StationID == id) {
                  e.IsSelected = true;
                }
              });
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getOptionRelay() {
      radioAPI
        .radioRelayListActive()
        .then((val) => {
          this.optionsReplay = [];
          let array = val.status ? val.data : [];
          for (const obj of array) {
            let item = {
              text: obj.RelayName,
              value: obj.RelayID,
            };
            this.optionsReplay.push(item);
          }
        })
        .catch((err) => console.log(err));
    },
    getOptionFM() {
      radioAPI
        .radioFMListActive()
        .then((val) => {
          this.optionsFM = [];
          let array = val.status ? val.data : [];
          for (const obj of array) {
            let item = {
              text: obj.FMTransceiverName,
              value: obj.FMTransceiverID,
            };
            this.optionsFM.push(item);
          }
        })
        .catch((err) => console.log(err));
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} ${this.$t("report.action.file")}`;
    },
  },
};
</script>

<style>
.cus-form-group button {
  margin-top: -3px;
}
</style>
<style>
.b-form-btn-label-control.form-control > .form-control {
  white-space: nowrap;
}
</style>
