kubeconfig_path = "~/.kube/config"
kube_context    = "minikube"
namespace       = "houdimonster"

db_host     = "host.minikube.internal"
db_port     = 5432
db_name     = "monster_db"
db_user     = "monster_user"
db_password = "monster_password"

backend_image  = "ghcr.io/amnezziacs/monster-back"
backend_tag    = "latest"
frontend_image = "ghcr.io/amnezziacs/monster-front"
frontend_tag   = "latest"

backend_replicas  = 2
frontend_replicas = 2