const serviceCards = document.querySelectorAll(".service-card");


const pricingPanel = document.getElementById("pricePanel");

const priceClose = document.getElementById("priceClose");

const priceTitle = document.getElementById("priceTitle");

const priceSubtitle = document.getElementById("priceSubtitle");


const packagesContainer = document.getElementById("packages");


const requestPanel = document.getElementById("requestPanel");

const requestClose = document.getElementById("requestClose");

const requestService = document.getElementById("requestService");

const requestPackage = document.getElementById("requestPackage");

const requestPrice = document.getElementById("requestPrice");

const requestForm = document.getElementById("requestForm");


const successPanel = document.getElementById("successPanel");

const successClose = document.getElementById("successClose");

const successButton = document.getElementById("successButton");


const services = {

    python: {

        title: "Python Development",

        packages: [

            {
                name: "Basic",

                price: "R250",

                description: "For small Python tasks.",

                features: [
                    "Small Python scripts",
                    "Basic programming tasks",
                    "Bug fixes",
                    "Simple automation"
                ]
            },

            {
                name: "Standard",

                price: "R500",

                description: "For medium-sized Python projects.",

                features: [
                    "Medium Python programs",
                    "Automation scripts",
                    "Database integration",
                    "Debugging"
                ]
            },

            {
                name: "Advanced",

                price: "R1000+",

                description: "For larger Python applications.",

                features: [
                    "Complex applications",
                    "Database systems",
                    "Advanced automation",
                    "Custom functionality"
                ]
            }

        ]

    },


    java: {

        title: "Java Development",

        packages: [

            {
                name: "Basic",

                price: "R350",

                description: "For small Java tasks.",

                features: [
                    "Small Java programs",
                    "Basic programming tasks",
                    "Bug fixes",
                    "Simple applications"
                ]
            },

            {
                name: "Standard",

                price: "R700",

                description: "For medium Java projects.",

                features: [
                    "Medium applications",
                    "Object-oriented programming",
                    "Database integration",
                    "Debugging"
                ]
            },

            {
                name: "Advanced",

                price: "R1000+",

                description: "For larger Java applications.",

                features: [
                    "Complex applications",
                    "Database systems",
                    "Advanced functionality",
                    "Custom development"
                ]
            }

        ]

    },


    web: {

        title: "Web Development",

        packages: [

            {
                name: "Basic",

                price: "R500",

                description: "For simple websites.",

                features: [
                    "One-page website",
                    "HTML & CSS",
                    "Responsive design",
                    "Basic styling"
                ]
            },

            {

                name: "Standard",

                price: "R1000",

                description: "For professional websites.",

                features: [
                    "Multiple sections",
                    "HTML, CSS & JavaScript",
                    "Responsive design",
                    "Interactive elements"
                ]

            },

            {

                name: "Advanced",

                price: "R1500+",

                description: "For advanced websites.",

                features: [
                    "Multiple pages",
                    "Advanced JavaScript",
                    "Animations",
                    "Interactive functionality"
                ]

            }

        ]

    },


    testing: {

        title: "Program Testing",

        packages: [

            {

                name: "Basic",

                price: "R250",

                description: "For basic program testing.",

                features: [
                    "Basic functionality testing",
                    "Bug identification",
                    "Simple debugging",
                    "Basic testing report"
                ]

            },

            {

                name: "Standard",

                price: "R500",

                description: "For more detailed testing.",

                features: [
                    "Functional testing",
                    "Bug identification",
                    "Debugging",
                    "Detailed testing report"
                ]

            },

            {

                name: "Advanced",

                price: "R700+",

                description: "For larger applications.",

                features: [
                    "Extensive testing",
                    "Multiple test scenarios",
                    "Debugging",
                    "Detailed testing report"
                ]

            }

        ]

    }

};


/* =========================
   CLICK SERVICE CARD
========================= */

serviceCards.forEach(card => {

    card.addEventListener("click", function () {

        const serviceID = this.dataset.service;

        const service = services[serviceID];

        if (!service) {

            console.log("Service not found:", serviceID);

            return;

        }


        /* Change title */

        priceTitle.textContent = service.title;

        priceSubtitle.textContent = service.subtitle;


        /* Remove previous packages */

        packagesContainer.innerHTML = "";


        /* Create package cards */

        service.packages.forEach(packageInfo => {

            const packageCard = document.createElement("div");

            packageCard.className = "package-card";


            packageCard.innerHTML = `

                <h3>
                    ${packageInfo.name}
                </h3>

                <div class="package-price">
                    ${packageInfo.price}
                </div>

                <p>
                    ${packageInfo.description}
                </p>

                <ul>

                    ${packageInfo.features.map(feature => `
                        <li>${feature}</li>
                    `).join("")}

                </ul>

            `;
            
            packageCard.addEventListener("click", function() {

                openRequestPanel(
                    service.title,
                    packageInfo.name,
                    packageInfo.price
                );
            });

            packagesContainer.appendChild(packageCard);

        });


        /* Open panel */

        pricingPanel.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* =========================
   CLOSE BUTTON
========================= */

priceClose.addEventListener("click", function () {

    pricingPanel.classList.remove("active");

    document.body.style.overflow = "";

});


/* =========================
   CLICK OUTSIDE
========================= */

pricingPanel.addEventListener("click", function (event) {

    if (event.target === pricingPanel) {

        pricingPanel.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        pricingPanel.classList.remove("active");

        document.body.style.overflow = "";

    }

});

/* REQUEST PANEL */
function openRequestPanel(service, packageName, price) {

    requestService.textContent = service;
    requestPackage.textContent = packageName;
    requestPrice.textContent = price;

    document.getElementById("emailService").value = service;
    document.getElementById("emailPackage").value = packageName;
    document.getElementById("emailPrice").value = price;

    pricingPanel.classList.remove("active")

    requestPanel.classList.add("active")
}

requestClose.addEventListener("click", function() {

    requestPanel.classList.remove("active");
});

requestPanel.addEventListener("click", function(event) {

    if (event.target === requestPanel) {

        requestPanel.classList.remove("active")
    }
});

emailjs.init ({

    publicKey: "M2il9gaWJ60NpqJir"
})

requestForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const submitButton = document.querySelector(".request-submit");

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    emailjs.sendForm(
        "service_m2ek5r8",
        "template_k1ea4d4",
        this
    )
    .then(function () {

        successPanel.classList.add("active");

        requestForm.reset();

        requestPanel.classList.remove("active");

        submitButton.textContent = "Send Request";
        submitButton.disabled = false;

    })
    .catch(function (error) {

        console.error("EmailJS Error:", error);

        alert(
            "There was a problem sending your request. Please try again."
        );

        submitButton.textContent = "Send Request";
        submitButton.disabled = false;

    });

});

successClose.addEventListener("click", function () {

    successPanel.classList.remove("active");

    document.body.style.overflow = "";

});


successButton.addEventListener("click", function () {

    successPanel.classList.remove("active");

    document.body.style.overflow = "";

});


successPanel.addEventListener("click", function (event) {

    if (event.target === successPanel) {

        successPanel.classList.remove("active");

        document.body.style.overflow = "";

    }

});