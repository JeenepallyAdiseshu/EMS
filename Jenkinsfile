pipeline {
    agent any

    environment {
        TOMCAT_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
        FRONTEND_PATH = "${WORKSPACE}\\Frontend\\ems-frontend"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_PATH}") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def targetPath = "${TOMCAT_PATH}\\ems-frontend"
                    
                    // Delete old folder if exists
                    bat """
                        if exist "${targetPath}" rmdir /S /Q "${targetPath}"
                        mkdir "${targetPath}"
                    """

                    // Copy dist folder, ignore robocopy exit codes
                    def robocopyStatus = bat(
                        script: """robocopy "${FRONTEND_PATH}\\dist" "${targetPath}" /E /NFL /NDL /NJH /NJS /nc /ns /np""",
                        returnStatus: true
                    )
                    echo "Robocopy exit code: ${robocopyStatus} (non-zero may be OK)"
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir("${WORKSPACE}\\Backend") {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def backendTarget = "${TOMCAT_PATH}\\ems-backend"
                    bat """
                        if exist "${backendTarget}" rmdir /S /Q "${backendTarget}"
                        mkdir "${backendTarget}"
                        copy /Y "${WORKSPACE}\\Backend\\target\\*.war" "${backendTarget}\\"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
