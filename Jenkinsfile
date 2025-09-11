pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('Frontend/ems-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def frontendBuildDir = "${WORKSPACE}\\Frontend\\ems-frontend\\dist"
                    def tomcatWebappsDir = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ems-frontend"

                    // Debug: list files in dist
                    bat "dir \"${frontendBuildDir}\" /b"

                    // Remove old Tomcat folder
                    bat """
                    if exist "${tomcatWebappsDir}" (
                        rmdir /S /Q "${tomcatWebappsDir}"
                    )
                    mkdir "${tomcatWebappsDir}"
                    """

                    // Copy frontend build to Tomcat
                    bat """
                    robocopy "${frontendBuildDir}" "${tomcatWebappsDir}" /E /NFL /NDL /NJH /NJS /nc /ns /np
                    """
                }
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Backend/SpringBootEmployeManagement') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def backendWar = "${WORKSPACE}\\Backend\\SpringBootEmployeManagement\\target\\SpringBootEmployeManagement.war"
                    def tomcatWebappsDir = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"

                    // Remove old WAR and exploded folder
                    bat """
                    if exist "${tomcatWebappsDir}\\SpringBootEmployeManagement.war" (
                        del /Q "${tomcatWebappsDir}\\SpringBootEmployeManagement.war"
                    )
                    if exist "${tomcatWebappsDir}\\SpringBootEmployeManagement" (
                        rmdir /S /Q "${tomcatWebappsDir}\\SpringBootEmployeManagement"
                    )
                    """

                    // Copy new WAR to Tomcat
                    bat """
                    copy "${backendWar}" "${tomcatWebappsDir}\\"
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
