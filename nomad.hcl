job "trivideo-frontend" {
  region = "DEV"
  datacenters = ["campus"]

  group "trivideo-frontend" {

    count = 1

    task "trivideo-frontend-public" {

      driver = "docker"

      service {
        tags = ["trv-net-dev-internal", "trv-env-dev"]
        name = "trivideo"
        port = "http"

        check {
          type     = "tcp"
          interval = "5s"
          timeout  = "2s"
        }
      }

      env {
        SERVER_PORT = "${NOMAD_HOST_PORT_http}"
      }

      config {
        image = "artifactory.tcs.trv.cloud:9090/trivideo:v1"
        port_map = {
          http = 80
        }
      }

      resources {
        cpu     = 1000
        memory  = 4000

        network {
          mbits = "100"

          port "http" {}
        }
      }
    }
   }
}
