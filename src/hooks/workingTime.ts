const workingTime = (workingTime: string) => {
  const times = workingTime.split(":");
  // console.log(times);

  for (const i in times) {
    if (times[i][0] === "0") {
      times[i] = times[i][1];
    }
  }
  // console.log(times);

  if (times[1] !== "0") {
    return `${times[0]}시간 ${times[1]}분`;
  } else {
    return `${times[0]}시간`;
  }
};

// const workingTime = "02:30";
// const data = useWorkingTime(workingTime);
// console.log(data);

export default workingTime;
