pipeline {
    agent any
    tools {
        nodejs "Node20" // グローバルツール構成でNode 20を登録してある場合
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Bot') {
            steps {
                bat 'npm start'
            }
        }
    }
}
