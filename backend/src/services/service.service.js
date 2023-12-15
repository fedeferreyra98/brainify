import ServiceRepository from "../repositories/service.repository.js";

class ServiceService {
    async getAll(category) {
        return ServiceRepository.getAll(category);
    }

    async getById(serviceId) {
        return ServiceRepository.getById(serviceId);
    }

    async getByUserId(userId) {
        return ServiceRepository.getByUserId(userId);
    }

    async create(service) {
        return ServiceRepository.create(service);
    }

    async update(serviceId, userId, service) {
        console.log('Service Service, service body: ', service)
        return ServiceRepository.update(serviceId, userId, service);
    }

    async delete(serviceId, userId) {
        return ServiceRepository.delete(serviceId, userId);
    }

    async validateCategory(category) {
        return ServiceRepository.validateCategory(category);
    }
    async getTop3() {
        return ServiceRepository.getTop3();
    }
}

export default new ServiceService();