export const getTimeLeft = function getTimeLeft(datetimeTo) {
  // 计算目标与现在时间差（毫秒）
  let time1 = datetimeTo;
  let time2 = new Date().getTime();
  if (time1 <= time2) return '(还剩0天0时0分处理)';
  let mss = time1 - time2;
  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
  return '(' + '还剩' + days + "天" + hours + "时" + minutes + "分" + seconds + '秒' + '处理' + ')'
}