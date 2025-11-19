pipeline {
    agent any

    environment {
        // Jenkins Credentials에서 username/password 불러오기
        DB_CRED = credentials('db-credential')
    }

    stages {

        stage('Git Pull') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Images') {
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
                echo "===== FORCE REMOVE OLD DOCKER RUN CONTAINERS ====="
                # 예전에 docker run으로 띄운 old 컨테이너 제거
                docker stop sw_team_6_backend || true
                docker rm sw_team_6_backend || true

                docker stop sw_team_6_front || true
                docker rm sw_team_6_front || true

                docker stop sw_team_6_mysql || true
                docker rm sw_team_6_mysql || true

                echo "===== STOP CURRENT COMPOSE (IF EXIST) ====="
                docker-compose down || true

                echo "===== START NEW COMPOSE WITH JENKINS CREDENTIALS ====="
                DB_USERNAME=${DB_CRED_USR} \
                DB_PASSWORD=${DB_CRED_PSW} \
                docker-compose up -d --build

                echo "===== DEPLOY COMPLETED ====="
                '''
            }
        }
    }
}

