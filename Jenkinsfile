pipeline {
    agent any
    stages {
        stage('Run Shell') {
            steps {
                // Git Bashを使う例
                bat '"C:\\Program Files\\Git\\bin\\bash.exe" -c "echo Hello from bash"'
                
                // WSLを使う例
                // bat 'wsl bash -c "echo Hello from WSL bash"'
            }
        }
    }
}
