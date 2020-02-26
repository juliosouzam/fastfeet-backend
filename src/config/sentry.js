const dsn = process.env.APP_ENV === 'production' ? process.env.SENTR_DSN : '';

export default { dsn };
