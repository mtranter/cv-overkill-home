variable "region" {
  default = "eu-west-1"
}
variable "relative_source_path" {
  default = "/../src/"
}

variable "website_files" {
  type = "list"
  default = [
    "index.html",
    "config.js",
    "dist/app-build.js",
    "dist/aurelia.js",
    "assets/css/bootstrap.css",
    "assets/css/main.css",
    "assets/img/header-bg.jpg"
  ]
}

variable "content_type_map" {
  default = {
    "html"    = "text/html",
    "js"      = "application/javascript",
    "css"     = "text/css",
    "jpg"     = "image/jpeg"
  }
}
