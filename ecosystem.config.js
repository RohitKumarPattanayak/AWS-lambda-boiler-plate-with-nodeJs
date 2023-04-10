module.exports = {
    apps: [
      {
      name: "supervisor_dev",
        script: "npm run migrate" && "npm start",
        "error_file" : "/var/log/pm2_logs/supervisor_dev-error.log",
        "out_file" : "/var/log/pm2_logs/supervisor_dev-output.log",
        "env": {
          "NODE_ENV": "default",
        },
        "env_dev": {
          "PORT": 3000,
          "NODE_ENV": "development",
        },
        "env_develop": {
          "PORT": 3000,
          "NODE_ENV": "development",
        },
        "env_prod": {
          "PORT": 3000,
          "NODE_ENV": "production",
        },
        "env_dev2": {
          "PORT": 3000,
          "NODE_ENV": "local_development",
        },
      },   
    ],
  
    deploy: {
      develop: {
        user: "sttdevops",
        host: "172.31.25.130",
        path: "/home/sttdevops/Attendance_supervisor_nodejs/",
        repo: "git@bitbucket.org:spurtreetech/stp_10221_supervisor_nodejs.git",
        ref: "origin/develop",
        key: "/var/lib/jenkins/sttdevops",
        "post-deploy": "npm i; pm2 reload ecosystem.config.js --only supervisor_dev --env develop",
      },
    },
  };
