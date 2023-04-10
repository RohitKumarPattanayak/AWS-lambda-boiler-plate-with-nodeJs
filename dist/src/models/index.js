"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsers = exports.SapLocation = exports.PaymentTerms = exports.CustomerType = exports.QuoteLineItem = exports.ServiceItem = exports.ServiceGroup = exports.DailyReport = exports.CateringMenuGroup = exports.CateringMenu = exports.SapMenu = exports.Payment = exports.QuoteInitImages = exports.ServiceCatalog = exports.PicklistSap = exports.QuoteLog = exports.QuoteItem = exports.QuoteInitChecklist = exports.Quote = exports.MaterialRequestAction = exports.SapWarehouse = exports.MaterialRequestItem = exports.MaterialRequest = exports.StatusMaster = exports.Supervisor = exports.SapSite = exports.SapConfig = exports.MaterialLedger = exports.JobStatusSummary = exports.JobAllocation = exports.Job = exports.Invoice = exports.InitiationCheckList = exports.EquipmentUsage = exports.EquipmentMaster = exports.EmpMaterialBin = exports.EmployeeLeaves = exports.EmployeeCashWallet = exports.Customer = exports.CateringRequest = exports.AttendenceAdditionalHours = exports.Attendence = exports.PublicHolidays = exports.ServiceCategory = exports.DivisionMaster = exports.Employee = exports.Role = exports.MaterialMaster = exports.ConnectDB = void 0;
const mysql_1 = require("../config/mysql");
const role_1 = __importDefault(require("./role"));
exports.Role = role_1.default;
const cateringMenuGroup_1 = __importDefault(require("./cateringMenuGroup"));
exports.CateringMenuGroup = cateringMenuGroup_1.default;
const logger_1 = __importDefault(require("../utils/logger"));
const employee_1 = __importDefault(require("./employee"));
exports.Employee = employee_1.default;
const divisionMaster_1 = __importDefault(require("./divisionMaster"));
exports.DivisionMaster = divisionMaster_1.default;
const serviceCategory_1 = __importDefault(require("./serviceCategory"));
exports.ServiceCategory = serviceCategory_1.default;
const publicHolidays_1 = __importDefault(require("./publicHolidays"));
exports.PublicHolidays = publicHolidays_1.default;
const attendence_1 = __importDefault(require("./attendence"));
exports.Attendence = attendence_1.default;
const attendenceAdditionalHours_1 = __importDefault(require("./attendenceAdditionalHours"));
exports.AttendenceAdditionalHours = attendenceAdditionalHours_1.default;
const cateringRequest_1 = __importDefault(require("./cateringRequest"));
exports.CateringRequest = cateringRequest_1.default;
const customer_1 = __importDefault(require("./customer"));
exports.Customer = customer_1.default;
const employeeCashWallet_1 = __importDefault(require("./employeeCashWallet"));
exports.EmployeeCashWallet = employeeCashWallet_1.default;
const employeeLeaves_1 = __importDefault(require("./employeeLeaves"));
exports.EmployeeLeaves = employeeLeaves_1.default;
const empMaterialBin_1 = __importDefault(require("./empMaterialBin"));
exports.EmpMaterialBin = empMaterialBin_1.default;
const sapEquipmentMaster_1 = __importDefault(require("./sapEquipmentMaster"));
exports.EquipmentMaster = sapEquipmentMaster_1.default;
const equipmentUsage_1 = __importDefault(require("./equipmentUsage"));
exports.EquipmentUsage = equipmentUsage_1.default;
const initiationChecklist_1 = __importDefault(require("./initiationChecklist"));
exports.InitiationCheckList = initiationChecklist_1.default;
const invoice_1 = __importDefault(require("./invoice"));
exports.Invoice = invoice_1.default;
const job_1 = __importDefault(require("./job"));
exports.Job = job_1.default;
const jobAllocation_1 = __importDefault(require("./jobAllocation"));
exports.JobAllocation = jobAllocation_1.default;
const jobStatusSummary_1 = __importDefault(require("./jobStatusSummary"));
exports.JobStatusSummary = jobStatusSummary_1.default;
const materialLedger_1 = __importDefault(require("./materialLedger"));
exports.MaterialLedger = materialLedger_1.default;
const materialMaster_1 = __importDefault(require("./materialMaster"));
exports.MaterialMaster = materialMaster_1.default;
const supervisor_1 = __importDefault(require("./supervisor"));
exports.Supervisor = supervisor_1.default;
const statusMaster_1 = __importDefault(require("./statusMaster"));
exports.StatusMaster = statusMaster_1.default;
const materialRequest_1 = __importDefault(require("./materialRequest"));
exports.MaterialRequest = materialRequest_1.default;
const materialRequestItem_1 = __importDefault(require("./materialRequestItem"));
exports.MaterialRequestItem = materialRequestItem_1.default;
const sapConfig_1 = __importDefault(require("./sapConfig"));
exports.SapConfig = sapConfig_1.default;
const sapWarehouse_1 = __importDefault(require("./sapWarehouse"));
exports.SapWarehouse = sapWarehouse_1.default;
const materialRequestAction_1 = __importDefault(require("./materialRequestAction"));
exports.MaterialRequestAction = materialRequestAction_1.default;
const quote_1 = __importDefault(require("./quote"));
exports.Quote = quote_1.default;
const picklistSap_1 = __importDefault(require("./picklistSap"));
exports.PicklistSap = picklistSap_1.default;
const quoteInitChecklist_1 = __importDefault(require("./quoteInitChecklist"));
exports.QuoteInitChecklist = quoteInitChecklist_1.default;
const quoteItem_1 = __importDefault(require("./quoteItem"));
exports.QuoteItem = quoteItem_1.default;
const quoteInitImages_1 = __importDefault(require("./quoteInitImages"));
exports.QuoteInitImages = quoteInitImages_1.default;
const quoteLog_1 = __importDefault(require("./quoteLog"));
exports.QuoteLog = quoteLog_1.default;
const serviceCatalog_1 = __importDefault(require("./serviceCatalog"));
exports.ServiceCatalog = serviceCatalog_1.default;
const payment_1 = __importDefault(require("./payment"));
exports.Payment = payment_1.default;
const sapSite_1 = __importDefault(require("./sapSite"));
exports.SapSite = sapSite_1.default;
const sapMenu_1 = __importDefault(require("./sapMenu"));
exports.SapMenu = sapMenu_1.default;
const cateringMenu_1 = __importDefault(require("./cateringMenu"));
exports.CateringMenu = cateringMenu_1.default;
const dailyReport_1 = __importDefault(require("./dailyReport"));
exports.DailyReport = dailyReport_1.default;
const serviceItem_1 = __importDefault(require("./serviceItem"));
exports.ServiceItem = serviceItem_1.default;
const serviceGroup_1 = __importDefault(require("./serviceGroup"));
exports.ServiceGroup = serviceGroup_1.default;
const quoteLineItem_1 = __importDefault(require("./quoteLineItem"));
exports.QuoteLineItem = quoteLineItem_1.default;
const customerType_1 = __importDefault(require("./customerType"));
exports.CustomerType = customerType_1.default;
const paymentTerms_1 = __importDefault(require("./paymentTerms"));
exports.PaymentTerms = paymentTerms_1.default;
const sapLocation_1 = __importDefault(require("./sapLocation"));
exports.SapLocation = sapLocation_1.default;
const adminUsers_1 = __importDefault(require("./adminUsers"));
exports.AdminUsers = adminUsers_1.default;
const ConnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        mysql_1.connection
            .authenticate()
            .then(() => {
            // connection.sync({ force: true }).then(async () => {
            //     defaultDataController.addDefaultRoles().then(() => {
            //         Logger.info('Added defaults roles.')
            //         defaultDataController.addDefaultEmployees().catch((err) => {
            //             Logger.error('Something went wrong while default emplyees' + err)
            //         })
            //     })
            //     await defaultDataController.addStatusMaster()
            //     defaultDataController.dummyData()
            // })
            mysql_1.connection
                .sync()
                .then((result) => {
                resolve(mysql_1.connection);
            })
                .catch((err) => {
                reject(mysql_1.connection);
            });
        })
            .catch((err) => {
            logger_1.default.error('Unable to connect to database ' + err);
            reject(err);
            return;
        });
    });
});
exports.ConnectDB = ConnectDB;
