import request from "@/utils/request";

export function loadTree(param) {
  return request({
    url: "/api/sys-config/department/tree",
    method: "get",
    params: param
  });
}

export function newNode(param){
  return request({
    url: "/api/sys-config/department/new",
    method: "post",
    params: param
  });
}
// export default { loadTree, newNode };
