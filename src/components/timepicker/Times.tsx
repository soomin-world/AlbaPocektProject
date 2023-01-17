function Times() {
  const hours: number[] = [];
  const minutes: number[] = [];

  for (let i = 0; i < 13; i++) {
    hours.push(i);
  }
  for (let i = 0; i < 60; i += 5) {
    minutes.push(i);
  }
  return <div>time</div>;
}

export default Times;
