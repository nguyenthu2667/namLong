import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("./views/home"),
    redirect: adminRoot,
  },
  //admin==========================================================
  {
    path: adminRoot, //http://locahost/admin
    component: () => import("./views/app"),
    redirect: `${adminRoot}/dashboards`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "forecast",
        component: () => import("./views/app/forecast"),
      },
      {
        path: "security",
        component: () => import("./views/app/security/Index.vue"),
        children: [
          // {
          //   path: "group-users",
          //   component: () => import("./views/app/security/actor/GroupUser.vue"),
          // },
          // {
          //   path: "new-group-users",
          //   component: () => import("./views/app/security/actor/GroupUser.vue"),
          // },
          // {
          //   path: "users",
          //   component: () => import("./views/app/security/actor/Users.vue"),
          // },
          {
            path: "users",
            name: "Users",
            component: () => import("./views/app/security/actor/NewUsers.vue"),
          },
          {
            path: "group-users",
            name: "GroupUsers",
            component: () =>
              import("./views/app/security/actor/NewGroupUsers.vue"),
          },
          {
            path: "menu-permission",
            component: () =>
              import("./views/app/security/actor/GroupMenuPermissions.vue"),
          },
          {
            path: "group-employers",
            component: () =>
              import(
                "./views/app/security/maintain-deploy/GroupMaintainDeploy.vue"
              ),
          },
          {
            path: "employers",
            component: () =>
              import(
                "./views/app/security/maintain-deploy/UserMaintainDeploy.vue"
              ),
          },
          {
            path: "group-customers",
            component: () =>
              import("./views/app/security/clients/GroupClient.vue"),
          },
          {
            path: "customers",
            component: () =>
              import("./views/app/security/clients/InfoClient.vue"),
          },
          {
            path: "layer-permission",
            component: () =>
              import("./views/app/security/decen-data/LayerData.vue"),
          },
          {
            path: "datatype-permission",
            component: () =>
              import("./views/app/security/decen-data/InfoMangage.vue"),
          },
        ],
      },
      {
        path: "config",
        component: () => import("./views/app/config/system/Index.vue"),
        children: [
          {
            path: "menu-systems",
            component: () => import("./views/app/config/system/Menu.vue"),
          },
          {
            path: "data-type",
            component: () => import("./views/app/config/system/DataType.vue"),
          },
          {
            path: "backups",
            component: () => import("./views/app/config/system/Backups.vue"),
          },
          {
            path: "deviceinfo",
            component: () =>
              import("./views/app/config/system/DeviceIndex.vue"),
          },
          {
            path: "indicatorinfo",
            component: () =>
              import("./views/app/config/system/other/MonitorIndex.vue"),
          },
          {
            path: "warning",
            component: () =>
              import("./views/app/config/system/other/SettingWarning.vue"),
          },
          {
            path: "nPLConfig",
            component: () => import("./views/app/config/system/NPLConfig.vue"),
          },
        ],
      },
      {
        path: "notification",
        component: () => import("./views/app/notification"),
        redirect: `${adminRoot}/notification/warning-list`,
        children: [
          {
            path: "warning-list",
            component: () => import("./views/app/notification/WarningList.vue"),
          },
        ],
      },
      {
        path: "map",
        component: () =>
          import(/* webpackChunkName: "category" */ "./views/app/map"),
        redirect: `${adminRoot}/map/namlong`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "namlong",
            component: () => import("./views/app/map/MapNL.vue"),
          },
        ],
      },
      {
        path: "dashboards",
        component: () => import("./views/app/dashboards"),
        redirect: `${adminRoot}/dashboards/default`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "default",
            component: () => import("./views/app/dashboards/Default"),
          },
          //gas-dashboard
          {
            path: "gas-family",
            component: () =>
              import(
                "./views/app/dashboards/gas-family/GasFamilyDashboard.vue"
              ),
          },
          {
            path: "gas-detector",
            component: () =>
              import("./views/app/dashboards/gas-detector/GasDetector.vue"),
          },
          {
            path: "gas-restaurant",
            component: () =>
              import(
                "./views/app/dashboards/gas-restaurant/DashboardMaster.vue"
              ),
          },
          {
            path: "gas-foodcourt",
            component: () =>
              import(
                "./views/app/dashboards/gas-food-court/DashboardMaster.vue"
              ),
          },
          {
            path: "gas-sale",
            component: () =>
              import(
                "./views/app/dashboards/gas-sale/DashboardMaster_ver2.vue"
              ),
          },
          // mine-diagram
          {
            path: "mine-diagram",
            component: () =>
              import("./views/app/dashboards/mine/DashboardDiagram.vue"),
          },
          //radio-dashboard
          {
            path: "smartradio",
            component: () =>
              import("./views/app/dashboards/radio/RadioDashboard.vue"),
          },
          //fire-dashboard
          {
            path: "fire-follow",
            component: () =>
              import("./views/app/dashboards/fire/FireDashboard.vue"),
          },
          //npl-dashboard
          {
            path: "npl-map",
            component: () => import("./views/app/map/MapNL.vue"),
          },
          {
            path: "npl-sale",
            component: () =>
              import("./views/app/dashboards/npl/DashboardNPLSale.vue"),
          },
          {
            path: "npl-moderation",
            component: () =>
              import("./views/app/dashboards/npl/DashboardNPLModeration.vue"),
          },
          // led-dashboard
          {
            path: "smartled",
            component: () =>
              import("./views/app/dashboards/led/DashboardLed.vue"),
          },
          // monitor-dashboard
          {
            path: "monitor-follow",
            component: () =>
              import("./views/app/dashboards/monitor/DashboardMaster.vue"),
          },
          //wim-dashboard
          {
            path: "wim",
            component: () =>
              import("./views/app/dashboards/wim/DashboardWim.vue"),
          },
          //tree-dashboard
          {
            path: "tree-analytics",
            component: () =>
              import("./views/app/dashboards/tree/DashboardMaintenace.vue"),
          },

          //light-dashboard
          {
            path: "lighting",
            component: () =>
              import("./views/app/dashboards/light/DashboardMaster"),
          },
          //water-way-dashboard (phao phân luồng)
          {
            path: "Water-ways",
            component: () =>
              import("./views/app/dashboards/water-ways/DashboardMaster"),
          },

          //camera-dashboard
          {
            path: "thermal-follow",
            component: () =>
              import("./views/app/dashboards/thermal/kiosk/DashboardMaster"),
          },
          {
            path: "thermal-analytics",
            component: () =>
              import("./views/app/dashboards/thermal/kiosk/DashboardAnalytics"),
          },
          {
            path: "thermal-camera-follow",
            component: () =>
              import("./views/app/dashboards/thermal/camera/DashboardMaster"),
          },
          {
            path: "thermal-camera-analytics",
            component: () =>
              import(
                "./views/app/dashboards/thermal/camera/DashboardAnalytics"
              ),
          },
          //aqua-dashboard
          {
            path: "aquaculture",
            component: () =>
              import("./views/app/dashboards/aquaculture/DashboardMaster"),
          },
          {
            path: "agriculture",
            component: () =>
              import("./views/app/dashboards/agriculture/DashboardMaster"),
          },

          //wind-dashboard
          {
            path: "wind-electricity",
            component: () =>
              import("./views/app/dashboards/wind/DashboardWind.vue"),
          },
          {
            path: "wind-electricity-CCTV",
            component: () =>
              import("./views/app/dashboards/cctv/DashboardWindCCTV.vue"),
          },
          {
            path: "wim",
            component: () =>
              import("./views/app/dashboards/wim/DashboardWim.vue"),
          },
        ],
      },
      {
        path: "category",
        component: () =>
          import(/* webpackChunkName: "category" */ "./views/app/category"),
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          //fire-category
          // {
          //   path: "fire-location",
          //   component: () => import("./views/app/category/fire/FireLocation"),
          // },
          {
            path: "treeTable",
            // name: "treeTable",
            component: () =>
              import("./components/Table/TreeTable.vue"),
          },
          {
            path: "fire-location",
            name: "FireLocations",
            component: () =>
              import("./views/app/category/fire/NewFireLocation"),
          },
          {
            path: "fire-station",
            component: () => import("./views/app/category/fire/FireStation"),
          },
          // {
          //   path: "fire-station-export",
          //   component: () =>
          //     import("./views/app/category/fire/FinishedProductFire.vue"),
          // },
          {
            path: "fire-station-export",
            component: () =>
              import("./views/app/category/fire/NewFinishedProductFire.vue"),
          },
          //npl-category
          {
            path: "bank",
            name: "Banks",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "contacttype",
            name: "ContactTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "customergroup",
            name: "NPLCustomerGroups",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "containertype",
            name: "ContainerTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "ordertype",
            name: "OrderTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "goodstype",
            name: "GoodsTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "nplunit",
            name: "NPLUnits",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "routegroup",
            name: "RouteGroups",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "managementregion",
            name: "ManagementRegions",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "inspectionunit",
            name: "InspectionUnits",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "chargingstation",
            name: "ChargingStations",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "port",
            name: "Ports",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "petrolstations",
            name: "PetrolStations",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "nPLStation",
            name: "nPLStations",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "maintenancejob",
            name: "MaintenanceJobs",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "expert",
            name: "Experts",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "jobtype",
            name: "JobTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "maintenancesupply",
            name: "MaintenanceSupplies",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "chargejob",
            name: "ChargeJobs",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "extendunit",
            name: "ExtendUnits",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "costsincurred",
            name: "CostIncurreds",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "incident",
            name: "Incidents",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "leavereason",
            name: "LeaveReasons",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "driverRequirement",
            name: "DriverRequirements",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehiclegroup",
            name: "VehicleGroups",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicletype",
            name: "VehicleTypes",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicleproducer",
            name: "VehicleProducers",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicleColor",
            name: "VehicleColors",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicletire",
            name: "VehicleTires",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "fuelkinds",
            name: "FuelKinds",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "outsourcedvehicle",
            name: "OutsourcedVehicles",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "outsourcedvehicleprovider",
            name: "OutsourcedVehicleProviders",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicledevice",
            name: "VehicleDevices",
            component: () =>
              import("./views/app/category/npl/NPLCategories.vue"),
          },
          {
            path: "vehicle",
            name: "Vehicles",
            component: () => import("./views/app/category/npl/NPLVehicles.vue"),
          },
          {
            path: "SMRM",
            name: "SMRMs",
            component: () => import("./views/app/category/npl/NPLVehicles.vue"),
          },
          {
            path: "driver",
            name: "nPLDrivers",
            component: () => import("./views/app/category/npl/NPLDrivers.vue"),
          },
          {
            path: "drivehelper",
            name: "nPLDriveHelpers",
            component: () =>
              import("./views/app/category/npl/NPLDriverHelpers.vue"),
          },
          {
            path: "customer",
            name: "nPLCustomers",
            component: () =>
              import("./views/app/category/npl/NPLCustomers.vue"),
          },
          {
            path: "nplregion",
            name: "nPLRegions",
            component: () =>
              import("./views/app/category/npl/NewNPLRegions.vue"),
          },
          // {
          //   path: "bank",
          //   name: 'Banks',
          //   component: () => import("./views/app/category/npl/NPLCategories.vue"),
          // },
          // {
          //   path: "bank",
          //   component: () => import("./views/app/category/npl/Banks.vue"),
          // },
          {
            path: "vehicle",
            component: () => import("./views/app/category/npl/Vehicle.vue"),
          },
          {
            path: "SMRM",
            component: () => import("./views/app/category/npl/SMRM.vue"),
          },
          {
            path: "driver",
            component: () => import("./views/app/category/npl/Driver.vue"),
          },
          {
            path: "drivehelper",
            component: () => import("./views/app/category/npl/DriveHelper.vue"),
          },
          {
            path: "nplregion",
            component: () => import("./views/app/category/npl/NPLregion.vue"),
          },
          {
            path: "port",
            component: () => import("./views/app/category/npl/Port.vue"),
          },
          {
            path: "petrolstations",
            component: () =>
              import("./views/app/category/npl/PetrolStations.vue"),
          },
          {
            path: "nplunit",
            component: () => import("./views/app/category/npl/Units.vue"),
          },
          {
            path: "ordertype",
            component: () => import("./views/app/category/npl/OrderTypes.vue"),
          },
          {
            path: "routegroup",
            component: () => import("./views/app/category/npl/RouteGroups.vue"),
          },
          {
            path: "vehiclecolor",
            component: () =>
              import("./views/app/category/npl/VehicleColors.vue"),
          },
          {
            path: "vehicleproducer",
            component: () =>
              import("./views/app/category/npl/VehicleProducers.vue"),
          },
          {
            path: "vehicletire",
            component: () =>
              import("./views/app/category/npl/VehicleTires.vue"),
          },
          {
            path: "vehicletype",
            component: () =>
              import("./views/app/category/npl/VehicleTypes.vue"),
          },
          {
            path: "extendunit",
            component: () => import("./views/app/category/npl/ExtendUnits.vue"),
          },
          {
            path: "incident",
            component: () => import("./views/app/category/npl/Incidents.vue"),
          },
          {
            path: "jobtype",
            component: () => import("./views/app/category/npl/JobTypes.vue"),
          },
          {
            path: "managementregion",
            component: () =>
              import("./views/app/category/npl/ManagementRegions.vue"),
          },
          {
            path: "customergroup",
            component: () =>
              import("./views/app/category/npl/NPLCustomerGroups.vue"),
          },
          {
            path: "outsourcedvehicleprovider",
            component: () =>
              import("./views/app/category/npl/OutsourcedVehicleProviders.vue"),
          },
          {
            path: "outsourcedvehicle",
            component: () =>
              import("./views/app/category/npl/OutsourcedVehicles.vue"),
          },
          {
            path: "vehiclegroup",
            component: () =>
              import("./views/app/category/npl/VehicleGroups.vue"),
          },
          {
            path: "chargingstation",
            component: () =>
              import("./views/app/category/npl/ChargingStations.vue"),
          },
          {
            path: "chargejob",
            component: () => import("./views/app/category/npl/ChargeJobs.vue"),
          },
          {
            path: "contacttype",
            component: () =>
              import("./views/app/category/npl/ContactTypes.vue"),
          },
          {
            path: "containertype",
            component: () =>
              import("./views/app/category/npl/ContainerTypes.vue"),
          },
          {
            path: "costsincurred",
            component: () =>
              import("./views/app/category/npl/CostIncurreds.vue"),
          },
          {
            path: "driverrequirement",
            component: () =>
              import("./views/app/category/npl/DriverRequirements.vue"),
          },
          {
            path: "expert",
            component: () => import("./views/app/category/npl/Experts.vue"),
          },
          {
            path: "goodstype",
            component: () => import("./views/app/category/npl/GoodsTypes.vue"),
          },
          {
            path: "inspectionunit",
            component: () =>
              import("./views/app/category/npl/InspectionUnits.vue"),
          },
          {
            path: "leavereason",
            component: () =>
              import("./views/app/category/npl/LeaveReasons.vue"),
          },
          {
            path: "maintenancesupply",
            component: () =>
              import("./views/app/category/npl/MaintenanceSupplies.vue"),
          },
          {
            path: "maintenancejob",
            component: () =>
              import("./views/app/category/npl/MaintenanceJobs.vue"),
          },
          {
            path: "nPLStation",
            component: () => import("./views/app/category/npl/Stations.vue"),
          },
          {
            path: "customer",
            component: () => import("./views/app/category/npl/Customers.vue"),
          },
          {
            path: "fuelkinds",
            component: () => import("./views/app/category/npl/FuelKinds.vue"),
          },
          {
            path: "route",
            component: () => import("./views/app/category/npl/Routes.vue"),
          },

          //tree
          {
            path: "tree-color",
            component: () => import("./views/app/category/tree/Color"),
          },
          {
            path: "tree-land",
            component: () => import("./views/app/category/tree/Land"),
          },
          {
            path: "tree-leaf",
            component: () => import("./views/app/category/tree/Leaf.vue"),
          },
          {
            path: "tree",
            component: () => import("./views/app/category/tree/Tree.vue"),
          },
          {
            path: "tree-group",
            component: () => import("./views/app/category/tree/TreeGroup.vue"),
          },
          {
            path: "tree-status",
            component: () => import("./views/app/category/tree/TreeStatus"),
          },
          {
            path: "tree-type",
            component: () => import("./views/app/category/tree/TreeType"),
          },
          {
            path: "tree-category",
            component: () => import("./views/app/category/tree/TreeCategory"),
          },
          {
            path: "tree-crown",
            name: "Crowns",
            component: () => import("./views/app/category/tree/Crown.vue"),
          },
          {
            path: "tree-root",
            component: () => import("./views/app/category/tree/Roots.vue"),
          },
          {
            path: "tree-management-unit",
            component: () =>
              import("./views/app/category/tree/ManagementUnit.vue"),
          },
          {
            path: "tree-route",
            component: () => import("./views/app/function/collect/TreeRoute"),
          },

          //tree-category
          {
            path: "collect-type",
            component: () => import("./views/app/function/collect/CollectType"),
          },
          {
            path: "maintenance-area",
            component: () =>
              import("./views/app/category/tree/AreaMaintenance.vue"),
          },
          {
            path: "maintenance-request-type",
            component: () =>
              import("./views/app/category/tree/MaintenanceRequestType.vue"),
          },
          //monitor-category
          {
            path: "stations",
            component: () => import("./views/app/category/monitor/Stations"),
          },
          {
            path: "monitor-indicator",
            component: () => import("./views/app/category/monitor/Indicators"),
          },
          {
            path: "monitor-locations",
            component: () =>
              import("./views/app/category/monitor/locations/index.vue"),
          },
          {
            path: "monitor-cameras",
            component: () =>
              import("./views/app/category/monitor/cameras/index.vue"),
          },
          {
            path: "monitor-speakers",
            component: () =>
              import("./views/app/category/monitor/speakers/index.vue"),
          },
          {
            path: "monitor-device",
            component: () => import("./views/app/category/shared/Device"),
          },
          //light-category
          {
            path: "lighting-maintenance-errors",
            component: () =>
              import("./views/app/category/light/MaintenanceErrors.vue"),
          },
          {
            path: "light-cabinets",
            component: () => import("./views/app/category/light/LightCabinets"),
          },
          {
            path: "light-levels",
            name: "SLLightLevel",
            component: () => import("./views/app/category/light/LightLevels"),
          },

          {
            path: "light-cabinets-finish",
            component: () =>
              import("./views/app/category/light/CabinetFinishedProduct"),
          },
          {
            path: "light-lamps-finish",
            component: () =>
              import("./views/app/category/light/LampFinishedProduct"),
          },
          //waterway-category
          {
            path: "waterways",
            component: () =>
              import("./views/app/category/water-ways/WaterwayCabinets.vue"),
          },
          {
            path: "waterway-types",
            component: () =>
              import("./views/app/category/water-ways/WaterwayType.vue"),
          },
          {
            path: "waterway-signs",
            component: () =>
              import("./views/app/category/water-ways/WaterwaySigns.vue"),
          },
          {
            path: "waterway-sign-types",
            component: () =>
              import("./views/app/category/water-ways/WaterwaySignType.vue"),
          },
          {
            path: "waterway-routes",
            component: () =>
              import("./views/app/category/water-ways/WaterwayRoutes.vue"),
          },
          {
            path: "waterway-clearanceheights",
            component: () =>
              import(
                "./views/app/category/water-ways/WaterwayClearanceheights.vue"
              ),
          },
          {
            path: "waterway-beacons",
            component: () =>
              import("./views/app/category/water-ways/Beacons.vue"),
          },
          {
            path: "waterways-cabinet-export",
            component: () =>
              import("./views/app/category/water-ways/CabinetExport.vue"),
          },
          {
            path: "waterways-station-export",
            component: () =>
              import("./views/app/category/water-ways/StationExport.vue"),
          },

          //aqua-category
          {
            path: "aquaculture-stations",
            component: () =>
              import("./views/app/category/aquaculture/Aquaculture"),
          },
          {
            path: "aquaculture-stations-finish",
            component: () =>
              import("./views/app/category/aquaculture/FinishedProduct.vue"),
          },

          //insect-category
          {
            path: "insect-one",
            component: () => import("./views/app/category/insect/InsectOne"),
          },
          //camera-category
          {
            path: "camera-security",
            component: () =>
              import("./views/app/category/camera/CameraSecurity"),
          },
          {
            path: "ai-face-data",
            component: () =>
              import("./views/app/category/artificial-intelligence/FaceData"),
          },
          {
            path: "ai-black-list",
            component: () =>
              import("./views/app/category/artificial-intelligence/BlackList"),
          },
          {
            path: "ai-position",
            component: () =>
              import("./views/app/category/artificial-intelligence/Position"),
          },
          //thermal-category
          {
            path: "thermal-kiosk",
            component: () =>
              import("./views/app/category/thermal/ThermalKiosk"),
          },
          {
            path: "thermal-camera",
            component: () =>
              import("./views/app/category/thermal/ThermalCamera"),
          },

          //gas-category
          {
            path: "gas-family-finished-product",
            component: () =>
              import("./views/app/category/gas-family/FinishedProduct"),
          },
          {
            path: "gas-family-type",
            component: () => import("./views/app/category/gas-family/GasType"),
          },
          {
            path: "gas-family-customer",
            component: () =>
              import("./views/app/category/gas-family/GasCustomer"),
          },
          {
            path: "gas-restaurant-finished-product",
            component: () =>
              import("./views/app/category/gas-restaurant/FinishedProduct"),
          },
          {
            path: "gas-foodcourt-finished-product",
            component: () =>
              import("./views/app/category/gas-food-court/FinishedProduct"),
          },
          {
            path: "gas-restaurant-customer",
            component: () =>
              import("./views/app/category/gas-restaurant/GasCustomer"),
          },
          {
            path: "gas-foodcourt-customer",
            component: () =>
              import("./views/app/category/gas-food-court/GasCustomer.vue"),
          },
          {
            path: "gas-store",
            component: () =>
              import("./views/app/category/gas-restaurant/GasStore.vue"),
          },
          {
            path: "gas-foodcourt",
            component: () =>
              import(
                "./views/app/category/gas-food-court/AreaGasFoodCourt.vue"
              ),
          },
          {
            path: "gas-unit",
            component: () =>
              import("./views/app/category/gas-restaurant/GasUnit.vue"),
          },
          {
            path: "gas-group-items",
            component: () =>
              import("./views/app/category/gas-restaurant/GasGroupItem.vue"),
          },
          {
            path: "gas-items",
            component: () =>
              import("./views/app/category/gas-restaurant/GasItem.vue"),
          },
          //file-category
          {
            path: "import-template",
            component: () =>
              import("./views/app/category/excel/importExcel.vue"),
          },
          {
            path: "export-template",
            component: () =>
              import("./views/app/category/excel/exportExcel.vue"),
          },
          //option-category
          {
            path: "power-type",
            component: () => import("./views/app/category/shared/PowerType"),
          },
          {
            path: "connect-type",
            component: () => import("./views/app/category/shared/ConnectType"),
          },
          {
            path: "regions",
            component: () => import("./views/app/category/shared/Regions"),
          },
        ],
      },
      {
        path: "function",
        component: () =>
          import(/* webpackChunkName: "function" */ "./views/app/function"),
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          //radio-function
          {
            path: "radio-schedules",
            component: () => import("./views/app/function/radio/Schedules.vue"),
          },
          //npl-function
          {
            path: "npl-ghgt",
            component: () =>
              import("./views/app/function/npl/giay-to/Index.vue"),
          },
          {
            path: "npl-baotri",
            component: () =>
              import("./views/app/function/npl/bao-tri/Index.vue"),
          },
          {
            path: "data-gas",
            component: () =>
              import("./views/app/function/npl/du-lieu-dau-ky/DataGas.vue"),
          },
          {
            path: "data-maintance-vehicle",
            component: () =>
              import("./views/app/function/npl/du-lieu-dau-ky/DataMaintanceVehicle.vue"),
          },
          {
            path: "data-maintance-mooc",
            component: () =>
              import("./views/app/function/npl/du-lieu-dau-ky/DataMaintanceMooc.vue"),
          },
          {
            path: "data-date-mooc",
            component: () =>
              import("./views/app/function/npl/du-lieu-dau-ky/DataDateMooc.vue"),
          },
          { path: "data-date-vehicle",
            component: () =>
              import("./views/app/function/npl/du-lieu-dau-ky/DataDateVehicle.vue"),
          }, 
          // {
          //   path: "trip-pairing",
          //   name: "CV_PAIRSHIP",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          // },
          {
            path: "tarpaulin-allowance",
            name: "RQ_COATTARP",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "crane-allowance",
            name: "RQ_CRANE",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "cont-pair-overload",
            name: "RQ_DOUCONT_OVERLOAD",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "assistant-driver-allowance",
            name: "RQ_DRIVERHELPER",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "rice-allowance",
            name: "RQ_MEAL",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "patch-tire-allowance",
            name: "RQ_PIECETIRE",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "trip-pairing",
            name: "CV_PAIRSHIP",
            component: () =>
              import("./views/app/function/npl/dinh-muc/TripPairing.vue"),
          },
          {
            path: "help-vehicle-outside",
            name: "ASSISTOUTSIDEVEHICLE",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLAllowances.vue"),
          },
          {
            path: "maintenance",
            name: "RQ_MAINTENANCE",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLMaintenance.vue"),
          },
          {
            path: "oil-allowance",
            name: "RQ_CONSUME_OILBYTRANS",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLOil.vue"),
          },
          {
            path: "route-costs",
            name: "RQ_FEEOFROUTE",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/NPLRoute.vue"),
          },
          {
            path: "npl-thuky",
            component: () =>
              import("./views/app/function/npl/thu-ky/Index.vue"),
          },
          {
            path: "yeu-cau-chot-dau-tai-xe",
            component: () =>
              import(
                "./views/app/function/npl/luong-tx/YeuCauChotDauTaiXe.vue"
              ),
          },
          {
            path: "luong-tai-xe",
            component: () =>
              import("./views/app/function/npl/luong-tx/TinhLuongTaiXe.vue"),
          },
          {
            path: "quan-ly-luong-tai-xe",
            component: () =>
              import(
                "./views/app/function/npl/luong-tx/DieuChinhLuongTaiXe.vue"
              ),
          },
          {
            path: "sales-tracking",
            component: () =>
              import("./views/app/function/npl/kinh-doanh/SalesTracking.vue"),
          },
          {
            path: "dieu-do-tracking",
            component: () =>
              import("./views/app/function/npl/dieu-do/QuanLyDieuDo.vue"),
          },
          {
            path: "driver-tracking",
            component: () =>
              import("./views/app/function/npl/tai-xe/DriverTracking.vue"),
          },
          // {
          //   path: "oil-allowance",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/OilAllowance.vue"),
          // },
          // {
          //   path: "tarpaulin-allowance",
          //   component: () =>
          //     import(
          //       "./views/app/function/npl/kinh-doanh/TarpaulinAllowance.vue"
          //     ),
          // },
          // {
          //   path: "rice-allowance",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/RiceAllowance.vue"),
          // },
          // {
          //   path: "crane-allowance",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/CraneAllowance.vue"),
          // },
          // {
          //   path: "assistant-driver-allowance",
          //   component: () =>
          //     import(
          //       "./views/app/function/npl/kinh-doanh/AssistantDriverAllowance.vue"
          //     ),
          // },
          // {
          //   path: "patch-tire-allowance",
          //   component: () =>
          //     import(
          //       "./views/app/function/npl/kinh-doanh/PatchTireAllowance.vue"
          //     ),
          // },
          // {
          //   path: "bags-overload-allowance",
          //   component: () =>
          //     import(
          //       "./views/app/function/npl/kinh-doanh/BagsOverloadAllowance.vue"
          //     ),
          // },
          // {
          //   path: "route-costs",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/RouteCosts.vue"),
          // },
          // {
          //   path: "maintenance",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/Maintenance.vue"),
          // },
          // {
          //   path: "trip-pairing",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/TripPairing.vue"),
          // },
          // {
          //   path: "help-vehicle-outside",
          //   component: () =>
          //     import("./views/app/function/npl/kinh-doanh/PCCuuXeBenNgoai.vue"),
          // },
          {
            path: "limit-debit",
            component: () =>
              import("./views/app/function/npl/DeXuatHanMucTinDung.vue"),
          },
          {
            path: "shipping-cost",
            component: () =>
              import("./views/app/function/npl/ShippingCost.vue"),
          },
          {
            path: "vehicle-handover",
            component: () =>
              import(
                "./views/app/function/npl/phuong-tien/VehicleManagement.vue"
              ),
          },
          {
            path: "vehicle-recovery",
            component: () =>
              import(
                "./views/app/function/npl/phuong-tien/VehicleManagement.vue"
              ),
          },
          {
            path: "change-mooc",
            component: () =>
              import(
                "./views/app/function/npl/phuong-tien/VehicleManagement.vue"
              ),
          },
          //led-function
          {
            path: "ledstations",
            component: () => import("./views/app/category/led/LedStations"),
          },
          {
            path: "ledexports",
            component: () =>
              import("./views/app/category/led/LedStationsFinish"),
          },
          {
            path: "led-schedules",
            component: () => import("./views/app/function/led/LedSchedules"),
          },
          //wim-function
          {
            path: "wim-report",
            component: () => import("./views/app/function/wim/Punishment.vue"),
          },
          {
            path: "wim-overload",
            component: () => import("./views/app/function/wim/Overload.vue"),
          },
          {
            path: "wim-data-historys",
            component: () => import("./views/app/function/wim/History.vue"),
          },
          {
            path: "wim-datas",
            component: () => import("./views/app/function/wim/Monitor"),
          },
          //tree-function
          {
            path: "collect-data",
            component: () => import("./views/app/function/collect/CollectData"),
          },
          {
            path: "greenery-maintenance",
            component: () =>
              import("./views/app/function/tree/GreeneryMaintenance.vue"),
          },
          {
            path: "tree-data",
            component: () => import("./views/app/function/tree/TreeData.vue"),
          },
          //camera-function
          {
            path: "camera-stream",
            component: () =>
              import("./views/app/function/camera/StreamCameraSecurity"),
          },
          //waterway-function
          {
            path: "waterway-schedules",
            component: () =>
              import("./views/app/function/water-ways/WaterwaySchedules"),
          },
          {
            path: "waterway-monitor",
            component: () =>
              import("./views/app/function/water-ways/EnvironmentWaterway"),
          },
          {
            path: "clearanceheight-monitor",
            component: () =>
              import(
                "./views/app/function/water-ways/ClearanceHeightEnvironmentWaterway"
              ),
          },
          //light-function
          {
            path: "light-schedules",
            component: () =>
              import("./views/app/function/light/CabinetSchedules.vue"),
          },
          {
            path: "schedule-options",
            component: () =>
              import("./views/app/function/light/ScheduleOptions.vue"),
          },
          {
            path: "lighting-maintenance",
            component: () =>
              import("./views/app/function/light/LightMaintenance.vue"),
          },
          {
            path: "light-monitor",
            component: () =>
              import("./views/app/function/light/EnvironmentLight"),
          },
          //thermal-function
          {
            path: "medical-declaration",
            component: () =>
              import("./views/app/function/thermal/MedicalDeclaration"),
          },
          {
            path: "thermal-kiosk-monitor",
            component: () =>
              import("./views/app/function/thermal/ThermalKiosk"),
          },
          {
            path: "update-face-data",
            component: () =>
              import("./views/app/function/thermal/UpdateFaceData"),
          },
          {
            path: "thermal-camera-monitor",
            component: () =>
              import("./views/app/function/thermal/ThermalCamera"),
          },

          //gas-function
          {
            path: "gas-family-monitor",
            component: () =>
              import("./views/app/function/gas-family/ActiveMonitor"),
          },
          {
            path: "gas-foodcourt-monitor",
            component: () =>
              import("./views/app/function/gas-food-court/ActiveMonitor.vue"),
          },
          {
            path: "gas-restaurant-monitor",
            component: () =>
              import("./views/app/function/gas-restaurant/ActiveMonitor"),
          },
          {
            path: "adjust-price",
            component: () =>
              import("./views/app/function/gas-restaurant/AdjustPrice"),
          },
          {
            path: "adjust-total-price",
            component: () =>
              import("./views/app/function/gas-restaurant/AdjustPriceTotal"),
          },
          {
            path: "balance-debit",
            component: () =>
              import("./views/app/function/gas-restaurant/BalanceDebits.vue"),
          },
          {
            path: "balance-debit-tank",
            component: () =>
              import(
                "./views/app/function/gas-restaurant/BalanceDebitTanks.vue"
              ),
          },
          {
            path: "adjust-price-food-court",
            component: () =>
              import(
                "./views/app/function/gas-food-court/AdjustPriceFoodCourt.vue"
              ),
          },
          {
            path: "adjust-debit",
            component: () =>
              import("./views/app/function/gas-restaurant/AdjustDebit"),
          },
          {
            path: "adjust-debit-food-court",
            component: () =>
              import("./views/app/function/gas-food-court/AdjustDebit.vue"),
          },
          {
            path: "gas-order",
            component: () =>
              import("./views/app/function/gas-restaurant/Order"),
          },
          {
            path: "gas-sale",
            component: () => import("./views/app/function/gas-restaurant/Sale"),
          },
          {
            path: "gas-delivery",
            component: () =>
              import("./views/app/function/gas-restaurant/Delivery"),
          },
          {
            path: "debit-gas-value",
            component: () =>
              import("./views/app/function/gas-restaurant/DebitValueGas"),
          },
          {
            path: "return-gas-tank",
            component: () =>
              import("./views/app/function/gas-sale-manager/ReturnGasTank.vue"),
          },
          //contact-function
          {
            path: "contacts",
            component: () =>
              import("./views/app/function/contacts/Contact.vue"),
          },
          //notifications-function
          {
            path: "internal-notifications",
            component: () =>
              import(
                "./views/app/function/notifications/InternalNotification.vue"
              ),
          },
          {
            path: "customer-notifications",
            component: () =>
              import(
                "./views/app/function/notifications/CustomerNotification.vue"
              ),
          },
          //file-function
          {
            path: "export-manager",
            component: () => import("./views/app/function/excel/ExcelManager"),
          },
        ],
      },
      {
        path: "report",
        component: () =>
          import(/* webpackChunkName: "report" */ "./views/app/report"),
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          //led-report
          {
            path: "report-smartled",
            component: () => import("./views/app/report/led/Led.vue"),
          },
          //tree-report
          {
            path: "tree-maintenance-reports",
            component: () =>
              import("./views/app/report/tree/TreeMaintenace.vue"),
          },
          {
            path: "trees",
            component: () => import("./views/app/report/tree/TreeTypes.vue"),
          },
          {
            path: "tree-groups",
            component: () => import("./views/app/report/tree/TreeGroups.vue"),
          },
          {
            path: "tree-status",
            component: () => import("./views/app/report/tree/TreeStatus.vue"),
          },
          {
            path: "tree-routes",
            component: () => import("./views/app/report/tree/TreeRoute.vue"),
          },
          {
            path: "tree-categories",
            component: () =>
              import("./views/app/report/tree/TreeCategories.vue"),
          },
          {
            path: "tree-management",
            component: () =>
              import("./views/app/report/tree/TreeManagement.vue"),
          },
          //monitor-report
          {
            path: "monitor-current",
            component: () =>
              import("./views/app/report/monitor/CurrentMonitorReport"),
          },
          {
            path: "monitor-total",
            component: () =>
              import("./views/app/report/monitor/TotalMonitorReport"),
          },
          {
            path: "monitor-detail",
            component: () =>
              import("./views/app/report/monitor/DetailMonitorReport"),
          },
          {
            path: "monitor-error",
            component: () =>
              import("./views/app/report/monitor/ErrMonitorReport"),
          },
          {
            path: "monitor-warning",
            component: () =>
              import("./views/app/report/monitor/WarningMonitorReport"),
          },

          //light-report
          {
            path: "lighting-maintenance-reports",
            component: () =>
              import("./views/app/report/report-lighting/LightMaintenance.vue"),
          },
          {
            path: "report-lighting",
            component: () =>
              import("./views/app/report/report-lighting/NewReportLight"),
          },
          {
            path: "report-lighting-1",
            component: () =>
              import("./views/app/report/report-lighting/NewReportLight1"),
          },
          {
            path: "report-lighting-disconnected",
            component: () =>
              import("./views/app/report/report-lighting/DisconnectLight"),
          },
          {
            path: "report-lighting-moved",
            component: () =>
              import("./views/app/report/report-lighting/MovedLight"),
          },
          {
            path: "report-lighting-error",
            component: () =>
              import("./views/app/report/report-lighting/LampErrLight"),
          },
          {
            path: "report-lighting-maintenance",
            component: () =>
              import("./views/app/report/report-lighting/Maintenance"),
          },
          //aqua-report
          {
            path: "aquaculture-current",
            component: () =>
              import("./views/app/report/aqua/CurrentAquaReport"),
          },
          {
            path: "aquaculture-total",
            component: () => import("./views/app/report/aqua/TotalAquaReport"),
          },
          {
            path: "aquaculture-detail",
            component: () => import("./views/app/report/aqua/DetailAquaReport"),
          },
          {
            path: "aquaculture-error",
            component: () => import("./views/app/report/aqua/ErrAquaReport"),
          },
          {
            path: "aquaculture-warning",
            component: () =>
              import("./views/app/report/aqua/WarningAquaReport"),
          },

          //waterway-report
          {
            path: "waterway-current",
            component: () =>
              import("./views/app/report/water-ways/Current.vue"),
          },
          {
            path: "waterway-distance",
            component: () =>
              import("./views/app/report/water-ways/DistanceTotal.vue"),
          },
          {
            path: "waterway-lamp-error",
            component: () =>
              import("./views/app/report/water-ways/LampErrorTotal.vue"),
          },
          //wind-report
          {
            path: "windelectricity-reports",
            component: () =>
              import("./views/app/report/wind/WindElectricReport.vue"),
          },
          //thermal-report
          {
            path: "thermal-kiosk",
            component: () => import("./views/app/report/thermal/ThermalKiosk"),
          },
          {
            path: "thermal-employer",
            component: () =>
              import("./views/app/report/thermal/ThermalEmployer"),
          },
          {
            path: "thermal-camera",
            component: () => import("./views/app/report/thermal/ThermalCamera"),
          },

          //gas-report
          {
            path: "family-customer-detected",
            component: () =>
              import("./views/app/report/gas-family/CustomerDetected"),
          },
          {
            path: "family-customer-end-gas",
            component: () =>
              import("./views/app/report/gas-family/CustomerEndGas"),
          },
          {
            path: "restaurant-customer-detected",
            component: () =>
              import("./views/app/report/gas-restaurant/CustomerDetected"),
          },
          {
            path: "restaurant-customer-end-gas",
            component: () =>
              import("./views/app/report/gas-restaurant/CustomerEndGas"),
          },
          {
            path: "foodcourt-customer-detected",
            component: () =>
              import("./views/app/report/gas-food-courts/Detected.vue"),
          },
          {
            path: "foodcourt-customer-used",
            component: () =>
              import("./views/app/report/gas-food-courts/UsedGasFoodCourt.vue"),
          },
          {
            path: "foodcourt-customer-debit",
            component: () =>
              import("./views/app/report/gas-food-courts/DebitFoodCourt.vue"),
          },
          {
            path: "foodcourt-history",
            component: () =>
              import(
                "./views/app/report/gas-food-courts/HistoryGasRestaurent.vue"
              ),
          },
          {
            path: "sale",
            component: () =>
              import("./views/app/report/gas-sales/GasSales.vue"),
          },
          {
            path: "delivery",
            component: () =>
              import("./views/app/report/gas-sales/GasDeliverys.vue"),
          },
          {
            path: "debit",
            component: () =>
              import("./views/app/report/gas-sales/GasDebits.vue"),
          },
          {
            path: "debit-tanks",
            component: () =>
              import("./views/app/report/gas-sales/GasDebitTanks.vue"),
          },
        ],
      },
    ],
  },
  //test==========================================================
  {
    path: "/test",
    component: () => import(/* webpackChunkName: "error" */ "./views/Test"),
  },
  //error==========================================================
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
  },
  //auth===========================================================
  {
    path: "/unauthorized",
    component: () =>
      import(/* webpackChunkName: "error" */ "./views/Unauthorized"),
  },
  //user===========================================================
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login.vue"),
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register"),
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword"),
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword"),
      },
    ],
  },
  //other==========================================================
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "error" */ "./views/Error.vue"),
  },
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
