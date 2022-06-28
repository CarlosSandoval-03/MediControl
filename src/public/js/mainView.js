let layoutContent = document.getElementById("layoutSidenav_nav");
let mainContent = document.getElementById("layoutSidenav_content");

function toggleSidebar() {
	if (layoutContent.style.transform == "translateX(0%)") {
		layoutContent.style.transform = "translateX(-100%)";
		mainContent.style.marginLeft = "-225px";
	} else {
		layoutContent.style.transform = "translateX(0%)";
		mainContent.style.marginLeft = "0";
	}
}
