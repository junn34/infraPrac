pipeline {
    agent any

    environment {
        GIT_CRED = 'github_token'
        PROJECT_DIR = '/home/sw_team_6/infraPrac'
    }

    stages {

        /* ========================================
           Git Clone
        ======================================== */
        stage('Git Pull') {
            steps {
                git branch: 'main',
                    credentialsId: "${GIT_CRED}",
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        /* ========================================
           Create .env in actual compose directory
        ======================================== */
        stage('Prepare ENV') {
            steps {
                withCredentials([
                    string(credentialsId: 'db_username',        variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password',        variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url',   variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    echo "===== CREATE REAL .env FILES ====="

                    # Backend / docker-compose .env
                    cat > ${PROJECT_DIR}/.env <<EOF
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
EOF

                    # Frontend env
                    cat > ${PROJECT_DIR}/frontend/.env.production <<EOF
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
EOF

                    echo "===== ENV FILES CREATED at ${PROJECT_DIR} ====="
                    '''
                }
            }
        }

        /* ========================================
           Build Backend
        ======================================== */
        stage('Build Backend') {
            steps {
                sh '''
                echo "===== BUILD BACKEND ====="
                cd backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        /* ========================================
           Build Frontend
        ======================================== */
        stage('Build Frontend') {
            steps {
                withCredentials([
                    string(credentialsId: 'frontend_api_url', variable: 'NEXT_PUBLIC_API_URL')
                ]) {
                    sh '''
                    echo "===== BUILD FRONTEND ====="
                    cd frontend
                    docker build \
                        --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
                        -t sw_team_6_front:latest .
                    '''
                }
            }
        }

        /* ========================================
           Deploy (Compose executed in real folder)
        ======================================== */
        stage('Deploy') {
            steps {
                sh '''
                echo "===== STOP OLD CONTAINERS ====="
                cd ${PROJECT_DIR}
                docker-compose -p sw_team_6 down || true

                echo "===== START NEW CONTAINERS ====="
                cd ${PROJECT_DIR}
                docker-compose -p sw_team_6 up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 배포 성공! Backend + Frontend 컨테이너 정상 기동 완료!"
        }
        failure {
            echo "❌ 배포 실패. Jenkins 콘솔 로그 확인 필요!"
        }
    }
}

