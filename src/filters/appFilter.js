export function appNamePrefix(str, len) {
  if (str && str.length > len) return str.substring(0, len);
  return str;
}
export function appTypeDescFilter(typeValue) {
  if (!typeValue) return typeValue;
  switch (typeValue) {
    case -1:
    case "-1":
      return "全局配置";
    case 1:
    case "1":
      return "全局限速";
    case 2:
    case "2":
      return "天/全局限速";
    case 3:
    case "3":
      return "分钟/小时";
    case 4:
    case "4":
      return "分钟/小时";
  }
}

export function appTypeTagFilter(typeValue) {
  if (!typeValue) return typeValue;
  switch (typeValue) {
    case -1:
    case "-1":
      return "danger";
    case 1:
    case "1":
      return "success";
    case 2:
    case "2":
      return "info";
    case 3:
    case "3":
      return "warning";
    case 4:
    case "4":
      return "success";
  }
}
