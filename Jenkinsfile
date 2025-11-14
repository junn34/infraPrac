pipeline {
    agent any

    environment {
        // GitHub Credential
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

        stage('Build Backend') {
            steps {
                sh '''
                echo "===== BUILD BACKEND ====="
                cd backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                echo "===== BUILD FRONTEND ====="
                cd frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'db_username',        variable: 'DB_USERNAME'),
                    string(credentialsId: 'db_password',        variable: 'DB_PASSWORD'),
                    string(credentialsId: 'frontend_api_url',   variable: 'NEXT_PUBLIC_API_URL')
                ]) {

                    sh '''
                    echo "===== WRITING .env FOR DOCKER-COMPOSE ====="

                    cat > .env <<EOF
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
EOF

                    echo "===== STOP OLD CONTAINERS ====="
                    docker-compose -p sw_team_6 down || true

                    echo "===== START NEW CONTAINERS ====="
                    docker-compose -p sw_team_6 up -d --build
OAOAOA                    '''
                }
OAOAOA            }
OAOAOA        }
    }
OAOAOA
    post {
OAOAOA        success {
OAOAOA            echo "🚀 배포 성공! 컨테이너 재기동 완료!"
OAOAOA        }
        failure {
            echo "❌ 배포 실패. Jenkins 콘솔 로그 확인 필요!"
        }
    }
}

