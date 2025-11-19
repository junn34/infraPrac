pipeline {
    agent any

    environment {
        // Jenkins Credentials (MySQL root 계정)
        DB_CRED = credentials('db-credential')
    }

    stages {

        stage('Checkout') {
            steps {
                // Jenkins workspace 로 체크아웃됨
                git branch: 'main',
                    credentialsId: 'github_token',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                echo "===== BUILD BACKEND ====="
                cd backend
                docker build -t sw_team_6_backend:latest .

                echo "===== BUILD FRONTEND ====="
                cd ../frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                echo "===== Move to Jenkins Workspace ====="
                cd /var/jenkins_home/workspace/sw_team_6_infra

                echo "===== STOP & REMOVE OLD DOCKER COMPOSE ====="
                docker-compose down || true

                echo "===== REMOVE OLD DOCKER RUN CONTAINERS ====="
                docker rm -f sw_team_6_backend || true
                docker rm -f sw_team_6_front || true
                docker rm -f sw_team_6_mysql || true

                echo "===== START NEW DOCKER COMPOSE ====="
                DB_USERNAME=${DB_CRED_USR} \
                DB_PASSWORD=${DB_CRED_PSW} \
                docker-compose up -d --build

                echo "===== DEPLOY FINISHED ====="
                '''
            }
        }
    }
}

