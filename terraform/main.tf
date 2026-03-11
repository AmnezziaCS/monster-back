terraform {
  required_version = ">= 1.3.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
}

provider "kubernetes" {
  config_path    = var.kubeconfig_path
  config_context = var.kube_context
}

provider "helm" {
  kubernetes {
    config_path    = var.kubeconfig_path
    config_context = var.kube_context
  }
}

resource "kubernetes_namespace" "monster" {
  metadata {
    name = var.namespace
    labels = {
      app = "houdimonster"
    }
  }
}

module "database" {
  source    = "./modules/database"
  namespace = kubernetes_namespace.monster.metadata[0].name

  db_host     = var.db_host
  db_port     = var.db_port
  db_name     = var.db_name
  db_user     = var.db_user
  db_password = var.db_password
}

module "kubernetes" {
  source    = "./modules/kubernetes"
  namespace = kubernetes_namespace.monster.metadata[0].name

  backend_image       = var.backend_image
  backend_tag         = var.backend_tag
  backend_replicas    = var.backend_replicas
  backend_port        = var.backend_port

  frontend_image      = var.frontend_image
  frontend_tag        = var.frontend_tag
  frontend_replicas   = var.frontend_replicas
  frontend_port       = var.frontend_port

  database_secret_name = module.database.secret_name
  database_url_key     = module.database.database_url_key

  depends_on = [module.database]
}