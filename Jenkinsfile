pipeline {
    agent any

    stages {
        stage('Git Pull') {
            steps {
                git branch: 'main',
                    credentialsId: 'github',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                echo "=== BACKEND BUILD START ==="
                cd backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                echo "=== FRONTEND BUILD START ==="
                cd frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "=== DEPLOY START ==="
                docker compose down
                docker compose up -d --build
                '''
            }
        }
    }
}

