$(".search-input").on("click", function(ev) {
    jsonRequester.get("/api/usernames")
        .then(users => {
            console.log(users);

            $(ev.target).autocomplete({ source: users });
        });
});