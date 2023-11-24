import hiringRepository from "../repositories/hiring.repository.js";

class HiringService {
    async getByServiceId(serviceId) {
        return await hiringRepository.getByServiceId(serviceId);
    };

    async getByUserId(userId) {
        return await hiringRepository.getByUserId(userId);
    };

    async create(hiringData) {
        return await hiringRepository.create(hiringData);
    };

    async updateHiring(hiringId, updateData) {
        return await hiringRepository.updateHiring(hiringId, updateData);
    };

    async attachServiceNameToHiring(hirings) {
        return await hiringRepository.attachServiceNameToHiring(hirings);
    };
}

export default new HiringService();