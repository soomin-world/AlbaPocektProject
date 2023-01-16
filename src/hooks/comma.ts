const comma = (payload: string) => {
  const list = [];
  const result = payload.substring(0, payload.length % 3); // 맨 앞부터 나머지만큼 자르기
  const result2 = payload.substring(payload.length % 3); // 나머지만큼 자르고 남은 부분

  if (result.length > 0) {
    list.push(result);
  }

  const num = Math.floor(payload.length / 3); // 몫 구하기

  for (let i = 0; i < num; i++) {
    list.push(result2.slice(i * 3, (i + 1) * 3));
  }

  const res = list.join();
  console.log(res);
  return res;
};

export default comma;
