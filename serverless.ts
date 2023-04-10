import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
    useDotenv: true,
    // service: Keep service name in lower case.
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-layers', 'serverless-dotenv-plugin'],
    provider: {
        name: 'aws',
        //@ts-ignore
        region: 'ap-south-1',
        runtime: 'nodejs18.x',
        deploymentBucket: '${self:service}-serverless-bucket',
        apiGateway: {
            minimumCompressionSize: 1024
            // shouldStartNameWithService: true
        }
    },
    package: {
        individually: true,
        excludeDevDependencies: true,
        patterns: ['!node_modules/**']
    },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk', 'pg-hstore'],
            target: 'node18',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10
        },
        dotenv: {
            logging: false,
            exclude: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'NODE_ENV']
        }
    },
    service: 'oig',
    functions: {
        workflow: {
            name: 'hello',
            handler: `./api/handler.OIG_TEST_1`,
            events: [
                {
                    http: {
                        path: 'oig',
                        method: 'get',
                        cors: true
                    }
                    // eventBridge: {}
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration

