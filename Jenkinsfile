def dockertag = "latest"
pipeline {
    parameters {
    string (name: "qaVersion",defaultValue:"""${params.qaVersion}""")      
    string (name: "prodVersion",defaultValue:"""${params.prodVersion}""") 
    string (name: "docker_image_repo",defaultValue:"""${params.docker_image_repo}""")
    }
    environment{
        qa_server_creds = credentials("qa-server-creds")
        qa_server_ip_address = "$qa_server_creds_USR"
        qa_server_password = "$qa_server_creds_PSW"

        prod_server_creds = credentials("prod-server-creds")
        prod_server_ip_address = "$prod_server_creds_USR"
        prod_server_password = "$prod_server_creds_PSW"

    }
    agent any
    stages {
        stage("Push Image to Docker Hub"){
              
            steps{
                withCredentials([usernamePassword(credentialsId: 'gitlab-dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                
                sh 'docker login -u $USERNAME -p $PASSWORD '
                script{
                if(GIT_BRANCH=="origin/master"){
                        dockertag = "${params.prodVersion}"
                }
                else{
                    dockertag = "${params.qaVersion}"
                }
                sh """
                echo "${dockertag}"
                docker version && \n
                docker build -t ${params.docker_image_repo}:${dockertag} . && \n
                docker push  ${params.docker_image_repo}:${dockertag} \n
                """
                }
            }
        }
    }
        stage("ssh deploy"){
            steps{
                script{
                if(GIT_BRANCH=="origin/staging"){
                def remote = [:]
                remote.name = 'root'
                remote.host = '$prod_server_ip_address'
                remote.user = 'root'
                remote.password = '$prod_server_password'
                remote.allowAnyHosts = true
                sshPut remote: remote, from: 'deployment.yaml', into: '.'
                sshCommand remote: remote, command: """
                    export version="${dockertag}"
                    envsubst < deployment.yaml | kubectl apply -f -"""
                }
                if(GIT_BRANCH=="origin/qa"){
                    def remote = [:]
                remote.name = 'root'
                remote.host = "$qa_server_ip_address"
                remote.user = 'root'
                remote.password = "$qa_server_password"
                remote.allowAnyHosts = true
                sshPut remote: remote, from: './docker-compose.yaml', into: '.'
                sshCommand remote: remote, command: """docker-compose pull && docker-compose up -d"""
                }
                }
            }
            
     }
}

}
