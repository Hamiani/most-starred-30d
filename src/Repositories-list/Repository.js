import React from "react";

const Icon = ({ className, children }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const formatAge = days => {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
};

const Repository = props => {
  return (
    <ol className="repo-list">
      {props.repositories.map((repo, index) => {
        const days = props.handleDaysDifference(repo.created_at.split("T")[0]);
        return (
          <li key={index}>
            <a
              className="repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={index < 3 ? "rank rank-top" : "rank"}>
                {index + 1}
              </span>
              <img
                className="avatar"
                src={repo.owner.avatar_url}
                alt=""
                width="48"
                height="48"
                loading="lazy"
              />
              <div className="repo-body">
                <div className="repo-title">
                  <span className="repo-name">{repo.name}</span>
                  <Icon className="repo-external">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </Icon>
                  <span className="visually-hidden">
                    (opens on GitHub in a new tab)
                  </span>
                </div>
                <p
                  className={
                    repo.description
                      ? "repo-description"
                      : "repo-description is-empty"
                  }
                >
                  {repo.description || "No description provided."}
                </p>
                <div className="repo-meta">
                  <span className="stat">
                    <Icon className="stat-star">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </Icon>
                    {props.handleNumber(repo.stargazers_count)} stars
                  </span>
                  <span className="stat">
                    <Icon>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </Icon>
                    {props.handleNumber(repo.open_issues_count)} open issues
                  </span>
                  <span className="repo-created">
                    Created {formatAge(days)} by {repo.owner.login}
                  </span>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ol>
  );
};

export default Repository;
