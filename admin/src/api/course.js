import axios from '@/libs/api.request'


export const getCoursePageList = opt => {
    return axios.request({
        url: '/VideoCourse/GetCouseList',
        data:opt,
        method: 'post'
    })
}
export const getCourseModel=id=>{
    return axios.request({
        url: '/RecordingCourse/GetModel',
        data:{courseId:id},
        method: 'post'
    })
}
//课程分类
export const getCourseTypes=()=>{
    return axios.request({
        url: '/VideoCourse/GetCourseTypes',
       // data:{courseId:id},
        method: 'post'
    })
}
 