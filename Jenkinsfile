pipeline {
    agent any

    stages {
        stage('Git Pull') {
            steps {
                git branch: 'main', url: 'https://github.com/<username>/<repo>.git'
            }
        }

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

