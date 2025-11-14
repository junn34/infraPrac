pipeline {
    agent any

    stages {

        stage('Git Pull') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                echo "===== BUILD BACKEND ====="
                cd backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                echo "===== BUILD FRONTEND ====="
                cd frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                echo "===== REMOVE OLD CONTAINERS ====="
                docker stop sw_team_6_backend || true
                docker rm sw_team_6_backend || true

                docker stop sw_team_6_front || true
                docker rm sw_team_6_front || true

                echo "===== RUN NEW BACKEND ====="
                docker run -d \
                  --name sw_team_6_backend \
                  -p 8580:8080 \
                  --network sw_team_6_net \
                  sw_team_6_backend:latest

                echo "===== RUN NEW FRONTEND ====="
                docker run -d \
                  --name sw_team_6_front \
                  -p 8530:3000 \
                  --network sw_team_6_net \
                  sw_team_6_front:latest
                '''
            }
        }
    }
}

