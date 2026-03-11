output "namespace" {
  value = kubernetes_namespace.monster.metadata[0].name
}

output "backend_service_name" {
  value = module.kubernetes.backend_service_name
}

output "frontend_service_name" {
  value = module.kubernetes.frontend_service_name
}

output "frontend_node_port" {
  value = module.kubernetes.frontend_node_port
}

output "backend_node_port" {
  value = module.kubernetes.backend_node_port
}