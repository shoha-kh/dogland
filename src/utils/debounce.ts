export default <T>(fn: T, wait: number) => {
  let timer: number
  return (event: Event) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (typeof fn === 'function') {
        fn(event)
      }
    }, wait)
  }
}