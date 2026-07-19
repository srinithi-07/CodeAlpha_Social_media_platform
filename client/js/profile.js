const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

const username = document.getElementById("username");
const email = document.getElementById("email");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const profileAvatar = document.getElementById("profileAvatar");
const myPosts = document.getElementById("myPosts");

loadProfile();
loadMyPosts();

async function loadProfile() {

    try {

        const response = await fetch(
            `${BASE_URL}/users/${user.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        username.textContent = data.username;
        email.textContent = data.email;
        bio.textContent = `Bio: ${data.bio || "-"}`;

        followers.textContent = data.followers.length;
        following.textContent = data.following.length;

        profileAvatar.textContent =
            data.username.charAt(0).toUpperCase();

    } catch (err) {

        console.log(err);

    }

}

async function loadMyPosts() {

    try {

        const response = await fetch(
            `${BASE_URL}/posts/user/${user.id}`
        );

        const posts = await response.json();

        if (posts.length === 0) {

            myPosts.innerHTML =
                "<p>You haven't posted anything yet.</p>";

            return;

        }

        myPosts.innerHTML = "";

        posts.forEach(post => {

            myPosts.innerHTML += `
                <div class="my-post">

                    <p>${post.caption}</p>

                    <small>
                        ${new Date(post.createdAt).toLocaleString()}
                    </small>

                </div>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}