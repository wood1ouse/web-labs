const fetchUser = async () => {
	const response = fetch("https://randomuser.me/api");
	const user = (await response).json();

	return user;
};

const insertUserstoDOM = async () => {
	fetchButton.disabled = true;

	if (document.querySelector(".user-container")) {
		document.querySelector(".user-container").remove();
		document.querySelector(".info").remove();
	}

	const users = document.createElement("div");
	const info = document.createElement("div");

	users.className = "user-container";
	info.className = "info";

	info.innerText = "Fetching...";
	document.body.appendChild(info);
	document.body.appendChild(users);

	for (let i = 0; i < 8; i++) {
		const user = await fetchUser();

		const { picture, name, email, location, phone } = user.results[0];

		users.innerHTML += `
                    <div class='user-cell'>
                        <img src="${picture.large}">
                        <div><span>Name: </span>${name.title} ${name.first}, ${name.last}</div>
                        <div><span>From: </span>${location.country}</div>
                        <div><span>Postcode: </span>${location.postcode}</div>
                        <div><span>Phone: </span>${phone}</div>
                    </div>
                `;
	}

	fetchButton.disabled = false;
	info.innerText = "Done!";
};

const fetchButton = document.getElementsByTagName("button")[0];

fetchButton.addEventListener("click", insertUserstoDOM);
