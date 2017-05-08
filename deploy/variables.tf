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
    "scripts/app-bundle.js",
    "scripts/require.js",
    "scripts/text.js",
    "scripts/vendor-bundle.js",
    "assets/css/bootstrap.css",
    "assets/css/main.css",
    "assets/css/font-awesome.min.css",
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
