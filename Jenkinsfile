pipeline {
    agent any

    environment {
        RUN_SLOW_TESTS = 'true'
    }

    stages {
        stage('Initialize build steps') {
            steps {
                script {
                    ['lts/*', 'node', '8'].each {
                        stage("run tests with ${it}") {
                            nvm(it) {
                               sh 'npm ci'
                               sh 'npm run test'
                            }
                        }
                    }
                } 
            }
        }
    }
}
