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
                withCredentials([
                    string(credentialsId: 'db_host', variable: 'DB_HOST'),
                    string(credentialsId: 'db_username', variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password', variable: 'DB_PASSWORD')
                ]) {
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
        }

        stage('Build Frontend') {
            steps {
                withCredentials([
                    string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    cd frontend
                    docker build \
                        --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
                        -t sw_team_6_front:latest .
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'db_host', variable: 'DB_HOST'),
                    string(credentialsId: 'db_username', variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    echo "=== DEPLOYING ==="

                    export DB_HOST=$DB_HOST
                    export DB_USERNAME=$DB_USERNAME
                    export DB_PASSWORD=$DB_PASSWORD
                    export NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

                    docker rm -f sw_team_6_backend || true
                    docker rm -f sw_team_6_front || true

                    docker-compose down || true
                    docker-compose up -d --build
                    '''
                }
            }
        }
    }
}

