import { connection } from '../config/mysql'
import Role from './role'
import CateringMenuGroup from './cateringMenuGroup'
import Employee from './employee'
import DivisionMaster from './divisionMaster'
import ServiceCategory from './serviceCategory'
import PublicHolidays from './publicHolidays'
import Attendence from './attendence'
import AttendenceAdditionalHours from './attendenceAdditionalHours'
import CateringRequest from './cateringRequest'
import Customer from './customer'
import EmployeeCashWallet from './employeeCashWallet'
import EmployeeLeaves from './employeeLeaves'
import EmpMaterialBin from './empMaterialBin'
import EquipmentMaster from './sapEquipmentMaster'
import EquipmentUsage from './equipmentUsage'
import InitiationCheckList from './initiationChecklist'
import Invoice from './invoice'
import Job from './job'
import JobAllocation from './jobAllocation'
import JobStatusSummary from './jobStatusSummary'
import MaterialLedger from './materialLedger'
import MaterialMaster from './materialMaster'
import Supervisor from './supervisor'
import StatusMaster from './statusMaster'
import MaterialRequest from './materialRequest'
import MaterialRequestItem from './materialRequestItem'
import SapConfig from './sapConfig'
import SapWarehouse from './sapWarehouse'
import MaterialRequestAction from './materialRequestAction'
import Quote from './quote'
import PicklistSap from './picklistSap'
import QuoteInitChecklist from './quoteInitChecklist'
import QuoteItem from './quoteItem'
import QuoteInitImages from './quoteInitImages'
import QuoteLog from './quoteLog'
import ServiceCatalog from './serviceCatalog'
import Payment from './payment'
import SapSite from './sapSite'
import SapMenu from './sapMenu'
import CateringMenu from './cateringMenu'
import DailyReport from './dailyReport'
import ServiceItem from './serviceItem'
import ServiceGroup from './serviceGroup'
import QuoteLineItem from './quoteLineItem'
import CustomerType from './customerType'
import PaymentTerms from './paymentTerms'
import SapLocation from './sapLocation'
import AdminUsers from './adminUsers'
const ConnectDB = async () =>
    new Promise((resolve, reject) => {
        connection
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
                connection
                    .sync()
                    .then((result) => {
                        resolve(connection)
                    })
                    .catch((err) => {
                        reject(connection)
                    })
            })
            .catch((err) => {
                console.log(err)
                reject(err)
                return
            })
    })

export {
    ConnectDB,
    MaterialMaster,
    Role,
    Employee,
    DivisionMaster,
    ServiceCategory,
    PublicHolidays,
    Attendence,
    AttendenceAdditionalHours,
    CateringRequest,
    Customer,
    EmployeeCashWallet,
    EmployeeLeaves,
    EmpMaterialBin,
    EquipmentMaster,
    EquipmentUsage,
    InitiationCheckList,
    Invoice,
    Job,
    JobAllocation,
    JobStatusSummary,
    MaterialLedger,
    SapConfig,
    SapSite,
    Supervisor,
    StatusMaster,
    MaterialRequest,
    MaterialRequestItem,
    SapWarehouse,
    MaterialRequestAction,
    Quote,
    QuoteInitChecklist,
    QuoteItem,
    QuoteLog,
    PicklistSap,
    ServiceCatalog,
    QuoteInitImages,
    Payment,
    SapMenu,
    CateringMenu,
    CateringMenuGroup,
    DailyReport,
    ServiceGroup,
    ServiceItem,
    QuoteLineItem,
    CustomerType,
    PaymentTerms,
    SapLocation,
    AdminUsers
}

