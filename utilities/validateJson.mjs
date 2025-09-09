// customized middlewares: Validate JSON body
export function validateJsonMiddleware(req, res, next) {
  const contentType = req.headers['content-type'];

  // Allow non-JSON (like form submissions)
  if (!contentType || !contentType.includes('application/json')) {
    return next();
  }

  // For JSON requests, ensure it's valid
  if (req.method === 'POST' || req.method === 'PATCH') {
    if (req.is('application/json') && !req.body) {
      return res.status(400).json({ error: 'Invalid or missing JSON body' });
    }
  }

  next();
}