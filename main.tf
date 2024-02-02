resource "helm_release" "data-mgmt-web" {
  name       = "data-mgmt-web"
  chart      = "/chart"
  namespace  = "data-mgmt-web-ns"
  create_namespace = true
}