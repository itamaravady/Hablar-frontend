
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service'

const STORAGE_KEY = 'message'

export const messageService = {
    query,
    save,
    remove,
    getBotMessage
}

function query(filterBy = {}) {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(STORAGE_KEY, { params: { filterBy } });
}
function getBotMessage() {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(`${STORAGE_KEY}/bot`);
}

function remove(messageId) {
    return storageService.remove(STORAGE_KEY, messageId)
    //   return httpService.delete(`message/${messageId}`);

}
function save(conversationId, message) {

    if (message._id) {
        return httpService.put(`${STORAGE_KEY}/${message._id}`, message);

    } else {

        return httpService.post(STORAGE_KEY, { conversationId, message });
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





