locals {
  database_url = "postgresql://${var.db_user}:${var.db_password}@${var.db_host}:${var.db_port}/${var.db_name}?schema=public"
}

resource "kubernetes_secret" "db_credentials" {
  metadata {
    name      = "monster-db-secret"
    namespace = var.namespace
    labels = {
      app       = "houdimonster"
      component = "database"
    }
  }

  type = "Opaque"

  data = {
    DATABASE_URL = local.database_url
    DB_HOST      = var.db_host
    DB_PORT      = tostring(var.db_port)
    DB_NAME      = var.db_name
    DB_USER      = var.db_user
    DB_PASSWORD  = var.db_password
  }
}

resource "kubernetes_config_map" "db_config" {
  metadata {
    name      = "monster-db-config"
    namespace = var.namespace
    labels = {
      app       = "houdimonster"
      component = "database"
    }
  }

  data = {
    DB_HOST = var.db_host
    DB_PORT = tostring(var.db_port)
    DB_NAME = var.db_name
  }
}