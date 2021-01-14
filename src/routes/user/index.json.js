export function get(req, res) {
  try {
    const { access_token, refresh_token } = req.session
    if (!access_token || !refresh_token) throw new Error('Missing session data')

    res.status(200).json({ access_token, refresh_token })
  } catch (err) {
    res.status(400).json(err)
  }
}
