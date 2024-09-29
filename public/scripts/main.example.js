const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


const app = new App();

app.loadButton.addEventListener('click', () => {
    app.clear()
    app.loadFilter().then(app.run());
})

app.init()