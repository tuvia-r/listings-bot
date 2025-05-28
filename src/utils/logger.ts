import Winston from 'winston';

const logger = Winston.createLogger({
    level: 'info',
    format: Winston.format.combine(Winston.format.timestamp(), Winston.format.json()),
    transports: [
        new Winston.transports.Console({
            format: Winston.format.combine(
                Winston.format.colorize(),
                Winston.format.timestamp(),
                Winston.format.metadata({
                    fillExcept: ['message', 'level', 'timestamp', 'name'],
                }),
                Winston.format.printf(({ level, message, metadata, name, timestamp }) => {
                    const meta = metadata && Object.keys(metadata).length ? ` ${JSON.stringify(metadata)}` : '';
                    return `${timestamp} [${level}] [${name}] ${message}${meta}`;
                }),
            ),
            level: 'debug',
        }),
        new Winston.transports.File({
            dirname: '.logs',
            maxFiles: 5,
            maxsize: 5242880,
            filename: 'app.log',
            level: 'info',
        }),
    ],
});

export function getLogger(name?: string): Winston.Logger {
    if (name) {
        return logger.child({ name });
    }
    return logger;
}
