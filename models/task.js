const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Criando o modelo da entidade task
 */
var taskSchema = new Schema({
    title: { type: String, trim: true, required: [true, 'Campo título é obrigatório!'] },
    description: { type: String, default: null },
    priority: { type: Number, default: 3 }, // 1 prioridade máxima, 2 média, 3 normal
    labels: { type: Array, default: [] },
    completionDate: { type: Date, required: [true, 'Campo data para entrega é obrigatório!'] },
    noticeDate: { type: Date, default: null },
    isFinalized: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Task', taskSchema);