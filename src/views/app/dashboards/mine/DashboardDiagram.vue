<template>
  <div>
    <b-row>
      <b-colxx md="12" class="mb-4">
        <b-card no-body>
          <b-card-body class="p-0">
            <div style="overflow: hidden">
              <div ref="divPDF">
                <div id="svg_custom"></div>
                <pdf ref="pdfComponent" :src="urlPDF" @loaded="onLoad"></pdf>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { BASE_API } from "@/constants/config";
import pdf from "vue-pdf";
import panzoom from "panzoom";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      private: "NamLong2020",
      language: localStorage.getItem("currentLanguage"),
      connection: null,
      resultSocket: null,
      timeSocket: handling.getDateTimeNow(),
      urlPDF: "https://pdf.namlongtekgroup.com/OriginalMap.pdf",
      widthPDF: 792,
      heightPDF: 612,
      bufferPDF: null,
    };
  },
  methods: {
    svgCustom(defaultWidth, defaultHeight, arrayData) {
      let svgDiv = document.getElementById("svg_custom");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", svgDiv.offsetWidth);
      svg.setAttribute("height", svgDiv.offsetHeight);

      if (arrayData && arrayData.length > 0) {
        arrayData.forEach((element, index) => {
          console.log(index, element);
          let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle.setAttribute(
            "cx",
            (svgDiv.offsetWidth / defaultWidth) * element.PointX
          );
          circle.setAttribute(
            "cy",
            svgDiv.offsetHeight -
              (svgDiv.offsetHeight / defaultHeight) * element.PointY
          );
          circle.setAttribute("r", "7");
          circle.setAttribute("fill", element.IsColorWarning);
          circle.setAttribute("stroke", "#000");
          circle.setAttribute("stroke-width", "0.7");
          svg.appendChild(circle);

          let rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          rect.setAttribute("x");
          rect.setAttribute(
            "y",
            svgDiv.offsetHeight -
              (svgDiv.offsetHeight / defaultHeight) * element.PointY -
              (15 + 15 * element.Indicators.length)
          );
          rect.setAttribute("height", 5 + 15 * element.Indicators.length);
          rect.setAttribute("width", "70");
          rect.setAttribute("fill", "#000");
          rect.setAttribute("stroke", "#000");
          rect.setAttribute("stroke-width", "0.7");
          svg.appendChild(rect);

          element.Indicators.forEach((_element, _index) => {
            let text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            text.setAttribute(
              "x",
              (svgDiv.offsetWidth / defaultWidth) * element.PointX - 30
            );
            text.setAttribute(
              "y",
              svgDiv.offsetHeight -
                (svgDiv.offsetHeight / defaultHeight) * element.PointY -
                (_index + 1) * 16
            );
            text.setAttribute("fill", _element.IsWarningColor);
            text.setAttribute("font-size", "smaller");
            text.setAttribute("font-weight", "bolder");
            text.innerHTML =
              _element.IndicatorValue < 0
                ? _element.IndicatorCode + ": " + "ERROR"
                : _element.IndicatorCode +
                  ": " +
                  _element.IndicatorValue +
                  " " +
                  _element.UnitName;
            svg.appendChild(text);
          });
        });
      }
      document.getElementById("svg_custom").appendChild(svg);
    },
    onLoad() {
      panzoom(this.$refs.divPDF);
    },
    listenData(data) {
      this.resultSocket =
        data.statusCode === 200 && data.errorCode === "0" ? data.result : null;
      var list = document.getElementById("svg_custom");
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      this.svgCustom(this.widthPDF, this.heightPDF, this.resultSocket);
    },
    funcExec(privateKey, languageKey) {
      if (this.connection.state === "Connected") {
        this.connection
          .invoke("GetWorkTask", languageKey, privateKey)
          .catch((err) => {
            console.log(err);
          });
        this.timeSocket = handling.getDateTimeNow();
      }
      setTimeout(() => {
        this.funcExec(privateKey, languageKey);
      }, 1000);
    },
    startSocket() {
      let startedPromise = this.connection.start().catch((err) => {
        return new Promise((resolve, reject) =>
          setTimeout(() => this.startSocket().then(resolve).catch(reject), 5000)
        );
      });
      return startedPromise;
    },
  },
  created() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${BASE_API}/WorkStep`)
      .configureLogging(LogLevel.Information)
      .build();
    this.connection.on("ReceiveMessage", (data) => {
      this.listenData(data);
    });
    // this.connection.onclose(() => this.start());
    this.startSocket();
  },
  mounted() {
    this.funcExec(this.private, this.language);
  },
  beforeDestroy() {
    this.connection.stop();
  },
};
</script>
<style>
#svg_custom {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 55555555;
  top: 0;
  left: 0;
}
</style>
