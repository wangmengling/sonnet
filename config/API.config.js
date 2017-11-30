const BaseUrl = "http://localhost:5000";
const APIV1 = `${BaseUrl}/admin/api/v1`;
module.exports = {
    APIV1:'/admin/api/v1',
    api: {
        user: {
            login: `${APIV1}/user/login`,
            add: `${APIV1}/user/add`,
        },
        role: {
            add:`${APIV1}/role/add`,
            list:`${APIV1}/role/list`,
        }
    }
}