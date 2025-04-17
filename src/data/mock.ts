export function sleepAndReturn<T>(data: T, duraion: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duraion);
  });
}
