const token = localStorage.getItem("token");
let loggedInUser = null;

if (!token) {
    window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("postBtn");
const captionInput = document.getElementById("caption");
const postsContainer = document.getElementById("posts");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

function createPostCard(post) {

    const initial = post.author.username.charAt(0).toUpperCase();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const isOwner =
        currentUser &&
        currentUser.id === post.author._id;

    const isFollowing =
        loggedInUser &&
        loggedInUser.following.includes(post.author._id);

    return `
        <div class="post-card">

            <div class="post-header">

                <div class="avatar">
                    ${initial}
                </div>

                <div class="user-info">

                    <h3>${post.author.username}</h3>

                </div>

                ${
                    !isOwner
                    ? `
                    <button
                        class="follow-btn"
                        onclick="toggleFollow('${post.author._id}')">

                        ${isFollowing ? "Unfollow" : "Follow"}

                    </button>
                    `
                    : ""
                }

            </div>

            <p class="post-caption">
                ${post.caption}
            </p>

            <div class="post-actions">

                <button
                    class="like-btn"
                    onclick="toggleLike('${post._id}')">

                    ❤️ Like (${post.likes.length})

                </button>

                ${
                    isOwner
                    ? `
                    <button
                        class="delete-btn"
                        onclick="deletePost('${post._id}')">

                        🗑 Delete

                    </button>
                    `
                    : ""
                }

            </div>

            <div
                class="comments-container"
                id="comments-${post._id}">
            </div>

            <div class="comment-input">

                <input
                    type="text"
                    id="comment-${post._id}"
                    placeholder="Write a comment...">

                <button
                    class="comment-submit"
                    onclick="addComment('${post._id}')">

                    Post

                </button>

            </div>

        </div>
    `;

}
async function loadLoggedInUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
        `${BASE_URL}/users/${user.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    loggedInUser = await response.json();
}
// ---------------- LOAD POSTS ----------------

async function loadPosts() {

    try {

        const response = await fetch(`${BASE_URL}/posts`);

        const posts = await response.json();

        postsContainer.innerHTML = "";

        posts.forEach(post => {

            postsContainer.innerHTML += createPostCard(post);

        });

        // Load comments for every post
        posts.forEach(post => {

            loadComments(post._id);

        });

    } catch (err) {

        console.log(err);

    }

}
async function toggleLike(postId) {

    try {

        const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {

            method: "PUT",

            headers: {

                "Authorization": `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (response.ok) {

            loadPosts();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

}
async function toggleFollow(userId) {

    try {

        const response = await fetch(
            `${BASE_URL}/users/follow/${userId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        await loadLoggedInUser();

        loadPosts();

    } catch (err) {

        console.log(err);

    }

}
async function deletePost(postId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${BASE_URL}/posts/${postId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;
        }

        loadPosts();

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}
async function loadComments(postId) {

    try {

        const response = await fetch(
            `${BASE_URL}/comments/${postId}`
        );

        const comments = await response.json();

        const container = document.getElementById(
            `comments-${postId}`
        );

        container.innerHTML = comments.map(comment => `
            <div class="comment">
                <strong>${comment.author.username}</strong>
                <p>${comment.text}</p>
            </div>
        `).join("");

    } catch (err) {

        console.log(err);

    }

}
async function addComment(postId) {

    const input = document.getElementById(
        `comment-${postId}`
    );

    const text = input.value.trim();

    if (!text) return;

    try {

        const response = await fetch(
            `${BASE_URL}/comments/${postId}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    text
                })

            }
        );

        if (!response.ok) {

            alert("Couldn't add comment.");

            return;

        }

        input.value = "";

        loadComments(postId);

    } catch (err) {

        console.log(err);

    }

}
// ---------------- CREATE POST ----------------

postBtn.addEventListener("click", async () => {

    const caption = captionInput.value.trim();

    if (!caption) {
        alert("Please enter something.");
        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/posts`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                caption
            })

        });

        const data = await response.json();

        if (response.ok) {

            captionInput.value = "";

            loadPosts();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

});

(async () => {

    await loadLoggedInUser();

    loadPosts();

})();