const BaseUrl = "http://localhost:5000";
const APIV1 = `${BaseUrl}/admin/api/v1`;
module.exports = {
    // APIV1:'/admin/api/v1',
    api: {
        baseUrl:"http://localhost:5000",
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
        },
       
        caseCategory: {
            add:`${APIV1}/caseCategory/add`,
            list:`${APIV1}/caseCategory/list`,
            update:`${APIV1}/caseCategory/update`,
            delete:`${APIV1}/caseCategory/delete`,
        },
        style: {
            add:`${APIV1}/style/add`,
            list:`${APIV1}/style/list`,
            update:`${APIV1}/style/update`,
            delete:`${APIV1}/style/delete`,
        },
        color: {
            add:`${APIV1}/color/add`,
            list:`${APIV1}/color/list`,
            update:`${APIV1}/color/update`,
            delete:`${APIV1}/color/delete`,
        },
        case: {
            list: `${APIV1}/case/list`,
            addBase: `${APIV1}/case/addBase`,
            updateImageUrl: `${APIV1}/case/updateImageUrl`,
            detailById: `${APIV1}/case/detailById`,
            update: `${APIV1}/case/update`,
        },
        // case: {
        //     add:`${APIV1}/case/add`,
        //     list:`${APIV1}/case/list`,
        //     update:`${APIV1}/case/update`,
        //     delete:`${APIV1}/case/delete`,
        // },
        upload: {
            video: `${APIV1}/upload/video`,
            thumb: `${APIV1}/upload/thumb`,
            image: `${APIV1}/upload/image`,
        }
    }
}