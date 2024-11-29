resource "aws_ecs_cluster" "public_service" {
  name = "public-cluster"
}

resource "aws_ecs_task_definition" "public_task" {
  family                = "public-service-task"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                   = "256"
  memory                = "512"
  execution_role_arn    = aws_iam_role.execution_role.arn
  container_definitions = <<DEFINITION
[
  {
    "name": "public-service",
    "image": "nginx",
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80
      }
    ]
  }
]
DEFINITION
}

resource "aws_ecs_service" "public_service" {
  name            = "public-service"
  cluster         = aws_ecs_cluster.public_service.id
  task_definition = aws_ecs_task_definition.public_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public.id]
    security_groups = [aws_security_group.public_sg.id]
  }
}
