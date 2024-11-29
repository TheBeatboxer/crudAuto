provider "aws" {
  region = "us-east-1" # Cambiar según tu región preferida
}

terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket"
    key            = "crud-autos/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}
