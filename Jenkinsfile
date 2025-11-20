pipeline {
    agent any

    environment {
        DB_CRED = credentials('db-credential')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github_token',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                echo "===== CLEAN BACKEND BUILD CACHE ====="
                rm -rf backend/bankedu-back/build || true

                echo "===== BUILD BACKEND (NO CACHE) ====="
                cd backend
                docker build --no-cache -t sw_team_6_backend:latest .

                echo "===== BUILD FRONTEND (NO CACHE) ====="
                cd ../frontend
                docker build --no-cache -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                echo "===== STOP OLD COMPOSE ====="
                docker-compose down || true

                echo "===== REMOVE OLD DOCKER CONTAINERS ====="
                docker rm -f sw_team_6_backend || true
                docker rm -f sw_team_6_front || true
                docker rm -f sw_team_6_mysql || true

                echo "===== START NEW COMPOSE WITH CREDS ====="
                DB_USERNAME=${DB_CRED_USR} \
                DB_PASSWORD=${DB_CRED_PSW} \
                docker-compose up -d --build

                echo "===== BACKEND LOGS (DEBUG) ====="
                docker logs sw_team_6_backend || true

                echo "===== DEPLOY COMPLETED ====="
                '''
            }
        }
    }
}

