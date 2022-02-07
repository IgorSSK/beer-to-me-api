# USE CASES

-   Ver preços/promoções
-   Criar preços/promoções
-   Votar nivel de confiabilidade por preço/promoção
-   Inserir comentario por preço/promoção

# MODELO

## Estabelecimento

-   Nome
-   Endereço
-   Imagem

## Produto

-   Marca
-   Tipo
-   Imagem

## Comentarios

-   Autor
-   Texto
-   Data e hora

## Preço/Promoção

-   Estabelecimento
-   Produto
-   Preço
-   Condição
-   Data da postagem
-   Confiabilidade
-   Comentarios []

# Requisitos

    - AWS S3: armazenamento de imagens;
    - AWS Lambda + AWS API Gateway: serverless function para retornar as informações de acordo com os use cases;
    - AWS DynamoDB: armazenar preços/promoções e comentários;

# Arquitetura

Baseado na arquitetura hexagonal, o projeto contém a seguinte estrutura de pastas:

    |—— src
    	|—— common
    	|—— application
    		|—— services
    		|—— ports
    			|—— inbound
    			|—— outbound
    		|—— domain
    			 |—— models
    			 |—— dtos
    			 |—— enums
    	|—— adapters
    		|—— inbound
    			 |—— handlers
    			 |—— controllers
    		|—— outbound
    			 |—— persistence
    		|—— config
