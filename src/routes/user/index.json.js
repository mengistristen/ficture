export function get(req, res) {
  try {
    const { access_token, refresh_token, username } = req.session
    if (!access_token || !refresh_token || !username)
      throw new Error('Missing session data')

    res.status(200).json({ access_token, refresh_token, username })
  } catch (err) {
    res.status(403).json(err)
  }
}
