<template>
  <div style="cursor: pointer">
    <b-row>
      <b-col lg="4" class="mb-4">
        <b-card
          :header="$t('dashboards.tree-categories')"
          header-bg-variant="primary"
          header-border-variant="primary"
          class="card-tree-analytics"
        >
          <div>
            <pie-chart-apex
              :pie-chart="dataChart.category"
              v-if="dataChart.category"
            />
          </div>
        </b-card>
      </b-col>
      <b-col lg="4" class="mb-4">
        <b-card
          :header="$t('dashboards.tree-group')"
          header-bg-variant="primary"
          header-border-variant="primary"
          class="card-tree-analytics"
        >
          <div>
            <pie-chart-apex
              :pie-chart="dataChart.group"
              v-if="dataChart.group"
            />
          </div>
        </b-card>
      </b-col>
      <b-col lg="4" class="mb-4">
        <b-card
          :header="$t('dashboards.tree-status')"
          header-bg-variant="primary"
          header-border-variant="primary"
          class="card-tree-analytics"
        >
          <div>
            <pie-chart-apex
              :pie-chart="dataChart.status"
              v-if="dataChart.status"
            />
          </div>
        </b-card>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card
          :header="$t('dashboards.tree-analytics')"
          header-bg-variant="primary"
          header-border-variant="primary"
          class="card-tree-analytics"
        >
          <div>
            <column-chart-apex
              :column-chart="dataChart.column"
              v-if="dataChart.column"
            ></column-chart-apex>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import PieChartApex from "@/components/Charts/PieChartApex";
import ColumnChartApex from "@/components/Charts/ColumnChartApex";
import treeAPI from "@/api/modules/treeAPI";
import { ThemeColors } from "@/utils";

const colors = ThemeColors();

export default {
  components: {
    "pie-chart-apex": PieChartApex,
    "column-chart-apex": ColumnChartApex,
  },
  data() {
    return {
      timer,
      dataChart: {
        category: null,
        group: null,
        status: null,
        column: null,
      },
    };
  },
  methods: {
    getDataChart() {
      treeAPI
        .treeDashboardAnalytics()
        .then((val) => {
          if (val.status) {
            let category = val.data[0].ChartRoundCategotys;
            let group = val.data[0].ChartRoundTreeGroups;
            let status = val.data[0].ChartRoundTreeStatus;
            let column = val.data[0].ChartColumnTrees;
            if (category && category.length > 0) {
              let categoryLabel = [];
              let categoryData = [];
              for (let i = 0; i < category.length; i++) {
                categoryLabel.push(category[i].Name);
                categoryData.push(category[i].Total);
              }
              this.dataChart.category = {
                series: categoryData,
                labels: categoryLabel,
              };
            }
            if (group && group.length > 0) {
              let groupLabel = [];
              let groupData = [];
              for (let j = 0; j < group.length; j++) {
                groupLabel.push(group[j].Name);
                groupData.push(group[j].Total);
              }
              this.dataChart.group = {
                series: groupData,
                labels: groupLabel,
              };
            }
            if (status && status.length > 0) {
              let statusLabel = [];
              let statusData = [];
              for (let k = 0; k < status.length; k++) {
                statusLabel.push(status[k].Name);
                statusData.push(status[k].Total);
              }
              this.dataChart.status = {
                series: statusData,
                labels: statusLabel,
              };
            }
            if (column && column.length > 0) {
              let columnData = [];
              for (let l = 0; l < column.length; l++) {
                let obj = {
                  name: column[l].Name,
                  data: [column[l].Total],
                };
                columnData.push(obj);
              }
              this.dataChart.column = {
                series: columnData,
              };
            }
          } else {
            this.dataChart = {
              category: null,
              group: null,
              status: null,
              column: null,
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDataChart(time) {
      this.getDataChart();
      setTimeout(() => {
        this.timerLoadDataChart(time);
      }, time);
    },
  },
  async created() {
    await this.timerLoadDataChart(this.timer * 240);
  },
};
</script>
<style scoped>
.card-tree-analytics .card-header {
  padding-top: 0.75rem;
  font-size: 16px;
}
</style>
