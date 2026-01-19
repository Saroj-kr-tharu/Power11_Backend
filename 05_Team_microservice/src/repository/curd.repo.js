class CurdRepo {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');

            throw error;
        }
    }

    async getAll() {
        try {
            const tag = await this.model.find({});
            return tag;
        } catch (error) {
            console.log('Something went wrong in repo (getAll)');
            throw error;
        }
    }


    async get(id) {
        try {
            const tag = await this.model.findById(id);
            return tag;
        } catch (error) {
            console.log('Something went wrong in repo (get)');
            throw error;
        }
    }

    async update(id, data, session = null) {
        try {
            const options = { new: true, runValidators: true };
            if (session) options.session = session;

            console.log('data => ', data, "  id => ", id)
            const updated = await this.model.findByIdAndUpdate(
                id,
                { $set: data },
                options
            );

            if (!updated) throw new Error('Team not found');

            return updated;
        } catch (error) {
            console.error('Repo update error:', error.message, error.stack);
            throw error;
        }
    }


    async destroy(id, session=null) {
        try {
            const options = {};
            if (session) options.session = session;
           
            const result = await this.model.findByIdAndDelete(id, options);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (destory)');
            throw error;
        }
    }


}


module.exports=  CurdRepo;