import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
    const { user, logout, isAdmin } = useAuth();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <div className="nav-brand">
                    <h2>Auth System</h2>
                </div>
                <div className="nav-links">
                    {isAdmin && (
                        <Link to="/admin" className="btn btn-secondary">
                            Admin Panel
                        </Link>
                    )}
                    <button onClick={logout} className="btn btn-outline">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="dashboard-main">
                <div className="welcome-section">
                    <h1>Welcome, {user?.name}! 👋</h1>
                    <p>You're logged in to your secure dashboard.</p>
                </div>

                <div className="profile-card">
                    <div className="profile-header">
                        <div className="avatar">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-info">
                            <h3>{user?.name}</h3>
                            <span className={`role-badge role-${user?.role.toLowerCase()}`}>
                                {user?.role}
                            </span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-row">
                            <span className="label">Email</span>
                            <span className="value">{user?.email}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Account Status</span>
                            <span className={`status ${user?.enabled ? 'active' : 'inactive'}`}>
                                {user?.enabled ? 'Active' : 'Disabled'}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Member Since</span>
                            <span className="value">{user?.createdAt && formatDate(user.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">🔒</div>
                        <h4>Secure Authentication</h4>
                        <p>Your session is protected with JWT tokens and automatic refresh.</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🛡️</div>
                        <h4>Role-Based Access</h4>
                        <p>Access is controlled based on your assigned role ({user?.role}).</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">⏱️</div>
                        <h4>Session Management</h4>
                        <p>Tokens are securely stored and refreshed automatically.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
