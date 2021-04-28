class PopupInfo extends HTMLElement {
    static get observedAttributes() {
        return ['data-text'];
    }
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        this.shadow = shadow;

        const wrapper = document.createElement("span");
        wrapper.setAttribute("class", "wrapper");

        const icon = document.createElement("span");
        icon.setAttribute("class", "icon");
        icon.setAttribute("tabindex", 0);

        const info = document.createElement("span");
        info.setAttribute("class", "info");

        const text = this.getAttribute("data-text");
        info.textContent = text;

        let imgUrl = "/static/images/mm6.jpg";
        if (this.hasAttribute("img")) {
            imgUrl = this.getAttribute("img");

        }
        const img = document.createElement("img");
        img.src = imgUrl;
        icon.appendChild(img);

        const style = document.createElement("style"); // document.createElement('link')
        console.log(style.isConnected);

        style.textContent = `
        .wrapper {
            position: relative;
            top: 200px;
        }
        .info {
            font-size: 0.8rem;
            width: 200px;
            display: inline-block;
            border: 1px solid black;
            padding: 10px;
            background: white;
            border-radius: 10px;
            opacity: 0;
            transition: 0.6s all;
            position: absolute;
            bottom: 20px;
            left: 10px;
            z-index: 3;
        }
        img {
            width: 1.2rem;
        }
        .icon:hover + .info, .icon:focus + .info {
            opacity: 1;
        }
        `;

        shadow.append(style, wrapper);
        console.log(style.isConnected);
        wrapper.append(icon, info);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // if (oldValue === null) return;
        console.log('Custom element attributes changed:', name, oldValue, newValue);
        this.updateStyle();
    }
    updateStyle() {
        console.log(this.shadow);
        this.shadow.querySelector(".info").textContent = this.getAttribute("data-text");
    }
}

customElements.define("popup-info", PopupInfo);

document.querySelector(".update").onclick = function () {
    document.querySelector("popup-info ").setAttribute("data-text", "哈哈哈")
}