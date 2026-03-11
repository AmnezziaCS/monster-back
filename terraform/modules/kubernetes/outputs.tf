output "backend_service_name" {
  value = kubernetes_service.backend.metadata[0].name
}

output "frontend_service_name" {
  value = kubernetes_service.frontend.metadata[0].name
}

output "frontend_node_port" {
  value = kubernetes_service.frontend.spec[0].port[0].node_port
}

output "backend_node_port" {
  value = kubernetes_service.backend.spec[0].port[0].node_port
}