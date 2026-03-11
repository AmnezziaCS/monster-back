variable "kubeconfig_path" {
  type    = string
  default = "~/.kube/config"
}

variable "kube_context" {
  type    = string
  default = "minikube"
}

variable "namespace" {
  type    = string
  default = "houdimonster"
}

variable "db_host" {
  type = string
}

variable "db_port" {
  type    = number
  default = 5432
}

variable "db_name" {
  type    = string
  default = "monster_db"
}

variable "db_user" {
  type    = string
  default = "monster_user"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "backend_image" {
  type    = string
  default = "ghcr.io/amnezziacs/monster-back"
}

variable "backend_tag" {
  type    = string
  default = "latest"
}

variable "backend_replicas" {
  type    = number
  default = 2
}

variable "backend_port" {
  type    = number
  default = 3000
}

variable "frontend_image" {
  type    = string
  default = "ghcr.io/amnezziacs/monster-front"
}

variable "frontend_tag" {
  type    = string
  default = "latest"
}

variable "frontend_replicas" {
  type    = number
  default = 2
}

variable "frontend_port" {
  type    = number
  default = 80
}