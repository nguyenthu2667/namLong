<template>
  <div>
    <form ref="form" @submit.stop.prevent="emitSubmit">
      <b-row>
        <template v-for="(field, i) in dataForm">
          <b-col
            v-if="field.type == 'KEY'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-input
                :id="field.name + '-input'"
                class="text-center"
                v-model="field.value"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'SELECT'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group
              :label="field.label + ':'"
              :label-for="field.name + '-input'"
              :invalid-feedback="$t('form.please-invalid') + field.label"
              :state="stateForm[field.name]"
            >
              <b-form-select
                class="text-left"
                v-model="field.value"
                :options="dataFormOptions[field.name]"
                size="sm"
                :id="field.name + '-input'"
                required
                :state="stateForm[field.name]"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'SELECT-MULTI'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <multiselect
                :showLabels="false"
                v-model="field.value"
                :options="dataFormOptions[field.name]"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Mời bạn chọn.."
                label="text"
                track-by="text"
                @select="onSelectMulti($event)"
                @remove="onRemoveSelectMulti($event)"
              >
                <span class="checkbox-label" slot="option" slot-scope="scope">
                  <input
                    class="mr-1"
                    type="checkbox"
                    v-model="scope.option.checked"
                    @focus.prevent
                  />{{ scope.option.text }}
                </span>
              </multiselect>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'COLOR'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <color-picker
                :id="field.name + '-input'"
                v-model="field.value"
                @change="changeColor"
              >
              </color-picker>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'BIT'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-checkbox
                :id="field.name + '-input'"
                v-model="field.value"
                switch
                size="md"
              >
                <template v-if="field.value == true">
                  <slot name="bitTrue"></slot>
                </template>
                <template v-else>
                  <slot name="bitFalse"></slot>
                </template>
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'DATE'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-datepicker
                :id="field.name + '-input'"
                :locale="locale"
                v-model="field.value"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'NUMBER'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-input
                :id="field.name + '-input'"
                class="text-left"
                v-model.number="field.value"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'NOTE' || field.type == 'DESCRIPTION'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-textarea
                :id="field.name + '-input'"
                class="text-left"
                v-model="field.value"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col v-else :key="i" :md="field.sizeCol" :lg="field.sizeCol">
            <b-form-group
              :label="field.label + ':'"
              :label-for="field.name + '-input'"
              :invalid-feedback="$t('form.please-invalid') + field.label"
              :state="stateForm[field.name]"
            >
              <b-form-input
                class="text-left"
                v-model="field.value"
                :id="field.name + '-input'"
                required
                :state="stateForm[field.name]"
                @input="checkFormValidityModal"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </template>
      </b-row>
      <div class="text-right">
        <b-button
          class="t-btn"
          variant="secondary"
          @click="
            () => {
              $bvModal.hide(type)
            }
          "
        >
          <i class="fas fa-undo"></i>
          {{ $t('npl.button.cancel').toUpperCase() }}
        </b-button>
        <b-button
          v-if="type == 'add'"
          class="t-btn"
          variant="success"
          @click="emitSubmit"
        >
          <i class="fas fa-plus"></i>
          {{ $t('npl.button.add').toUpperCase() }}
        </b-button>
        <b-button
          v-if="type != 'add'"
          class="t-btn"
          variant="danger"
          @click="emitSubmitDelete"
        >
          <i class="fas fa-trash-alt"></i>
          {{ $t('npl.button.delete').toUpperCase() }}
        </b-button>
        <b-button
          v-if="type == 'edit'"
          class="t-btn"
          variant="warning"
          @click="emitSubmit"
        >
          <i class="fas fa-edit"></i>
          {{ $t('npl.button.update').toUpperCase() }}
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import Multiselect from 'vue-multiselect'

export default {
  props: ['dataForm', 'dataFormOptions', 'type', 'id'],
  name: 'form-dynamic',
  components: {
    Multiselect,
  },
  data() {
    return {
      locale:
        !localStorage.getItem('currentLanguage') ||
        localStorage.getItem('currentLanguage') === 'vn'
          ? 'vi'
          : localStorage.getItem('currentLanguage'),
      time: moment().format('HH:mm'),
      locale:
        !localStorage.getItem('currentLanguage') ||
        localStorage.getItem('currentLanguage') === 'vn'
          ? 'vi'
          : localStorage.getItem('currentLanguage'),
      date: moment().format('YYYY-MM-DD'),
    }
  },
  computed: {
    stateForm() {
      let obj = {}
      for (const o of this.dataForm) {
        obj[`${o.name}`] = null
      }
      return obj
    },
  },
  methods: {
    changeColor() {
      console.log('changeColor')
    },
    onSelectMulti(option) {
      option.checked = true
    },
    onRemoveSelectMulti(option) {
      option.checked = false
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity()
      let pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g //chek phone
      for (const o of this.dataForm) {
        if (o.type.toUpperCase() == 'NOTE') {
          //no-valid
        } else if (
          o.type.toUpperCase() == 'STRING' ||
          o.type.toUpperCase() == 'SELECT' ||
          o.type.toUpperCase() == 'DATE'
        ) {
          //valid
          const keyID = o.name + '-input'
          this.stateForm[o.name] = document
            .getElementById(keyID)
            .checkValidity()
        }
      }
      return valid
    },
    emitSubmit() {
      if (!this.checkFormValidityModal()) {
        this.makeToast(
          'danger',
          this.$t('toast.fail').toUpperCase(),
          this.$t('dashboards.cannot-be-left-blank'),
        )
        return
      } else {
        this.$emit('submit', this.dataForm, this.type, this.id)
      }
    },
    emitSubmitDelete() {
      this.$bvModal
        .msgBoxConfirm(this.$t('form.question') + ' ?', {
          title: this.$t('form.warning').toUpperCase(),
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: this.$t('form.yes'),
          cancelTitle: this.$t('form.no'),
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.$emit('submit', this.dataForm, 'delete', this.id)
          }
        })
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

<style lang="scss" scoped>
.t-btn {
  font-weight: 580;
}
</style>
<style>
.multiselect__tags {
  border-radius: 0px;
  height: 43px;
  overflow: auto;
}
.multiselect__tag {
  background: #fff;
  color: black;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid gray;
}
.multiselect__content-wrapper {
  font-size: 13px;
  font-weight: 500;
}
</style>
