pipeline {
    agent any

    stages {
        stage('Git Pull') {
            steps {
                git branch: 'main',
                    credentialsId: 'github',
                    url: 'https://github.com/junn34/infraPrac.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                echo "=== BACKEND BUILD START ==="
                cd backend
                docker build -t sw_team_6_backend:latest .
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                echo "=== FRONTEND BUILD START ==="

                # 👉 프론트 환경파일 자동 생성
                echo "NEXT_PUBLIC_API_URL=http://192.168.0.79:8580" > frontend/bankedu-front/.env.production

                cd frontend
                docker build -t sw_team_6_front:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "=== DEPLOY START ==="
                docker compose down
                docker compose up -d --build
                '''
            }
        }
    }
}

