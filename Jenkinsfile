pipeline {
    agent any
    tools {
        nodejs "Node20"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/yourname/your-bot-repo.git'
            }
        }
        stage('Install') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Restart Bot') {
            steps {
                bat 'pm2 start index.js --name "discord-bot" || pm2 reload discord-bot'
            }
        }
    }
}