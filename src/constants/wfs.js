import L from "leaflet";
import { listRegion } from "@/data/latlngRegions";
import { defaultRegionCode } from "@/constants/config";

const requestWFS = {
  getDataTypeTable(value, layer) {
    let objectData = {
      url: "https://tomcat.namlongtekgroup.com/geoserver/wfs",
      workspace: "NLG-" + defaultRegionCode,
      urlWorkspace: "nam-long-gis-" + listRegion[defaultRegionCode].url,
      type: layer,
      data: {},
    };
    let keyID = layer.toLowerCase() + "id";
    let keyLat = layer.toLowerCase() + "lat";
    let keyLng = layer.toLowerCase() + "lng";
    let keyName = layer.toLowerCase() + "name";
    let keyAddress = layer.toLowerCase() + "address";
    objectData.data[keyID] = value["StationID"];
    objectData.data[keyLat] = value["Lat"];
    objectData.data[keyLng] = value["Long"];
    objectData.data[keyName] = value["StationName"];
    objectData.data[keyAddress] = value["StationAddress"];
    return objectData;
  },
  getDataTypeForm(value, layer) {
    let objectData = {
      url: "https://tomcat.namlongtekgroup.com/geoserver/wfs",
      workspace: "NLG-" + defaultRegionCode,
      urlWorkspace: "nam-long-gis-" + listRegion[defaultRegionCode].url,
      type: layer,
      data: {},
    };

    let keyID = layer.toLowerCase() + "id";
    let keyLat = layer.toLowerCase() + "lat";
    let keyLng = layer.toLowerCase() + "lng";
    let keyName = layer.toLowerCase() + "name";
    let keyAddress = layer.toLowerCase() + "address";
    objectData.data[keyID] = value["StationID"][1];
    objectData.data[keyLat] = value["StationLat"][1];
    objectData.data[keyLng] = value["StationLong"][1];
    objectData.data[keyName] = value["Name"][1];
    if (!value["Address"]) {
      objectData.data[keyAddress] = "";
    } else {
      objectData.data[keyAddress] = value["Address"][1];
    }

    return objectData;
  },
  getMarker(state, type, BBOX, number) {
    let rootUrl, defaultParameters, parameters;
    let serverGeo = "NLG-" + state;
    rootUrl =
      "https://tomcat.namlongtekgroup.com/geoserver/" + serverGeo + "/ows";
    defaultParameters = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: serverGeo + ":" + type,
      outputFormat: "application/json",
      SrsName: "EPSG:4326",
      bbox: BBOX,
      maxFeatures: number,
    };
    parameters = L.Util.extend(defaultParameters);
    return rootUrl + L.Util.getParamString(parameters);
  },
  getPoint(BBOX, type, region) {
    let rootUrl, defaultParameters, parameters;
    let _newType = "NLG-" + region;
    if (BBOX === null) {
      rootUrl =
        "https://tomcat.namlongtekgroup.com/geoserver/" + _newType + "/ows";
      defaultParameters = {
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature",
        typeName: _newType + ":" + type,
        outputFormat: "application/json",
        SrsName: "EPSG:4326",
      };
      parameters = L.Util.extend(defaultParameters);
    } else {
      rootUrl =
        "https://tomcat.namlongtekgroup.com/geoserver/" + _newType + "/ows";
      defaultParameters = {
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature",
        typeName: _newType + ":" + type,
        outputFormat: "application/json",
        SrsName: "EPSG:4326",
        bbox: BBOX,
      };
      parameters = L.Util.extend(defaultParameters);
    }
    return rootUrl + L.Util.getParamString(parameters);
  },
  async insertPoint(url, workspace, urlWorkspace, data, layer) {
    let success = false;
    let keyID = layer.toLowerCase() + "id";
    let keyLat = layer.toLowerCase() + "lat";
    let keyLng = layer.toLowerCase() + "lng";
    let keyName = layer.toLowerCase() + "name";
    let keyAddress = layer.toLowerCase() + "address";
    let body =
      '<Transaction xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:' +
      workspace +
      '="' +
      urlWorkspace +
      '" xmlns:gml="http://www.opengis.net/gml" version="1.0.0" services="WFS" xsi:schemaLocation="http://www.opengis.net/wfs http://tomcat.namlongtekgroup.com/geoserver/schemas/wfs/1.0.0/WFS-transaction.xsd">\
        <Insert>\
          <' +
      workspace +
      ":" +
      layer +
      ">\
            <" +
      workspace +
      ':geom>\
              <gml:Point srsName="EPSG:4326">\
                <gml:coordinates decimal="." cs="," ts=" ">' +
      parseFloat(data[keyLng]) +
      "," +
      parseFloat(data[keyLat]) +
      "</gml:coordinates>\
              </gml:Point>\
            </" +
      workspace +
      ":geom>\
            <" +
      workspace +
      ":" +
      keyID +
      ">" +
      data[keyID] +
      "</" +
      workspace +
      ":" +
      keyID +
      ">\
            <" +
      workspace +
      ":" +
      keyLat +
      ">" +
      parseFloat(data[keyLat]) +
      "</" +
      workspace +
      ":" +
      keyLat +
      ">\
            <" +
      workspace +
      ":" +
      keyLng +
      ">" +
      parseFloat(data[keyLng]) +
      "</" +
      workspace +
      ":" +
      keyLng +
      ">\
            <" +
      workspace +
      ":" +
      keyName +
      ">" +
      data[keyName] +
      "</" +
      workspace +
      ":" +
      keyName +
      ">\
            <" +
      workspace +
      ":" +
      keyAddress +
      ">" +
      data[keyAddress] +
      "</" +
      workspace +
      ":" +
      keyAddress +
      ">\
          </" +
      workspace +
      ":" +
      layer +
      ">\
        </Insert>\
       </Transaction>";
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      dataType: "xml",
      headers: {
        "Content-Type": "text/xml",
      },
      body: body,
    })
      .then((result) => {
        if (result.status === 200) {
          success = true;
        }
      })
      .catch((err) => {
        console.log("ErrorInsertPoint", err);
      });
    return success;
  },
  async updatePoint(url, workspace, urlWorkspace, data, layer, idLayer) {
    let success = false;
    let deleteSuccess = await this.deletePoint(url, workspace, layer, idLayer);
    if (deleteSuccess === true) {
      let insertSuccess = await this.insertPoint(
        url,
        workspace,
        urlWorkspace,
        data,
        layer
      );
      if (insertSuccess === true) {
        success = true;
      }
    }
    return success;
  },
  async deletePoint(url, workspace, layer, idLayer) {
    let success = false;
    let body =
      '<Transaction version="2.0.0" services="WFS" xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:wfs="http://www.opengis.net/wfs/2.0"\
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd">\
        <Delete typeName="' +
      workspace +
      ":" +
      layer +
      '">\
          <fes:Filter>\
            <fes:ResourceId rid="' +
      idLayer +
      '"/>\
          </fes:Filter>\
        </Delete>\
      </Transaction>';
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      dataType: "xml",
      headers: {
        "Content-Type": "text/xml",
      },
      body: body,
    })
      .then((result) => {
        if (result.status === 200) {
          success = true;
        }
      })
      .catch((err) => {
        console.log("ErrorDeletePoint", err);
      });
    return success;
  },
};

export default requestWFS;
