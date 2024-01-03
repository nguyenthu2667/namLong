<template>
  <div>
    <form>
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
            <b-form-group :label="field.label + ':'">
              <b-form-select
                class="text-left"
                v-model="field.value"
                :options="dataFormOptions[field.name]"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.type == 'COLOR'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <color-picker v-model="field.value" @change="changeColor">
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
                id="cus-checkbox"
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
            v-else-if="field.type == 'MUTEDBIT'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-radio
                v-model="field.value"
                :value="1"
              >
                {{$t('npl.button.yes')}}
              </b-form-radio>
              <b-form-radio
                v-model="field.value"
                :value="0"
              >
                {{$t('npl.button.no')}}
              </b-form-radio>
            </b-form-group>
          </b-col>
          <b-col
            v-else-if="field.name.toUpperCase() == 'FILELINK'"
            :key="i"
            :md="field.sizeCol"
            :lg="field.sizeCol"
          >
            <b-form-group :label="field.label + ':'">
              <b-form-file
                plain
                v-model="inputedFile"
              />
              <div
                v-if="!inputedFile && validFisrt"
                class="text-danger text-right text-small"
              >
                {{ $t('dashboards.cannot-be-left-blank') }}
              </div>
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
                :locale="locale"
                v-model="field.value"
                required
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
                class="text-left"
                v-model="field.value"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col v-else :key="i" :md="field.sizeCol" :lg="field.sizeCol">
            <b-form-group :label="field.label + ':'">
              <b-form-input
                class="text-left"
                v-model="field.value"
              ></b-form-input>
              <div
                v-if="field.isValid && validFisrt"
                class="text-danger text-right text-small"
              >
                {{ $t('dashboards.cannot-be-left-blank') }}
              </div>
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
          {{$t('npl.button.cancel').toUpperCase()}}
        </b-button>
        <b-button
          v-if="type == 'add'"
          class="t-btn"
          variant="success"
          @click="emitSubmit"
        >
          <i class="fas fa-plus"></i>
          {{$t('npl.button.add').toUpperCase()}}
        </b-button>
        <b-button
          v-if="type != 'add'"
          class="t-btn"
          variant="danger"
          @click="emitSubmitDelete"
        >
          <i class="fas fa-trash-alt"></i>
          {{$t('npl.button.delete').toUpperCase()}}
        </b-button>
        <b-button
          v-if="type == 'edit'"
          class="t-btn"
          variant="warning"
          @click="emitSubmit"
        >
          <i class="fas fa-edit"></i>
          {{$t('npl.button.update').toUpperCase()}}
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['dataForm', 'dataFormOptions', 'type', 'id'],
  name: 'form-dynamic',
  data() {
    return {
      validFisrt: false,
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
      inputedFile: null,
    }
  },
  methods: {
    changeColor() {
      console.log('changeColor')
    },
    checkValid() {
      this.validFisrt = true
      let result = false
      this.dataForm.forEach((field) => {
        if(field.name.toUpperCase() == 'NOTE') {
          field.isValid = false
        }
        else if(field.value === 0) {
          field.isValid = false
        }
        else if (field.name.toUpperCase() == 'FILELINK' && this.inputedFile) {
          field.isValid = false
        }
        else if(field.name.toUpperCase() == 'FILELINK' && this.inputedFile === null) {
          field.isValid = true
          result = true
        }
        else if (!field.value || field.value == '') {
          console.log(field);
          result = true
          field.isValid = true
        }
        else {
          field.isValid = false
        }
      })
      return result
    },
    async emitSubmit() {
      if (this.checkValid()) return
      const fileIndex = this.dataForm.findIndex(item => item.name.toUpperCase() == 'FILELINK')
      if(fileIndex !== -1 && this.inputedFile) {
        const base64 = await this.getBase64(this.inputedFile)
          const fileLink = {
          name: 'FileLink',
          value: base64.split(',')[1]
        }
        const exactFileName = {
          name: 'ExactFileName',
          value: this.inputedFile.name
        }
        const payload = [
          ...this.dataForm,
          fileLink,
          exactFileName
        ]
        this.$emit('submit', payload, this.type, this.id)
      }
      else {
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
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
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
