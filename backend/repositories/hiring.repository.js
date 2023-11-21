import Hiring from '../models/hiring.model';
import Service from '../models/service.model';

class HiringRepository{

    async getByServiceId(serviceId){
        return await Hiring.findById({serviceId}).lean();
    };

    async getByUserId(userId){
        return await Hiring.find({userId}).lean();
    };

    async create(hiringData){
        return await Hiring.create(hiringData);
    };

    async updateHiring(hiringId, updateData){
            const hiring = await Hiring.findById(hiringId);
            if (!hiring) {
                throw new Error("Contratación no encontrada");
            }
            Object.keys(updateData).forEach((update) => (hiring[update] = updateData[update]));
            await hiring.save();
            return hiring;
    };

    async attachServiceNameToHiring(hirings){
        return Promise.all(hirings.map(async (hiring) => {
            const service = await Service.findById(hiring.serviceId).lean();
            contract.serviceName = service? service.name : "Servicio eliminado";
            return hiring;
        }));
    };
};

export default new HiringRepository();