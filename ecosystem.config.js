    module.exports = {
      apps: [
        {
          name: 'pet-adoption-backend',
          cwd: `${__dirname}/backend`,
          script: 'npm',
          args: 'start',
          env: {
            APP_KEYS: process.env.APP_KEYS,
            API_TOKEN_SALT: process.env.API_TOKEN_SALT,
            ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
            JWT_SECRET: process.env.JWT_SECRET,
      NODE_ENV: 'production',
      },
    },
  ],
};
