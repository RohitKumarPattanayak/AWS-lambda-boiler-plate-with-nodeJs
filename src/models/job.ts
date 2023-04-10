import { DataTypes, Model } from 'sequelize'
import { IJobAttributes } from '../interfaces/job'
import { connection } from '../config/mysql'
import SapSite from './sapSite'
import StatusMaster from './statusMaster'
import DivisionMaster from './divisionMaster'
import Quote from './quote'
import PaymentTerms from './paymentTerms'

class Job extends Model<IJobAttributes> implements IJobAttributes {
    public id!: number
    public sap_job_code!: string
    public sap_site_code!: string
    public status_code!: string
    public is_oneoff_job!: number
    public sap_quote_id!: string
    public division_id!: string
    public is_location_enable!: number
    public spc_form_url: string
    public catering_type: string
    public start_date: string
    public end_date: string
    public payment_terms_code: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {
        Job.hasMany(models.Supervisor)
    }
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        sap_job_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        status_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: StatusMaster,
                key: 'status_code'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        is_oneoff_job: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        sap_site_code: {
            type: DataTypes.STRING(20),
            allowNull: false
            // references: {
            //     model: SapSite,
            //     key: 'site_code'
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE'
        },
        sap_quote_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        division_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: DivisionMaster,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        is_location_enable: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        spc_form_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        catering_type: {
            type: DataTypes.ENUM('internal', 'external'),
            allowNull: true
        },
        payment_terms_code: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    },
    {
        modelName: 'Job',
        tableName: 'job',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)
SapSite.hasMany(Job, {
    onDelete: 'cascade',
    foreignKey: 'sap_site_code'
})
Job.belongsTo(SapSite, {
    onDelete: 'cascade',
    foreignKey: 'sap_site_code'
})

Job.belongsTo(StatusMaster, {
    foreignKey: 'status_code'
})
Job.belongsTo(DivisionMaster, {
    foreignKey: 'division_id'
})

//NEEDED ASSOCIATION:
Quote.hasMany(Job, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    sourceKey: 'sap_quote_id',
    foreignKey: 'sap_quote_id'
})
Job.belongsTo(Quote, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    targetKey: 'sap_quote_id',
    foreignKey: 'sap_quote_id'
})

PaymentTerms.hasMany(Job, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})
Job.belongsTo(PaymentTerms, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})
export default Job

