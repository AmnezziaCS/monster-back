output "secret_name" {
  value = kubernetes_secret.db_credentials.metadata[0].name
}

output "database_url_key" {
  value = "DATABASE_URL"
}

output "config_map_name" {
  value = kubernetes_config_map.db_config.metadata[0].name
}