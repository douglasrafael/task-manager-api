const Task = require('./../models/task');

/**
 * Seleciana uma task de acordo com o id.
 * 
 * @param {Number} id 
 * @param {Function} callback 
 */
exports.get = function (id, callback) {
    Task.findById(id, function (err, res) {
        if (err) {
            return callback({ error: 'Não foi possivel recuperar a tarefa!' });
        }
        return callback({ task: res });
    });
}

/**
 * Lista todas as tasks da base de dados.
 * 
 * @param {Function} callback 
 */
exports.list = function (callback) {
    Task.find({}, function (err, res) {
        if (err) {
            return callback({ error: 'Não foi possível salvar a tarefa!' });
        }
        return callback({ tasks: res });
    });
}

/**
 * Salva uma nova task na base de dados.
 * 
 * @param {Task} obj 
 * @param {Function} callback 
 */
exports.save = function (obj, callback) {
    obj.save(function (err, res) {
        if (err) {
            return callback({ error: 'Não foi possível salvar a tarefa!' });
        }
        return callback({ task: res });
    });
}

/**
 * Remove uma task de acordo com o id.
 * 
 * @param {Number} id 
 * @param {Function} callback 
 */
exports.delete = function (id, callback) {
    Task.findByIdAndRemove(id, function (err) {
        if (err) {
            return callback({ error: 'Não foi possível remover a tarefa!' });
        }
        return callback({ result: true });
    });
}

/**
 * Atualiza os dados da task passada como parâmetro.
 * 
 * @param {Task} obj 
 * @param {Function} callback 
 */
exports.update = function (obj, callback) {
    console.log("ID", obj._id, obj.isFinalized);

    Task.findByIdAndUpdate(obj._id, obj, { new: true }, function (err, res) {
        if (err) {
            return callback({ error: 'Não foi possível atualizar a tarefa!' });
        }
        return callback({ task: res });
    });
}