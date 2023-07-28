var api = `https://api.shrtco.de/v2/shorten?url=`;
var url = `https://www.youtube.com/`;

var getPosts = async function () {
    try {
        var res = await fetch(`${api}${url}`);
        if (res.ok) {
            var pos = await res.json();
            console.log(`Link sau khi rút gọn là: ${pos.result.short_link}`);
        } else {
            throw new Error(res.status);
        }
    } catch (e) {
        console.log(e);
    }
};

getPosts();
