# Comandos docker + docker-compose

1. 🔼 Subir containers em segundo plano

```
  docker compose up -d
```

2. 🔽 Parar e remover containers, volumes e redes

```
  docker-compose down
```

3. ♻️ Subir novamente com rebuild (útil após alterações em Dockerfile)

```
  docker-compose down
```

4. 🔄 Rebuild da imagem manualmente

```
  docker compose build
```

5. 📜 Ver os logs do serviço

```
  docker compose logs -f
```

6. 📦 Listar containers rodando

```
  docker ps
```

7. 🔍 Listar todos os containers (incluindo parados)

```
  docker ps -a
```

8. 🧼 Remover containers parados

```
  docker container prune
```

9. 🧹 Limpar imagens não utilizadas

```
  docker image prune
```

10. 🧪 Entrar no terminal de um container em execução

```
  docker exec -it nome_ou_id_do_container bash
```

11. 🐳 Ver detalhes do container

```
  docker inspect nome_ou_id
```

12. 🔄 Restartar um container específico

```
  docker restart nome_ou_id
```
