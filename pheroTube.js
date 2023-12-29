const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((res) => res.json())
        .then((data) => displayNav(data.data));
    showData(1000);
};
let videoStore;
const displayNav = (data) => {
    console.log(data);
    const navContainer = document.getElementById("nav-container");


    data.forEach((item) => {
        // console.log(item);
        const navCon = document.createElement("div");
        navCon.innerHTML = `<button onclick="showData(${item.category_id})" class="nav-link ${item.category_id == 1000 ? "active" : ""} px-4 " data-bs-toggle="pill" type="button" role="tab">${item.category}</button>`;
        navContainer.appendChild(navCon);
    });
};

const showData = (id) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => displayCategory(data.data));
};

const displayCategory = (data) => {
    console.log(data);
    videoStore = data;
    const showDetails = document.getElementById("show-details");
    showDetails.innerHTML = "";
    const sortBtn = document.getElementById("sortBtn");
    if (data?.length == 0) {
        showDetails.innerHTML = `
        <div class="text-center mx-auto mt-5 px-0">
            <img src="./images/Icon.png" alt="" class="">
            <p class="fs-5 fw-bolder">Oops!! Sorry, There is no <br> content here</p>
        </div>
        `;

        sortBtn.classList.add("d-none");
    }
    else {
        sortBtn.classList.remove("d-none");
        // sortBtn.classList.add("d-block");
        data.forEach((details) => {
            // console.log(details);
            const card = document.createElement("div");
            card.classList.add("col-12", "col-lg-4", "col-xl-3", "card", "border-0", "px-0");
            card.innerHTML = `
                <div class=" position-relative ">
                    <img src="${details?.thumbnail}" alt="" class="rounded-3 thumb">
                    <span class="position-absolute badge-time" >
                        ${parseTime(details?.others?.posted_date)}
                    </span>
                </div>
                
                <div class="d-flex my-3">
                    <div class="">
                        <img src="${details?.authors[0]?.profile_picture
                }" alt="" class="profile-pic">
                    </div>
                    <div class=" ms-3 lh-1 ">
                        <p class="fw-bold lh-sm ">${details?.title}</p>
                        <p class="opacity-75 ">${details?.authors[0]?.profile_name} ${details?.authors[0]?.verified ? `<img src="./images/verify-badge.svg" alt="" class="ms-2">` : ""}  </p>
                        <p class="opacity-75">${details?.others?.views} views</p>
                    </div>
                </div>
                `;
            showDetails.appendChild(card);

        });


    }

};

const parseTime = (timeSecond) => {
    var time = Number(timeSecond);
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time % 3600) / 60);

    const hShow = hour > 0 ? hour + (hour == 1 ? " hour" : " hours ") : "";
    const mShow = minute > 0 ? minute + (minute == 1 ? " minute" : " minutes ") : "";

    if (time) {
        return hShow + mShow + " ago";
    }
    else {
        return "";
    }
};
const handleSort = () => {
    displayCategory(sortDescending(videoStore));
};

const sortDescending = (data) => {
    for (let i = 0; i < data?.length - 1; i++) {
        for (let j = i + 1; j < data?.length; j++) {
            let firstElementView = parseInt(data[i]?.others.views);
            let secondElementView = parseInt(data[j]?.others.views);

            if (firstElementView < secondElementView) {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    return data;
}


loadData();