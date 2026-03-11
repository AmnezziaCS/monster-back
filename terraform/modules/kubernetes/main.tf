resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "monster-backend"
    namespace = var.namespace
    labels = {
      app       = "monster-backend"
      component = "api"
    }
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = {
        app = "monster-backend"
      }
    }

    template {
      metadata {
        labels = {
          app       = "monster-backend"
          component = "api"
        }
      }

      spec {
        container {
          name  = "monster-backend"
          image = "${var.backend_image}:${var.backend_tag}"

          port {
            container_port = var.backend_port
          }

          env {
            name = "DATABASE_URL"
            value_from {
              secret_key_ref {
                name = var.database_secret_name
                key  = var.database_url_key
              }
            }
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          env {
            name  = "PORT"
            value = tostring(var.backend_port)
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "monster-backend"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "monster-backend"
    }

    port {
      port        = var.backend_port
      target_port = var.backend_port
      node_port   = 30001
    }

    type = "NodePort"
  }
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "monster-frontend"
    namespace = var.namespace
    labels = {
      app       = "monster-frontend"
      component = "web"
    }
  }

  spec {
    replicas = var.frontend_replicas

    selector {
      match_labels = {
        app = "monster-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app       = "monster-frontend"
          component = "web"
        }
      }

      spec {
        container {
          name  = "monster-frontend"
          image = "${var.frontend_image}:${var.frontend_tag}"

          port {
            container_port = var.frontend_port
          }

          env {
            name  = "VITE_API_URL"
            value = "http://monster-backend:${var.backend_port}"
          }

          resources {
            requests = {
              cpu    = "50m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "200m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "monster-frontend"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "monster-frontend"
    }

    port {
      port        = var.frontend_port
      target_port = var.frontend_port
      node_port   = 30080
    }

    type = "NodePort"
  }
}