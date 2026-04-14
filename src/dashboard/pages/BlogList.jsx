import { Link } from "react-router-dom";
import { posts } from "../../data/blogPosts";
import StatusPill from "../components/StatusPill";
import { IconPlus, IconEye, IconEdit } from "../components/Icons";

// All 9 posts in the blogPosts file are "Published" on the live site.
// For the demo we mark a couple as drafts to show the distinction.
const statusOverrides = {
  7: "Draft",
  8: "Scheduled",
};

export default function BlogList() {
  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Blog</h1>
          <p className="mm-dash__page-subtitle">
            Editorial features, real weddings, and planning guides. {posts.length} total.
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <Link to="/dashboard/blog/new" className="mm-dash__btn mm-dash__btn--primary">
            <IconPlus width={14} height={14} />
            New post
          </Link>
        </div>
      </div>

      <div className="mm-dash__table-wrap">
        <table className="mm-dash__table">
          <thead>
            <tr>
              <th style={{ width: "42%" }}>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Published</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const status = statusOverrides[post.id] || "Published";
              return (
                <tr key={post.id}>
                  <td data-label="Title">
                    <span className="mm-dash__table-title">{post.title}</span>
                    <span className="mm-dash__table-sub">{post.excerpt.slice(0, 90)}...</span>
                  </td>
                  <td data-label="Category" className="is-secondary">{post.category}</td>
                  <td data-label="Author">{post.author.name}</td>
                  <td data-label="Status"><StatusPill status={status} /></td>
                  <td data-label="Published" className="is-secondary">{post.date}</td>
                  <td data-label="" className="mm-dash__table-actions">
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mm-dash__btn mm-dash__btn--ghost"
                      style={{ padding: "6px 10px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconEye width={14} height={14} />
                      View
                    </Link>
                    <Link
                      to={`/dashboard/blog/${post.slug}`}
                      className="mm-dash__btn mm-dash__btn--ghost"
                      style={{ padding: "6px 10px" }}
                    >
                      <IconEdit width={14} height={14} />
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
