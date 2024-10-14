module.exports = {
  apps: [
    {
      name: "2-view-my-startup",
      script: "./main.js",
      instances: 0,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
