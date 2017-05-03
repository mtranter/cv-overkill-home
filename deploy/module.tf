

provider "aws" {
  region = "${var.region}"
}

 data "terraform_remote_state" "cv_state" {
   backend = "s3"

   config {
     bucket  = "cv-overkill-tf-state"
     key     = "aws-infrastructure"
     region  = "eu-west-1"
   }
 }

resource "aws_s3_bucket_object" "object" {
  count   = "${length(var.website_files)}"
  bucket  = "${data.terraform_remote_state.cv_state.website_bucket_id}"
  key     = "${var.website_files[count.index]}"
  source  = "${path.cwd}${var.relative_source_path}${var.website_files[count.index]}"
  etag    = "${md5(file("${path.cwd}${var.relative_source_path}${var.website_files[count.index]}"))}"
  content_type = "${lookup(var.content_type_map, element(split(".", var.website_files[count.index]), length(split(".", var.website_files[count.index])) - 1))}"
}
