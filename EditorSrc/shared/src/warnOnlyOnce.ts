// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default function warnOnlyOnce(message: string) {
  if (!__DEV__) {
    return;
  }
  let run = false;
  return () => {
    if (!run) {
      console.warn(message);
    }
    run = true;
  };
}
