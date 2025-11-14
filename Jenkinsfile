pipeline {
    agent any

    environment {
        GIT_CRED = 'github_token'
    }

    stages {

        stage('Git Pull') {
            steps {
                sh '''
                echo "====== Git Pull Stage ======"
                pwd
                ls -al
                '''
                git branch: 'main',
                    credentialsId: "${GIT_CRED}",
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Prepare ENV') {
            steps {
                sh '''
                echo "====== Prepare ENV Stage ======"
                pwd
                ls -al
                '''

                withCredentials([
                    string(credentialsId: 'db_username', variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    echo "===== CREATE .env FILES ====="
                    echo "WORKSPACE = $WORKSPACE"
                    pwd
                    ls -al

                    cat > $WORKSPACE/.env <<EOF
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
EOF

                    cat > $WORKSPACE/frontend/.env.production <<EOF
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
EOF
                    '''
                }
            }
        }

        stage('Build Backend'){
            steps {
                sh '''
                echo "====== Build Backend Stage ======"
                pwd
                ls -al

                cd $WORKSPACE/backend
                pwd
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                withCredentials([string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')]) {
                    sh '''
                    echo "====== Build Frontend Stage ======"
                    pwd
                    ls -al

                    cd $WORKSPACE/frontend
                    pwd
                    docker build --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} -t sw_team_6_front:latest .
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "====== Deploy Stage ======"
                pwd
                ls -al

                cd $WORKSPACE
                pwd
                docker-compose -p sw_team_6 down || true
                docker-compose -p sw_team_6 up -d --build
                '''
            }
        }
    }
}

