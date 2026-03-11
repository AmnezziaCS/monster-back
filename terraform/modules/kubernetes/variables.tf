variable "namespace" {
  type = string
}

variable "backend_image" {
  type = string
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
  type = string
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

variable "database_secret_name" {
  type = string
}

variable "database_url_key" {
  type    = string
  default = "DATABASE_URL"
}