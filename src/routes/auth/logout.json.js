export function get(req, res) {
  console.log('logging out')
  req.session.access_token = null
  req.session.refresh_token = null
  res.redirect('/auth/login')
}
