import request from "@/utils/request";

export function getTitleList(param) {
  return request({
    url: "/api/sys-config/title/list",
    method: "get",
    params: param
  });
}

export default getTitleList;
