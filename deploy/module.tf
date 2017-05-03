module "home" {
  source = "github.com/mtranter/tf-cv-overkill-aurelia-module"
  website_files = [
    "index.html",
    "scripts/app-bundle.js",
    "scripts/require.js",
    "scripts/text.js",
    "scripts/vendor-bundle.js"
  ]
  relative_source_path = "/../src/"
  region = "${var.region}"
}
