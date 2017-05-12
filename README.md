# Task Manager API - *Gerenciado de tarefas a fazer*
Operaçções HTTP atendidas: **GET, POST, PUT e DELETE.**
#### CRUD 
ACTION | RESULT
----- | ----
`GET /api/tasks` | Retorna lista com todos as tarefas 
`GET /api/tasks/5915d054aceb6a1b2422a593` | Retorna uma terefa específica
`POST /api/tasks` | Insere uma nova tarefa
`PUT /api/tasks/5915d054aceb6a1b2422a593` | Atualiza a tarefa #5915d054aceb6a1b2422a593
`DELETE /api/tasks/5915d054aceb6a1b2422a593` | Remove a tarefa #5915d054aceb6a1b2422a593

> Os dados são retornados no formato json.
Veja abaixo um exemplo do formato retornado: `GET /api/tasks/5915e7b1291d8a147874854e`

```json
{
    "task": {
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
}
```
