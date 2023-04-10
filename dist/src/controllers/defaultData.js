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
const logger_1 = __importDefault(require("../utils/logger"));
const models_1 = require("../models");
const statusMaster_1 = __importDefault(require("../models/statusMaster"));
const mysql_1 = require("../config/mysql");
const httpResponse_1 = require("../interfaces/httpResponse");
const appErrors_1 = require("../utils/appErrors");
const successHandler_1 = require("../utils/successHandler");
const dayjs_1 = __importDefault(require("dayjs"));
const sequelize_1 = require("sequelize");
const addDefaultRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Role.bulkCreate([
        {
            name: 'Public Relations Officer',
            role_code: '50000078',
            staff_type: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Senior Cheff',
            role_code: '50000101',
            staff_type: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Cleaner-Public Buildings',
            role_code: '50000112',
            staff_type: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Supervisor',
            role_code: '50000114',
            staff_type: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Agricultural Worker',
            role_code: '50000118',
            staff_type: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], { validate: true });
});
const addDefaultDivisionMaster = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.DivisionMaster.bulkCreate([
        {
            id: 1,
            division_code: 'G1',
            name: 'Cleaning',
            icon_filename: 'cleaning.png',
            is_active: 1,
            is_catering: 0
        },
        {
            id: 2,
            name: 'Catering',
            division_code: 'G2',
            icon_filename: 'catering.png',
            is_active: 1,
            is_catering: 1
        },
        {
            id: 3,
            name: 'Hard FM',
            division_code: 'G4',
            icon_filename: 'default.png',
            is_active: 1,
            is_catering: 0
        },
        {
            id: 4,
            name: 'Pest Control',
            division_code: 'G3',
            icon_filename: 'pest_control.png',
            is_active: 1,
            is_catering: 0
        },
        {
            id: 5,
            name: 'Landscaping',
            division_code: 'G6',
            icon_filename: 'landscaping.png',
            is_active: 1,
            is_catering: 0
        },
        {
            id: 6,
            name: 'Waste Management',
            division_code: 'G5',
            icon_filename: 'waste_management.png',
            is_active: 1,
            is_catering: 0
        },
        {
            id: 7,
            name: 'Product Sales',
            division_code: 'G7',
            icon_filename: 'default.png',
            is_active: 1,
            is_catering: 0
        }
    ], { validate: true });
});
// const addDefaultSapContract = async () => {
//     await SapContract.bulkCreate(
//         [
//             { contract_code: 'SC01', name: 'One-time', project_id: '1' },
//             { contract_code: 'SC02', name: 'Yearly', project_id: '2' }
//         ],
//         { validate: true }
//     )
// }
const addDefaultSapSite = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.SapSite.bulkCreate([
        { site_code: 'SS01', name: 'Hopsital' },
        { site_code: 'SS02', name: 'School' },
        { site_code: 'SS03', name: 'Mall' },
        { site_code: 'SS04', name: 'Office' }
    ], { validate: true });
});
const addDefaultSapLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.SapLocation.bulkCreate([
        { site_code: 'SS01', latitude: 12.9641667366, longitude: 77.64178733769 },
        { site_code: 'SS01', latitude: 2.9641667366, longitude: 7.64178733769 },
        { site_code: 'SS03', latitude: 12.9641667366, longitude: 77.64178733769 },
        { site_code: 'SS03', latitude: 12.9641667366, longitude: 77.64178733769 }
    ], { validate: true });
});
const addDefaultEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Employee.bulkCreate([
        {
            sap_employee_code: '20000002',
            first_name: 'AHMED MOHAMMED',
            last_name: ' ABDULLAH AL MAMRI S',
            email: 'ahmed@oigoman.com',
            password: '79a4146c0d1efd906f3fcf892d7c9a9f',
            sex: 'male',
            role_code: '50000078',
            daily_contract_hrs: 8.5,
            country: 'OM',
            is_active: 1,
            has_app_access: 1
        },
        {
            sap_employee_code: '20000003',
            first_name: 'Arun',
            last_name: 'Sai',
            email: 'arul@oigoman.com',
            password: 'def9de528eaaa5a649e8f7606fe2b463',
            sex: 'male',
            role_code: '50000101',
            daily_contract_hrs: 8.5,
            country: 'OM',
            is_active: 1,
            has_app_access: 1
        },
        {
            sap_employee_code: '21000001',
            first_name: 'SUNIL',
            last_name: 'KASHINATH',
            email: 'sunil@oigoman.com',
            password: '87330ed7aebcf47b84204d6562138f9f',
            sex: 'male',
            role_code: '50000112',
            daily_contract_hrs: 8.5,
            country: 'IN',
            is_active: 1,
            has_app_access: 1
        },
        {
            sap_employee_code: '21000002',
            first_name: 'MADAN PAL',
            last_name: 'SINGH CHAUHAN M',
            email: 'madan@oigoman.com',
            password: 'b70933d88b41c1370e46ab35ad4989a1',
            sex: 'male',
            role_code: '50000114',
            daily_contract_hrs: 8.5,
            country: 'IN',
            is_active: 1,
            has_app_access: 1
        },
        {
            sap_employee_code: '21000004',
            first_name: 'PRANITH KUMAR',
            last_name: 'POTHUGANTI',
            email: 'pranith@oigoman.com',
            password: 'e9a6d69629b86cddd6e0c526ffe8ba89',
            sex: 'male',
            role_code: '50000118',
            daily_contract_hrs: 8.5,
            country: 'IN',
            is_active: 1,
            has_app_access: 1
        }
    ], { validate: true });
    let currentDate = new Date().toISOString().split('T')[0];
    yield models_1.EmployeeLeaves.bulkCreate([
        { employee_code: '20000002', date: currentDate, leave_type: 1 },
        { employee_code: '20000003', date: currentDate, leave_type: 1 },
        { employee_code: '21000004', date: currentDate, leave_type: 1 },
        { employee_code: '21000001', date: currentDate, leave_type: 1 },
        { employee_code: '21000002', date: currentDate, leave_type: 1 }
    ], { validate: true });
});
const addQuoteLineItems = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.QuoteLineItem.bulkCreate([
        {
            quote_item_id: 1,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 1,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 1,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 1,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 1,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        },
        {
            quote_item_id: 2,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 2,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 2,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 2,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 2,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        },
        {
            quote_item_id: 3,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 3,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 3,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 3,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 3,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        },
        {
            quote_item_id: 4,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 4,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 4,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 4,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 4,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        },
        {
            quote_item_id: 5,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 5,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 5,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 5,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 5,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        },
        {
            quote_item_id: 5,
            material_code: 'HXA50/5.',
            qty: 2,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 6,
            material_code: 'HXA50/9.',
            qty: 4,
            price: 150,
            unit_descriptor: 'hour'
        },
        {
            quote_item_id: 6,
            material_code: 'DISINF001',
            qty: 20,
            price: 200,
            unit_descriptor: 'kilogram'
        },
        {
            quote_item_id: 6,
            material_code: 'LY00000001',
            qty: 30,
            price: 300,
            unit_descriptor: 'litre'
        },
        {
            quote_item_id: 6,
            material_code: 'MAN0001',
            qty: 10,
            price: 1500,
            unit_descriptor: 'person'
        }
    ]);
});
const addStatusMaster = () => __awaiter(void 0, void 0, void 0, function* () {
    yield statusMaster_1.default.bulkCreate([
        { id: 1, status_code: 'ST01', is_active: 1, type: 'job', desc: 'Not Started' },
        { id: 2, status_code: 'ST02', is_active: 1, type: 'job', desc: 'Ongoing - Regular' },
        { id: 3, status_code: 'ST03', is_active: 1, type: 'job', desc: 'Ongoing - One-Off Job ' },
        { id: 4, status_code: 'ST04', is_active: 1, type: 'job', desc: 'Completed - Regular' },
        { id: 5, status_code: 'ST05', is_active: 1, type: 'job', desc: 'Completed - One-off Job' },
        { id: 6, status_code: 'ST06', is_active: 1, type: 'job', desc: 'Reopened' },
        { id: 7, status_code: 'ST07', is_active: 1, type: 'materialrequest', desc: 'Open' },
        { id: 8, status_code: 'ST08', is_active: 1, type: 'materialrequest', desc: 'Approved' },
        { id: 9, status_code: 'ST09', is_active: 1, type: 'materialrequest', desc: 'Warehouse Partially Approved' },
        { id: 10, status_code: 'ST10', is_active: 1, type: 'materialrequest', desc: 'DM Partially Approved' },
        { id: 11, status_code: 'ST11', is_active: 1, type: 'materialrequest', desc: 'Delivered' },
        { id: 12, status_code: 'ST12', is_active: 1, type: 'materialrequest', desc: 'Rejected by Warehouse' },
        { id: 13, status_code: 'ST13', is_active: 1, type: 'materialrequest', desc: 'Rejected' },
        { id: 14, status_code: 'ST14', is_active: 1, type: 'quote', desc: 'Open' },
        { id: 15, status_code: 'ST15', is_active: 1, type: 'quote', desc: 'Rejected' },
        { id: 16, status_code: 'ST16', is_active: 1, type: 'quote', desc: 'Closed' }
    ], { validate: true });
});
const curdate = new Date();
curdate.setDate(curdate.getDate() - 5);
let start_date = (0, dayjs_1.default)(curdate).format('YYYY-MM-DD');
curdate.setDate(curdate.getDate() + 10);
let end_date = (0, dayjs_1.default)(curdate).format('YYYY-MM-DD');
const addPaymentTerms = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.PaymentTerms.bulkCreate([
        {
            code: 'Z001',
            term: '90 Days',
            is_accessible: 1
        },
        {
            code: 'Z002',
            term: '60 Days',
            is_accessible: 1
        }
    ], { validate: true });
});
const addJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Job.bulkCreate([
        {
            sap_job_code: 'J01',
            status_code: 'ST05',
            is_oneoff_job: 1,
            sap_site_code: 'SS01',
            sap_quote_id: 'Q01',
            division_id: '1',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J02',
            status_code: 'ST05',
            is_oneoff_job: 1,
            sap_site_code: 'SS01',
            sap_quote_id: 'Q01',
            division_id: '3',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z001'
        },
        {
            sap_job_code: 'J03',
            status_code: 'ST01',
            sap_site_code: 'SS01',
            is_oneoff_job: 1,
            sap_quote_id: 'Q01',
            division_id: '4',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J04',
            status_code: 'ST01',
            sap_site_code: 'SS01',
            sap_quote_id: 'Q01',
            division_id: '5',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J05',
            status_code: 'ST02',
            sap_site_code: 'SS02',
            sap_quote_id: 'Q01',
            division_id: '1',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J06',
            status_code: 'ST02',
            sap_site_code: 'SS02',
            sap_quote_id: 'Q01',
            division_id: '3',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J07',
            status_code: 'ST01',
            sap_site_code: 'SS02',
            sap_quote_id: 'Q01',
            division_id: '4',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J08',
            status_code: 'ST01',
            sap_site_code: 'SS02',
            sap_quote_id: 'Q01',
            division_id: '5',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J09',
            status_code: 'ST02',
            sap_site_code: 'SS03',
            sap_quote_id: 'Q01',
            division_id: '1',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J10',
            status_code: 'ST01',
            sap_site_code: 'SS03',
            sap_quote_id: 'Q01',
            division_id: '3',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J11',
            status_code: 'ST01',
            sap_site_code: 'SS03',
            sap_quote_id: 'Q01',
            division_id: '4',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z002'
        },
        {
            sap_job_code: 'J12',
            status_code: 'ST01',
            sap_site_code: 'SS03',
            sap_quote_id: 'Q01',
            division_id: '5',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z001'
        },
        {
            sap_job_code: 'J13',
            status_code: 'ST02',
            sap_site_code: 'SS01',
            sap_quote_id: 'Q01',
            division_id: '2',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z001',
            catering_type: 'internal'
        },
        {
            sap_job_code: 'J14',
            status_code: 'ST02',
            sap_site_code: 'SS01',
            sap_quote_id: 'Q01',
            division_id: '2',
            start_date: start_date,
            end_date: end_date,
            payment_terms_code: 'Z001',
            catering_type: 'internal'
        }
    ], { validate: true });
    yield models_1.Supervisor.bulkCreate([
        { job_code: 'J01', employee_code: '21000002', temp_alloted: 0 },
        { job_code: 'J02', employee_code: '21000002', temp_alloted: 0 },
        { job_code: 'J03', employee_code: '21000002', temp_alloted: 0 },
        { job_code: 'J04', employee_code: '21000002', temp_alloted: 0 },
        { job_code: 'J14', employee_code: '21000002', temp_alloted: 0 },
        // { job_code: 'J05', employee_code: 'E0130', temp_alloted: 0 },
        // { job_code: 'J06', employee_code: 'E0130', temp_alloted: 0 },
        // { job_code: 'J07', employee_code: 'E0130', temp_alloted: 0 },
        // { job_code: 'J08', employee_code: 'E0130', temp_alloted: 0 },
        // { job_code: 'J09', employee_code: 'E0131', temp_alloted: 0 },
        // { job_code: 'J10', employee_code: 'E0131', temp_alloted: 0 },
        // { job_code: 'J11', employee_code: 'E0131', temp_alloted: 0 },
        // { job_code: 'J12', employee_code: 'E0131', temp_alloted: 0 },
        { job_code: 'J05', employee_code: '21000002', temp_alloted: 1, temp_start_date: new sequelize_1.DATEONLY(), temp_end_date: new sequelize_1.DATEONLY() },
        { job_code: 'J06', employee_code: '21000002', temp_alloted: 1, temp_start_date: new sequelize_1.DATEONLY(), temp_end_date: new sequelize_1.DATEONLY() },
        { job_code: 'J13', employee_code: '21000002', temp_alloted: 1, temp_start_date: new sequelize_1.DATEONLY(), temp_end_date: new sequelize_1.DATEONLY() }
    ], { validate: true });
    yield models_1.JobAllocation.bulkCreate([
        { job_code: 'J01', employee_code: '20000002' },
        { job_code: 'J02', employee_code: '20000003' },
        { job_code: 'J03', employee_code: '21000004' },
        { job_code: 'J04', employee_code: '21000001' },
        { job_code: 'J05', employee_code: '20000002' },
        { job_code: 'J06', employee_code: '20000002' },
        // { job_code: 'J07', employee_code: 'E0135' },
        // { job_code: 'J08', employee_code: 'E0136' },
        { job_code: 'J09', employee_code: '20000003' },
        // { job_code: 'J10', employee_code: 'E0137' },
        // { job_code: 'J11', employee_code: 'E0138' },
        // { job_code: 'J12', employee_code: 'E0145' },
        { job_code: 'J01', employee_code: '21000002' }
        // { job_code: 'J01', employee_code: 'E0130' },
        // { job_code: 'J01', employee_code: 'E0131' },
        // { job_code: 'J14', employee_code: '21000002' },
        // { job_code: 'J14', employee_code: 'E0130' },
        // { job_code: 'J14', employee_code: 'E0131' }
    ], { validate: true });
    yield models_1.Supervisor.bulkCreate([
        // { job_code: 'J01', employee_code: 'E0130', temp_alloted: 1, temp_start_date: new DATEONLY(), temp_end_date: new DATEONLY() },
        // { job_code: 'J01', employee_code: 'E0131', temp_alloted: 1, temp_start_date: new DATEONLY(), temp_end_date: new DATEONLY() },
        { job_code: 'J14', employee_code: '21000002', temp_alloted: 1, temp_start_date: new sequelize_1.DATEONLY(), temp_end_date: new sequelize_1.DATEONLY() }
        // { job_code: 'J14', employee_code: 'E0130', temp_alloted: 1, temp_start_date: new DATEONLY(), temp_end_date: new DATEONLY() },
        // { job_code: 'J14', employee_code: 'E0131', temp_alloted: 1, temp_start_date: new DATEONLY(), temp_end_date: new DATEONLY() }
    ], { validate: true });
    yield models_1.MaterialMaster.bulkCreate([
        {
            material_code: 'DISINF001',
            material_name: 'Detergent',
            is_active: 1,
            unit_descriptor: 'kilogram',
            division_id: 1,
            price: 200,
            image_url: 'https://www.bigbasket.com/media/uploads/p/l/264009_13-tide-plus-detergent-washing-powder-extra-power-jasmine-rose.jpg',
            type: 'material'
        },
        {
            material_code: 'LY00000001',
            material_name: 'Bleach',
            is_active: 1,
            unit_descriptor: 'litre',
            division_id: 1,
            price: 300,
            image_url: 'https://5.imimg.com/data5/IA/UW/DG/SELLER-26944847/laundry-bleach-500x500.jpg',
            type: 'material'
        },
        {
            material_code: 'HXA50/5.',
            material_name: 'Equipment 1',
            is_active: 1,
            unit_descriptor: 'hour',
            division_id: 1,
            price: 150,
            type: 'equipment'
        },
        {
            material_code: 'HXA50/9.',
            material_name: 'Equipment 2',
            is_active: 1,
            unit_descriptor: 'hour',
            division_id: 1,
            price: 150,
            type: 'equipment'
        },
        {
            material_code: 'MAN0001',
            material_name: 'Man',
            is_active: 1,
            unit_descriptor: 'person',
            division_id: 1,
            price: 1500,
            type: 'man-power'
        }
    ], { validate: true });
    yield models_1.EmpMaterialBin.bulkCreate([
        { id: 1, employee_code: '21000002', material_code: 'DISINF001', current_qty: 50 },
        { id: 2, employee_code: '21000002', material_code: 'LY00000001', current_qty: 80 },
        { id: 7, employee_code: '20000003', material_code: 'DISINF001', current_qty: 50 },
        { id: 8, employee_code: '20000003', material_code: 'LY00000001', current_qty: 80 },
        { id: 13, employee_code: '21000001', material_code: 'DISINF001', current_qty: 50 },
        { id: 14, employee_code: '21000001', material_code: 'LY00000001', current_qty: 80 },
        { id: 25, employee_code: '21000004', material_code: 'DISINF001', current_qty: 50 },
        { id: 26, employee_code: '21000004', material_code: 'LY00000001', current_qty: 80 }
    ]);
    yield models_1.MaterialLedger.bulkCreate([
        {
            id: 1,
            job_code: 'J01',
            material_code: 'DISINF001',
            quantity: 50,
            type: 'received',
            supervisor_emp_code: '21000002',
            material_request_id: 1
        },
        {
            id: 2,
            job_code: 'J01',
            material_code: 'LY00000001',
            quantity: 10,
            type: 'used',
            supervisor_emp_code: '21000002',
            material_request_id: null
        },
        {
            id: 4,
            job_code: 'J02',
            material_code: 'DISINF001',
            quantity: 50,
            type: 'received',
            supervisor_emp_code: '21000001',
            material_request_id: 4
        },
        {
            id: 5,
            job_code: 'J02',
            material_code: 'LY00000001',
            quantity: 30,
            type: 'return',
            supervisor_emp_code: '21000001',
            material_request_id: null
        }
    ]);
    yield models_1.EquipmentMaster.bulkCreate([
        { is_active: 1, name: 'Equipment 1', equipment_code: 'HXA50/5.' },
        { is_active: 1, name: 'Equipment 2', equipment_code: 'HXA50/9.' }
    ]);
});
const addService = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.ServiceCatalog.bulkCreate([
        {
            id: 1,
            service_code: 'BHK2000001',
            description: 'General Cleaning - Sweeping, scrubbing (buffing if marble floor) with spcialised equipment  and mopping of floors, kitchen cleaning, toilet cleaning & disinfection, cleaning of windows and balcony. (vacuuming of carpet if any)',
            price: 345,
            display_order: 1,
            division_id: '1',
            service_name: '1 BHK Apartment ',
            unit_descriptor: 'Sq. mtr',
            service_type: 'regular'
        },
        {
            id: 2,
            service_code: 'SOFA100001',
            description: 'Termite protection upto 1 year',
            price: 400,
            display_order: 2,
            division_id: '4',
            service_name: 'Termite Pest Control',
            unit_descriptor: 'Sq. mtr',
            service_type: 'regular'
        }
    ], { validate: true });
});
const addServiceItem = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.ServiceItem.bulkCreate([
        {
            service_code: 'BHK2000001',
            material_code: 'DISINF001',
            qty: 20
        },
        {
            service_code: 'BHK2000001',
            material_code: 'LY00000001',
            qty: 30
        },
        {
            service_code: 'BHK2000001',
            material_code: 'HXA50/5.',
            qty: 2
        },
        {
            service_code: 'BHK2000001',
            material_code: 'HXA50/9.',
            qty: 4
        },
        {
            service_code: 'BHK2000001',
            material_code: 'MAN0001',
            qty: 10
        },
        {
            service_code: 'SOFA100001',
            material_code: 'DISINF001',
            qty: 20
        },
        {
            service_code: 'SOFA100001',
            material_code: 'LY00000001',
            qty: 30
        },
        {
            service_code: 'SOFA100001',
            material_code: 'HXA50/5.',
            qty: 2
        },
        {
            service_code: 'SOFA100001',
            material_code: 'HXA50/9.',
            qty: 4
        },
        {
            service_code: 'SOFA100001',
            material_code: 'MAN0001',
            qty: 10
        }
    ], { validate: true });
});
const addCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Customer.bulkCreate([
        {
            customer_code: 'CC01',
            name: 'Anand Singh',
            mobile_number: '566690403',
            address_line_1: 'Borivali',
            address_line_2: null,
            total_outstanding_amount: 5000
        },
        {
            customer_code: 'CC02',
            name: 'Anand Singh 2',
            mobile_number: '566690404',
            address_line_1: 'Borivali',
            address_line_2: null,
            total_outstanding_amount: 4000
        },
        {
            customer_code: 'CC03',
            name: 'Anand Singh 3',
            mobile_number: '566690405',
            address_line_1: 'Borivali',
            address_line_2: null,
            total_outstanding_amount: 9000
        }
    ], { validate: true });
    yield models_1.Quote.bulkCreate([
        {
            customer_id: '1',
            status_code: 'ST14',
            total: 3000,
            sap_quote_id: 'Q01',
            vat: 200,
            discount: 200,
            margin: 20,
            job_duration: 3,
            payment_on_credit: 0,
            site_visit_require: 1,
            site_visited_status: 0,
            created_supervisor_id: '21000002',
            assigned_supervisor_id: '21000002',
            assigned_by_id: '21000002',
            payment_mode: 'cash',
            paid: 0,
            start_date: new Date(),
            copy_of_quote: 'digital'
        },
        {
            customer_id: '2',
            status_code: 'ST14',
            total: 3000,
            vat: 200,
            discount: 200,
            margin: 20,
            sap_quote_id: 'Q02',
            payment_on_credit: 0,
            job_duration: 4,
            site_visit_require: 1,
            site_visited_status: 0,
            created_supervisor_id: '21000002',
            assigned_supervisor_id: '21000002',
            assigned_by_id: '21000002',
            payment_mode: 'cash',
            paid: 0,
            start_date: new Date(),
            copy_of_quote: 'digital'
        },
        {
            customer_id: '3',
            status_code: 'ST14',
            total: 3000,
            vat: 200,
            discount: 200,
            margin: 20,
            sap_quote_id: 'Q03',
            payment_on_credit: 0,
            job_duration: 3,
            site_visit_require: 1,
            site_visited_status: 0,
            created_supervisor_id: '21000002',
            assigned_supervisor_id: '21000002',
            assigned_by_id: '21000002',
            payment_mode: 'cash',
            paid: 0,
            start_date: new Date(),
            copy_of_quote: 'digital'
        }
    ], { validate: true });
    yield models_1.QuoteItem.bulkCreate([
        {
            id: 1,
            quote_id: 1,
            service_id: 1,
            qty: 3,
            price: 200
        },
        {
            id: 2,
            quote_id: 1,
            service_id: 2,
            qty: 4,
            price: 200
        },
        {
            id: 3,
            quote_id: 2,
            service_id: 1,
            qty: 3,
            price: 200
        },
        {
            id: 4,
            quote_id: 2,
            service_id: 2,
            qty: 4,
            price: 200
        },
        {
            id: 5,
            quote_id: 3,
            service_id: 1,
            qty: 3,
            price: 200
        },
        {
            id: 6,
            quote_id: 3,
            service_id: 2,
            qty: 4,
            price: 200
        }
    ]);
});
const sapConfigData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.SapConfig.bulkCreate([
        {
            id: 1,
            monthly_emp_max_hrs: 400,
            monthly_emp_max_alert_hrs: 50,
            regular_hrs_max: '12:00',
            vat_percentage: 5,
            payment_terms: ['30 days', '60 days', '90 days'],
            site_coverage_limit_meters: 500
        }
    ], { validate: true });
});
const addEmployeeWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.EmployeeCashWallet.bulkCreate([
        {
            id: 1,
            employee_code: '21000002',
            cr_amount: 1000,
            payment_id: 1,
            balance: 4000,
            synced_ts: new Date()
        },
        {
            id: 2,
            employee_code: '21000002',
            dr_amount: 2000,
            payment_id: 2,
            balance: 2000,
            synced_ts: new Date()
        }
    ], { validate: true });
});
const addSapMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.SapMenu.bulkCreate([
        {
            sap_menu_code: 'P01',
            sap_menu_desc: 'poori',
            sap_menu_name: 'poori',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'C01',
            sap_menu_desc: 'chapathi',
            sap_menu_name: 'chapathi',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'B01',
            sap_menu_desc: 'biriyani',
            sap_menu_name: 'biriyani',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'V01',
            sap_menu_desc: 'veg curry',
            sap_menu_name: 'veg curry',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N01',
            sap_menu_desc: 'nugets',
            sap_menu_name: 'nugets',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N02',
            sap_menu_desc: 'non veg curry',
            sap_menu_name: 'non veg curry',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N03',
            sap_menu_desc: 'nutella',
            sap_menu_name: 'nutella',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N04',
            sap_menu_desc: 'naan',
            sap_menu_name: 'naan',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N05',
            sap_menu_desc: 'nacho',
            sap_menu_name: 'nacho',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N06',
            sap_menu_desc: 'non veg naan',
            sap_menu_name: 'non veg naan',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N07',
            sap_menu_desc: 'navel oranges',
            sap_menu_name: 'navel oranges',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N08',
            sap_menu_desc: 'noodles',
            sap_menu_name: 'noodles',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N09',
            sap_menu_desc: 'non veg noodles',
            sap_menu_name: 'non veg noodles',
            synced_ts: new Date()
        },
        {
            sap_menu_code: 'N10',
            sap_menu_desc: 'nipat',
            sap_menu_name: 'nipat',
            synced_ts: new Date()
        }
    ]);
});
const addPaymentCollectionData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Payment.bulkCreate([
        {
            id: 1,
            job_code: 'J01',
            payment_mode: 'cash',
            amount: 1000,
            collected_employee_code: '21000002',
            customer_id: 1,
            cheque_sap_handover_status: 0,
            cheque_bounce: 0
        },
        {
            id: 2,
            job_code: 'J02',
            payment_mode: 'cash',
            amount: 2000,
            collected_employee_code: '21000002',
            customer_id: 2,
            cheque_sap_handover_status: 1,
            cheque_bounce: 0
        },
        {
            id: 3,
            job_code: 'J03',
            payment_mode: 'cheque',
            amount: 1500,
            collected_employee_code: '21000002',
            customer_id: 3,
            cheque_sap_handover_status: 1,
            cheque_bounce: 1
        }
    ], { validate: true });
});
const addInitiationChecklistData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.InitiationCheckList.bulkCreate([
        {
            id: 1,
            service_id: 1,
            checklist: 'checklist 1'
        },
        {
            id: 2,
            service_id: 2,
            checklist: 'checklist 1'
        },
        {
            id: 3,
            service_id: 3,
            checklist: 'checklist 3'
        },
        {
            id: 4,
            service_id: 4,
            checklist: 'checklist 4'
        },
        {
            id: 5,
            service_id: 5,
            checklist: 'checklist 5'
        }
    ], { validate: true });
});
const addServiceGroupList = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.ServiceGroup.bulkCreate([
        { id: 1, service_group_code: 1, name: 'BANKS', is_active: 1 },
        { id: 2, service_group_code: 2, name: 'CA-PDO IFM', is_active: 1 },
        { id: 3, service_group_code: 3, name: 'CINEMAS', is_active: 1 },
        { id: 4, service_group_code: 4, name: 'CORPORATE', is_active: 1 },
        { id: 5, service_group_code: 5, name: 'EDUCATION', is_active: 1 },
        { id: 6, service_group_code: 6, name: 'EMBASSIES', is_active: 1 },
        { id: 7, service_group_code: 7, name: 'FINANCE', is_active: 1 },
        { id: 8, service_group_code: 8, name: 'FOOD CHAINS', is_active: 1 },
        {
            id: 9,
            service_group_code: 9,
            name: 'GOVERNMENT ENTITIES',
            is_active: 1
        },
        { id: 10, service_group_code: 10, name: 'HEALTH CARE', is_active: 1 },
        { id: 11, service_group_code: 11, name: 'HOSPITALS', is_active: 1 },
        { id: 12, service_group_code: 12, name: 'HOTELS', is_active: 1 },
        {
            id: 13,
            service_group_code: 13,
            name: 'INDUSTRIAL ESTATES',
            is_active: 1
        },
        { id: 14, service_group_code: 14, name: 'LOGISTICS', is_active: 1 },
        { id: 15, service_group_code: 15, name: 'MALLS', is_active: 1 },
        { id: 16, service_group_code: 16, name: 'MINISTRIES', is_active: 1 },
        { id: 17, service_group_code: 17, name: 'MOD', is_active: 1 },
        { id: 18, service_group_code: 18, name: 'MOSQUES', is_active: 1 },
        { id: 19, service_group_code: 19, name: 'OFFICES', is_active: 1 },
        { id: 20, service_group_code: 20, name: 'OIL & GAS', is_active: 1 },
        { id: 21, service_group_code: 21, name: 'OMAN AIR', is_active: 1 },
        {
            id: 22,
            service_group_code: 22,
            name: 'PORT AUTHORITIES',
            is_active: 1
        },
        { id: 23, service_group_code: 23, name: 'PUBLIC PARKS', is_active: 1 },
        { id: 24, service_group_code: 24, name: 'RCA', is_active: 1 },
        { id: 25, service_group_code: 25, name: 'RELIGIOUS', is_active: 1 },
        { id: 26, service_group_code: 26, name: 'SHOPS', is_active: 1 },
        { id: 27, service_group_code: 27, name: 'SOUQS', is_active: 1 },
        {
            id: 28,
            service_group_code: 28,
            name: 'SPORTS COMPLEX',
            is_active: 1
        },
        { id: 29, service_group_code: 29, name: 'VILLA/FLAT', is_active: 1 }
    ]);
});
const addInvoiceData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Invoice.bulkCreate([
        {
            id: 1,
            job_code: 'J01',
            status: 'pending collection',
            sap_invoice_date: new Date(),
            sap_invoice_code: 'IN01',
            sap_invoice_due_date: new Date(),
            sap_invoice_amount: 5000,
            discount: 500,
            vat: 5,
            due_amount: 4750,
            pre_payment: 250
        },
        {
            id: 2,
            job_code: 'J02',
            status: 'pending collection',
            sap_invoice_date: new Date(),
            sap_invoice_code: 'IN02',
            sap_invoice_due_date: new Date(),
            sap_invoice_amount: 5000,
            discount: 500,
            vat: 5,
            due_amount: 4750,
            pre_payment: 250
        },
        {
            id: 3,
            job_code: 'J03',
            status: 'pending collection',
            sap_invoice_date: new Date(),
            sap_invoice_code: 'IN03',
            sap_invoice_due_date: new Date(),
            sap_invoice_amount: 5000,
            discount: 500,
            vat: 5,
            due_amount: 4750,
            pre_payment: 250
        }
    ]);
});
const dummyData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_1.connection.sync({ force: true });
        yield addDefaultRoles();
        yield addDefaultDivisionMaster();
        yield addService();
        yield addPaymentTerms();
        yield addDefaultSapSite();
        yield addStatusMaster();
        yield addDefaultSapLocation();
        yield addDefaultEmployees();
        yield addCustomers();
        yield addJobs();
        yield addQuoteLineItems();
        yield sapConfigData();
        yield addPaymentCollectionData();
        yield addEmployeeWallet();
        // await addInitiationChecklistData()
        yield addSapMenu();
        yield addServiceItem();
        yield addServiceGroupList();
        yield addInvoiceData();
        let successObj = {
            statusCode: 200,
            message: 'Successfully refreshed token.'
        };
        successHandler_1.successHandler.handleSuccess(successObj, res, req);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error.message);
        throw new appErrors_1.AppError({
            httpCode: httpResponse_1.HttpCode.NOT_FOUND,
            description: error.message
        });
    }
});
exports.default = { addDefaultRoles, addDefaultEmployees, addStatusMaster, dummyData };
