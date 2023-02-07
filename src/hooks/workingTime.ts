const workingTime = (workingTime: string) => {
  const times = workingTime.split(":");

  for (const i in times) {
    if (times[i][0] === "0") {
      times[i] = times[i][1];
    }
  }

  if (times[1] !== "0") {
    return `${times[0]}시간 ${times[1]}분`;
  } else {
    return `${times[0]}시간`;
  }
};

export default workingTime;
