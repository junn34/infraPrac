pipeline {
    agent any

    environment {
        GIT_CRED = 'github_token'
    }

    stages {

        stage('Git Pull') {
            steps {
                git branch: 'main',
                    credentialsId: "${GIT_CRED}",
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Prepare ENV') {
            steps {
                withCredentials([
                    string(credentialsId: 'db_username',        variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password',        variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url',   variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    echo "===== CREATE .env FILES ====="

                    # Workspace 기준으로 생성
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

        stage('Build Backend') {
            steps {
                sh '''
                echo "===== BUILD BACKEND ====="
                cd $WORKSPACE/backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                withCredentials([string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')]) {
                    sh '''
                    echo "===== BUILD FRONTEND ====="
                    cd $WORKSPACE/frontend
                    docker build \
                        --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
                        -t sw_team_6_front:latest .
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "===== DEPLOY ====="
                cd $WORKSPACE
                docker-compose -p sw_team_6 down || true
                docker-compose -p sw_team_6 up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 배포 성공!"
        }
        failure {
            echo "❌ 실패: Jenkins 콘솔 로그 확인!"
        }
    }
}

