import {gsap} from "gsap";

let flair = gsap.utils.toArray(".flair");
console.log(123123,flair)
let gap = 150;
let index = 0;
let wrapper = gsap.utils.wrap(0, flair.length);

let mousePos = { x: 0, y: 0 };
let lastMousePos = mousePos;
let cachedMousePos = mousePos;

window.addEventListener("mousemove", (e) => {
    mousePos = {
        x: e.x,
        y: e.y
    };
});

gsap.ticker.add(ImageTrail);

function ImageTrail() {
    let travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
    );

    // keep the previous mouse position for animation
    cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.1
    );
    cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.1
    );

    if (travelDistance > gap) {
        animateImage();
        lastMousePos = mousePos;
    }
}

function animateImage() {
    let wrappedIndex = wrapper(index);

    console.log(index, flair.length);

    let img = flair[wrappedIndex];
    gsap.killTweensOf(img);

    gsap.set(img, {
        opacity: 0,
        x: cachedMousePos.x,
        y: cachedMousePos.y,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        rotation: () => gsap.utils.random([-180, 180]),
    });

    gsap.timeline({defaults:{ease: "expo.out", duration: 1}})
        .to(
            img,
            {
                duration: 0.3,
                opacity: 1,
                scale: 1,
                ease: "back.out",
                rotation: 0
            },
            0
        )
        .to(
            img,
            {
                x: mousePos.x,
                y: mousePos.y,
                xPercent: -50,
                yPercent: -50
            },
            0
        )
        .to(
            img,
            {
                rotation: () => gsap.utils.random([-600, 600, -300, 300]),
                ease: "power3.in"
            },
            0.1
        )
        .to(
            img,
            {
                opacity: 0,
                ease: "power1.in",
                duration: 0.8
            },
            0.4
        )
        .to(
            img,
            {
                y: "100vh",
                ease: "power3.inOut",
            },
            0.4
        );

    index++;
}