resource "aws_apigatewayv2_api" "http_api" {
  name          = "crud-autos-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "public_service" {
  api_id = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = aws_ecs_service.public_service.network_configuration[0].public_ip
}

resource "aws_apigatewayv2_route" "public_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /public"
  target    = aws_apigatewayv2_integration.public_service.id
}
