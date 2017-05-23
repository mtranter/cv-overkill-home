variable "region" {
  default = "eu-west-1"
}
variable "relative_source_path" {
  default = "/../app/"
}

variable "website_files" {
  type = "list"
  default = [
    "index.html",
    "config.js",
    "dist/app-build.js",
    "dist/aurelia.js",
    "dist/vendor.js",
    "assets/img/waiting.gif",
    "assets/css/bootstrap.css",
    "dist/aws-sdk-2.50.0.min.js"
  ]
}

variable "content_type_map" {
  default = {
    "html"    = "text/html",
    "js"      = "application/javascript",
    "css"     = "text/css",
    "jpg"     = "image/jpeg",
    "gif"     = "image/gif"
  }
}
