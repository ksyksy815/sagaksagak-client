const size = {
  laptop: `1024px`,
  tablet: `768px`,
  mobile: `425px`
}

export const device = {
  laptop: `(min-width: ${size.laptop})`,
  tablet: `(max-width: ${size.tablet})`,
  mobile: `(max-width: ${size.mobile})`
}