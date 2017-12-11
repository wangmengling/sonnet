const BaseUrl = "http://localhost:5000";
const APIV1 = `${BaseUrl}/admin/api/v1`;
module.exports = {
    APIV1:'/admin/api/v1',
    api: {
        user: {
            login: `${APIV1}/user/login`,
            add: `${APIV1}/user/add`,
            list: `${APIV1}/user/list`,
            update: `${APIV1}/user/update`,
            delete: `${APIV1}/user/delete`,
        },
        role: {
            add:`${APIV1}/role/add`,
            list:`${APIV1}/role/list`,
            update:`${APIV1}/role/update`,
            delete:`${APIV1}/role/delete`,
        }
    }
}