import request from "@/utils/request";

export function getUserList(param) {
  return request({
    url: "/api/user/all-list",
    method: "get",
    params: param
  });
}

export default getUserList;