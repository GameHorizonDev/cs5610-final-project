function LandingPage() {
    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Welcome to Our Project</h1>
                <p className="lead text-muted">
                    Explore, review, and share your favorite games with the community.
                </p>
            </div>
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="card-title mb-3">About the App</h2>
                    <p className="card-text">
                        Our application is a <strong>game review website</strong> that allows users to explore, review, and rate their favorite games.
                        Users can discover new games, read community reviews, and share their thoughts on various games.
                        The app aims to foster a community of passionate gamers and provide a platform for meaningful discussions.
                    </p>
                </div>
            </div>
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="card-title mb-3">Team Members</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Angelo Cataldo - Section 2</li>
                        <li className="list-group-item">Dong Cheng - Section 2</li>
                        <li className="list-group-item">Quang Nguyen - Section 2</li>
                        <li className="list-group-item">Sizhu Qu - Section 2</li>
                        <li className="list-group-item">Yanling Peng - Section 3</li>
                    </ul>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title mb-3">Project Links</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <a
                                href="https://github.com/GameHorizonDev/cs5610-final-project"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                <i className="bi bi-github"></i> React Repository
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a
                                href="https://github.com/GameHorizonDev/cs5610-final-server"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                <i className="bi bi-github"></i> Node Repository
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
