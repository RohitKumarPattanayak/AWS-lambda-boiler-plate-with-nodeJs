import { Job, ConnectDB } from '../src/models'

export const OIG_TEST_1 = async (event, context, callback) => {
    try {
        await ConnectDB()
        console.log('db connected')
        let number = await Job.findAll({
            where: { sap_job_code: 'J80' }
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'connected oig dev with ',
                data: number
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const OIG_TEST_2 = (event, context, callback) => {
    let number = 20
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully! tested twice!',
            data: number
        })
    }

    callback(null, response)
}

