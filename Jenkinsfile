
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out by Jenkins from GitHub.'
            }
        }

        stage('Build and Test Product Service') {
            steps {
                bat 'mvn -B -DskipTests compile'
                bat 'mvn -B test'
            }
        }

        stage('Build and Test Order Service') {
            steps {
                dir('order-service') {
                    bat 'mvn -B test'
                }
            }
        }

        stage('Build and Test Auth Service') {
            steps {
                dir('auth-service') {
                    bat 'mvn -B test'
                }
            }
        }

        stage('Build React Frontend') {
            steps {
                bat 'npm ci'
                bat 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'H&M Retail CI pipeline completed successfully.'
        }
        failure {
            echo 'CI pipeline failed. Check the stage logs for details.'
        }
        always {
            echo 'H&M Retail CI pipeline finished.'
        }
    }
}
