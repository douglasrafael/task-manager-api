const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

/**
 * Criando o modelo da entidade task
 */
var taskSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    priority: { type: Number, default: 3 }, // Sets task priority: 1 for maximum priority, 2 medium priority, and 3 for normal
    labels: { type: Array, default: [] },
    completionDate: { type: Date, default: null },
    noticeDate: { type: Date, default: null },
    isFinalized: { type: Boolean, default: false }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Task', taskSchema);