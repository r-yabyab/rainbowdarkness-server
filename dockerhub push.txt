pipeline {
    agent {label 'linux'}

    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub')
    }

    stages {

            stage('gitclone') {
                steps {
                    git branch: 'main', url: 'https://github.com/r-yabyab/rainbowdarkness-server.git'
                }
            }

            stage('Build') {
                steps {
                    sh 'docker build -t cayabyabrr/rainbowdarkness-server:latest .'
                }
            }

            stage('Login') {
                
                steps {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }

            stage('Push') {

                steps {
                    sh 'docker push cayabyabrr/rainbowdarkness-server:latest'
                }
            }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}