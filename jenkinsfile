pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/asmitsharma1/Resume-Analyser.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                cd backend
                python3 -m venv venv
                source venv/bin/activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t resume-backend .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f resume || true
                docker run -d -p 8000:8000 --name resume resume-backend
                '''
            }
        }
    }
}
