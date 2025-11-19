import { User, UserRole } from '../types';

// In-memory user database simulation
let MOCK_USERS: (User & { password: string })[] = [
    {
        id: 'kuny-user',
        name: 'Kuny',
        handle: '@Kuny',
        email: 'kuny@xelar.com',
        password: 'kuny137%',
        dateOfBirth: '1990-01-01',
        avatarUrl: 'https://picsum.photos/seed/kuny/200/200',
        bannerUrl: 'https://picsum.photos/seed/kuny-banner/600/200',
        role: UserRole.Student,
        bio: 'Just a mock user exploring the academic world on Xelar.',
        followers: 137,
        following: 42,
    },
    {
        id: 'current-user',
        name: 'Dr. Alex Riley',
        handle: '@alexriley',
        email: 'alex@xelar.com',
        password: 'password123',
        dateOfBirth: '1985-05-15',
        avatarUrl: 'https://picsum.photos/seed/user/200/200',
        bannerUrl: 'https://picsum.photos/seed/user-banner/600/200',
        role: UserRole.Professor,
        bio: 'Professor of Computer Science at Xelar University. Fascinated by the intersection of AI and human creativity. #AI #CompSci',
        followers: 1258,
        following: 342,
    }
];

const CURRENT_USER_KEY = 'xelar-current-user';

export const login = async (handleOrEmail: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const user = MOCK_USERS.find(
        u => (u.handle.toLowerCase() === `@${handleOrEmail.toLowerCase()}` || u.email.toLowerCase() === handleOrEmail.toLowerCase())
    );
    
    if (user && user.password === password) {
        const { password, ...userToReturn } = user;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToReturn));
        return userToReturn;
    }

    throw new Error('Invalid credentials. Please check your details and try again.');
};

export const signup = async (userData: Omit<User, 'id' | 'followers' | 'following' | 'avatarUrl'> & { password: string, avatarFile?: File }): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for existing user
    if (MOCK_USERS.some(u => u.email.toLowerCase() === userData.email.toLowerCase() || u.handle.toLowerCase() === userData.handle.toLowerCase())) {
        throw new Error('A user with this email or handle already exists.');
    }

    // Age verification (must be 16+)
    const today = new Date();
    const birthDate = new Date(userData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 16) {
        throw new Error('You must be at least 16 years old to sign up.');
    }

    const newUser: User & { password: string } = {
        id: `user-${new Date().getTime()}`,
        ...userData,
        avatarUrl: `https://picsum.photos/seed/${userData.email}/200/200`, // Default avatar
        followers: 0,
        following: 0,
    };

    MOCK_USERS.push(newUser);
    const { password, ...userToReturn } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToReturn));
    return userToReturn;
};

export const logout = (): void => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
    try {
        const userJson = localStorage.getItem(CURRENT_USER_KEY);
        if (!userJson) return null;
        return JSON.parse(userJson) as User;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};