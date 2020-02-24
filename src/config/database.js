module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'fastfeet',
  username: 'postgres',
  password: 'admin',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
