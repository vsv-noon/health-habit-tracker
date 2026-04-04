export const authConfig = {
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'super-secret-refresh-key',
    // expiresIn: new Date(Date.now() + 60 * 1000), // 1 min,
    expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days,
  },
};
