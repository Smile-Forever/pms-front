import request from "@/utils/request";

export function getPositionList(param) {
  return request({
    url: "/api/sys-config/position/list",
    method: "get",
    params: param
  });
}

export default getPositionList;
