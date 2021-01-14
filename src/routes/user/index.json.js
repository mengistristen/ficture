export function get(req, res) {
  if (req.session.access_token) console.log('yes')
}
