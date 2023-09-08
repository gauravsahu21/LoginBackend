import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import * as  loggerConfigurations from '../../config/config.json'

const esTransportOpts = {
    clientOpts: {
        node: {
            url: new URL(loggerConfigurations.logger['host']),
            headers: {
                'Authorization': loggerConfigurations.logger['authorization'],
                'Content-Type': "application/json"
            }
        }
    },
    level: 'info',
    index: loggerConfigurations.logger['index'],
    transformer: transformlogData
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        esTransport
    ]
});

function transformlogData(logData) {
    let transformedData: any = {
        '@timestamp': new Date(),
        severity: logData.level,
        message: logData.message
    }
    if (typeof logData.meta === 'object') {
        transformedData.fields = logData.meta
    }
    return transformedData
}


export default logger;



