

export function UserPanel({ user, onLogout }) {
    return (
        <div className="user-panel-container">
            <section className="username">{user.fullname}</section>
            <button className="btn-logout" onClick={onLogout}>logout</button>
        </div>
    );
}