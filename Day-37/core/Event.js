const { v4: uuidv4 } = require("uuid");
const model = require("../models/index");
const QueueJob = model.QueueJob;

class Event {
    constructor(job) {
        this.job = job;
        this.store();
    }

    store = async () => {
        const job = await QueueJob.create({
            key: uuidv4(),
            value: JSON.stringify({
                data: this.job,
                name: this.job.constructor.name,
            }),
        });
        console.log(job);
    };
}

module.exports = Event;
