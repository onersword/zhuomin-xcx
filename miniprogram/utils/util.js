export const formatTime = (time) => {
  const date = new Date(time);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return (
      [year, month, day].map(formatNumber).join('.') +
      ' ' +
      [hour, minute].map(formatNumber).join(':')
    )
  }
  
  const formatNumber = (n) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
  }

export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
