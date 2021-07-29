export const my_debounce = (func, millisec) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, millisec);
  }
} 