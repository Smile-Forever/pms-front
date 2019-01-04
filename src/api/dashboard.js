import request from "@/utils/request";

export function getMem() {
  return request({
    url: "/api/dashboard/mem",
    method: "get",
    params: {}
  });
}

export default getMem;
