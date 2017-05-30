# Task Manager API - *Gerenciado de tarefas a fazer*
Operações HTTP atendidas: **GET, POST, PUT e DELETE.**
#### CRUD 
ACTION | RESULT | STATUS CODE
----- | ---- | ----
`GET /api/tasks` | Retorna lista com todas as tarefas  | 200
`GET /api/tasks/:_id` | Retorna uma terefa específica  | 200, 404
`POST /api/tasks` | Insere uma nova tarefa e retorna o objeto inserido  | 201, 400
`PUT /api/tasks/:_id` | Atualiza a tarefa #5915d054aceb6a1b2422a593 e retorna o objeto atualizado | 201, 404
`DELETE /api/tasks/:_id` | Remove a tarefa #5915d054aceb6a1b2422a593 e retorna o objeto removido | 200, 404

> Os dados são retornados no formato json.
Veja abaixo um exemplo do formato retornado:
`GET /api/tasks/5915e7b1291d8a147874854e`

```json
{
    "__v": 0,
    "updated_at": "2017-05-12T16:49:53.522Z",
    "created_at": "2017-05-12T16:49:53.522Z",
    "title": "Minha primeira tarefa",
    "_id": "5915e7b1291d8a147874854e",
    "isFinalized": false,
    "noticeDate": null,
    "completionDate": "2017-05-22T00:00:00.000Z",
    "labels": [
        "task",
        "test"
    ],
    "priority": 1,
    "description": "Descrição da tarefa"
}
```
