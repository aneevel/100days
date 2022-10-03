const loadCommentsButtonElement = document.getElementById(
  "load-comments-button"
);
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

const fetchCommentsForPost = async (event) => {
  const postID = loadCommentsButtonElement.dataset.postid;

  try {
    const response = await fetch(`/posts/${postID}/comments`);

    if (!response.ok) {
      alert("Unable to fetch comments!");
      return;
    }

    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      const commentsListElement = createCommentsList(responseData);
      commentsSectionElement.innerHTML = "";
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent = `We could not find any comments. Maybe add one?`;
    }
  } catch (error) {
    alert("Getting comments failed!");
  }
};

const createCommentsList = (comments) => {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
    </article>
    `;
    commentListElement.append(commentElement);
  }

  return commentListElement;
};

loadCommentsButtonElement.addEventListener("click", fetchCommentsForPost);

commentsFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const postID = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postID}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) fetchCommentsForPost();
    else alert("Could not send comment!");
  } catch (error) {
    alert("Could not send request - try again later!");
  }
});
