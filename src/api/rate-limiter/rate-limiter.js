import request from "@/utils/request";

export function loadConfigList(param) {
  return request({
    url: "/api/sys-config/title/list",
    method: "get",
    params: param
  });
}

export function loadExceedCallHistory(param) {
  return request({
    url: "/api/rate-limiter/exceeded-call-history",
    method: "get",
    params: param
  });
}

export default loadConfigList;
