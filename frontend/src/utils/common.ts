export const fakeDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

export const sort = (data: any, selector: string, direction: boolean) => {
  const dir = direction ? [1, -1] : [-1, 1]
  let result
  if (selector.includes('Date')) {
    result = data.sort((a: any, b: any) =>
      direction ? new Date(a[selector]).getTime() - new Date(b[selector]).getTime() : new Date(b[selector]).getTime() - new Date(a[selector]).getTime())
  } else if (selector.includes('count') || selector.includes('total')) {
    result = data.sort((a: any, b: any) =>
      direction ? a[selector] - b[selector] : b[selector] - a[selector])
  }
  else {
    result = data.sort((a: any, b: any) => (a[selector] > b[selector]) ? dir[0] : dir[1])
  }
  return result
}
