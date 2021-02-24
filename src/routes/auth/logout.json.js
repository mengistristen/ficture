export function get(req, res) {
  req.session.access_token = undefined
  req.session.refresh_token = undefined
  req.session.username = undefined
  res.redirect('/auth/login')
}
