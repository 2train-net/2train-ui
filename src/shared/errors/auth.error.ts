class AuthError extends Error {
  constructor(message: string = 'Auth Error') {
    super();

    this.name = 'AuthError';
    this.message = message;
  }
}

export default AuthError;
