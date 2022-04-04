
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service'

const STORAGE_KEY = 'conversation'

export const conversationService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(STORAGE_KEY, { filterBy });
}
function getById(conversationId) {
    // return storageService.get(STORAGE_KEY, conversationId)
    let filterBy = { _id: conversationId }
    return httpService.get(STORAGE_KEY, { params: { filterBy } });
}
function remove(messageId) {
    return storageService.remove(STORAGE_KEY, messageId)
    //   return httpService.delete(`message/${messageId}`);

}
function save(conversation) {
    if (conversation._id) {
        // return storageService.put(STORAGE_KEY, message)
        return httpService.put(`${STORAGE_KEY}/${conversation._id}`, conversation);

    } else {
        // return storageService.post(STORAGE_KEY, message
        return httpService.post(STORAGE_KEY, conversation);
    }
}


// const messages = [
//     {
//         toUserId: '102',
//         txt: 'Hello',
//         timestamp: Date.now()
//     },
//     {
//         toUserId: '102',
//         txt: 'There',
//         timestamp: Date.now()
//     },
//     {
//         toUserId: '102',
//         txt: 'Handsome',
//         timestamp: Date.now()
//     },
// ];





