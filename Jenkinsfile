pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t infra-auto .'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh 'docker stop infra-auto || true'
                    sh 'docker rm infra-auto || true'
                    sh 'docker run -d -p 8080:80 --name infra-auto infra-auto'
                }
            }
        }
    }
}

