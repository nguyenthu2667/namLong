<script>
import { Line, Bar } from 'vue-chartjs'
import { addCommas } from '@/utils'

export default {
  extends: Line,
  // extends: Bar,
  props: ['labelDate', 'data'],
  data() {
    return {
      gradientCustom: null,
      gradient: null,
      gradient2: null,
      gradient3: null,
      gradient4: null,
      gradient5: null,
      gradient6: null,
    }
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient3 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient4 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient5 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient6 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.gradient3.addColorStop(0, 'rgba(89, 224, 197, 1)')
    this.gradient3.addColorStop(0.5, 'rgba(89, 224, 197, 0.25)')
    this.gradient3.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.gradient4.addColorStop(0, 'rgba(115, 180, 255, 1)')
    this.gradient4.addColorStop(0.5, 'rgba(115, 180, 255, 0.5)')
    this.gradient4.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.gradient5.addColorStop(0, 'rgba(255, 203, 128, 1)')
    this.gradient5.addColorStop(0.5, 'rgba(255, 203, 128, 0.25)')
    this.gradient5.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.gradient6.addColorStop(0, 'rgba(255, 134, 154, 1)')
    this.gradient6.addColorStop(0.5, 'rgba(255, 134, 154, 0.25)')
    this.gradient6.addColorStop(1, 'rgba(0, 231, 255, 0)')

    console.log(this.data);

    this.data.forEach((item, index) => {
      console.log('item.backgroundColor', item.backgroundColor);
      // item.backgroundColor = undefined
      if (index == 0) {
        if (item.backgroundColor) {
          // console.log('item.backgroundColor', item.backgroundColor);
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          console.log('dfdfdf');
          item.backgroundColor = this.gradient2
        }
      }
      if (index == 1) {
        if (item.backgroundColor) {
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          item.backgroundColor = this.gradient5
        }
      }
      if (index == 2) {
        if (item.backgroundColor) {
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          item.backgroundColor = this.gradient6
        }
      }
      if (index == 3) {
        if (item.backgroundColor) {
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          item.backgroundColor = this.gradient4
        }
      }
      if (index == 4) {
        if (item.backgroundColor) {
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          item.backgroundColor = this.gradient3
        }
      }
      if (index == 5) {
        if (item.backgroundColor) {
          this.gradientCustom = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450)
          this.gradientCustom.addColorStop(0, item.backgroundColor[0])
          this.gradientCustom.addColorStop(0.5, item.backgroundColor[1])
          this.gradientCustom.addColorStop(1, 'rgba(0, 231, 255, 0)')
          item.backgroundColor = this.gradientCustom
        } else {
          item.backgroundColor = this.gradient1
        }
      }
    })

    this.renderChart(
      {
        labels: this.labelDate,
        datasets: this.data,
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value, index, values) => {
                  return addCommas(value)
                },
              },
            },
          ],
        },
        tooltips: {
          enabled: true,
          // callbacks: {
          //   label: (tooltipItems, data) => {
          //     return (
          //       tooltipItems.xLabel + ': ' + addCommas(tooltipItems.yLabel)
          //     )
          //   },
          // },
        },
      },
    )
  },
}
</script>
