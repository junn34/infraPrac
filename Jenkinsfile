pipeline {
    agent any

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
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'db_username', variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    export DB_USERNAME=$DB_USERNAME
                    export DB_PASSWORD=$DB_PASSWORD
                    export NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

                    docker-compose -p sw_team_6 down || true
                    docker-compose -p sw_team_6 up -d --build
                    '''
                }
            }
        }
    }
}

