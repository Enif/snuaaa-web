interface AuthType {
    isLoggedIn: boolean,
    user_id: number,
    nickname: string,
    level: number,
    profile_path: string,
}

export default AuthType;
