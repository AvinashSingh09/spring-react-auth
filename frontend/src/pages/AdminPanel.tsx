import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/auth.service';
import { User } from '../types';

export function AdminPanel() {
    const { logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch {
            setError('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleEnabled = async (user: User) => {
        setActionLoading(user.id);
        try {
            const updated = user.enabled
                ? await adminService.disableUser(user.id)
                : await adminService.enableUser(user.id);
            setUsers(users.map((u) => (u.id === user.id ? updated : u)));
        } catch {
            setError('Failed to update user status');
        } finally {
            setActionLoading(null);
        }
    };

    const handleRoleChange = async (user: User, newRole: 'USER' | 'ADMIN') => {
        setActionLoading(user.id);
        try {
            const updated = await adminService.assignRole(user.id, newRole);
            setUsers(users.map((u) => (u.id === user.id ? updated : u)));
        } catch {
            setError('Failed to update user role');
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="admin-container">
            <nav className="dashboard-nav">
                <div className="nav-brand">
                    <h2>Admin Panel</h2>
                </div>
                <div className="nav-links">
                    <Link to="/dashboard" className="btn btn-secondary">
                        Dashboard
                    </Link>
                    <button onClick={logout} className="btn btn-outline">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="admin-main">
                <div className="admin-header">
                    <h1>User Management</h1>
                    <p>Manage user accounts, roles, and permissions</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {isLoading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading users...</p>
                    </div>
                ) : (
                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className={!user.enabled ? 'disabled-row' : ''}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-small">{user.name.charAt(0).toUpperCase()}</div>
                                                <span>{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user, e.target.value as 'USER' | 'ADMIN')}
                                                disabled={actionLoading === user.id}
                                                className="role-select"
                                            >
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.enabled ? 'active' : 'inactive'}`}>
                                                {user.enabled ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td>{formatDate(user.createdAt)}</td>
                                        <td>
                                            <button
                                                onClick={() => handleToggleEnabled(user)}
                                                disabled={actionLoading === user.id}
                                                className={`btn btn-small ${user.enabled ? 'btn-danger' : 'btn-success'}`}
                                            >
                                                {actionLoading === user.id
                                                    ? '...'
                                                    : user.enabled
                                                        ? 'Disable'
                                                        : 'Enable'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
