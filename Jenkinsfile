pipeline {
    agent any

    environment {
        RUN_SLOW_TESTS = 'true'
    }

    stages {
        stage('install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('analyze'){
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('build distribution') {
            steps {
                sh 'npm run build:dist'
            }
        }

        stage('finalize') {
            steps {
                chuckNorris()
            }
        }
    }
}
