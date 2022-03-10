import { utilService } from './util.service'
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities);
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(entities)
    //     }, 0)
    // })
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        return entities.find(entity => entity._id === entityId)
    } catch (err) {
        console.log('Could not get entities:', err);
        throw Error(err);
    }
}
async function post(entityType, newEntity) {
    newEntity._id = utilService.makeId();
    try {
        let entities = await query(entityType)
        entities.push(newEntity);

        _save(entityType, entities)
        return newEntity
    } catch (err) {
        console.log('Could not add entities:', err);
        throw Error(err);
    }
}

async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (err) {
        console.log('Could not update entities:', err);
        throw Error(err);
    }
}
async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (err) {
        console.log('Could not remove entities:', err);
        throw Error(err);
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}