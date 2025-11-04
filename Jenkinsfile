pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh '/usr/bin/docker build -t infra-auto /app'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh '/usr/bin/docker stop infra-auto || true'
                    sh '/usr/bin/docker rm infra-auto || true'
                    sh '/usr/bin/docker run -d -p 8080:80 --name infra-auto infra-auto'
                }
            }
        }
    }
}

