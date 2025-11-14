pipeline {
    agent any

    environment {
        DB_HOST = credentials('db_host')
        DB_USERNAME = credentials('db_username')
        DB_PASSWORD = credentials('db_password')
        NEXT_PUBLIC_API_URL = credentials('frontend_api_url')
    }

    stages {

        stage('Git Pull') {
            steps {
                git branch: 'main',
                    credentialsId: 'github_token',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                cd backend
                docker build \
                    --build-arg DB_HOST=$DB_HOST \
                    --build-arg DB_USERNAME=$DB_USERNAME \
                    --build-arg DB_PASSWORD=$DB_PASSWORD \
                    -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd frontend
                docker build \
                    --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
                    -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "=== DEPLOY WITH CREDENTIALS ==="

                export DB_HOST=$DB_HOST
                export DB_USERNAME=$DB_USERNAME
                export DB_PASSWORD=$DB_PASSWORD
                export NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

                docker-compose down
                docker-compose up -d --build
                '''
            }
        }
    }
}

