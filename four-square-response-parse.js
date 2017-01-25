module.exports = function (data) {
    var parsed = [];
    for (var ite of  data) {
        var entry = {};
        entry.id=ite.id;
        if (ite.name) {
            entry.name = ite.name;
        } else {
            //we dont need a business without a name
            continue;
        }

        if (ite.location.address) {
            entry.address = ite.location.address;
        } else {
            entry.address = 'NA';
        }

        if (ite.categories instanceof Array && ite.categories.length > 0) {
            entry.categories = [];
            ite.categories.forEach(function (e) {
                if (e.name) {
                    entry.categories.push(e.name);
                }
            });
        } else {
            entry.categories = 'NA';
        }

        if (ite.location instanceof Object &&
            ite.location.lat !== undefined &&
            ite.location.lng !== undefined) {
            entry.cords = {lat: ite.location.lat, lon: ite.location.lng};
        } else {
            //we dont need a business without coordinates
            continue;
        }

        if (ite.location.city) {
            entry.city = ite.location.city;
        } else {
            entry.city = 'NA';
        }

        if (ite.rating) {
            entry.rating = ite.rating;
        } else {
            entry.rating = 'NA';
        }

        if (ite.contact.phone) {
            entry.phone = ite.contact.phone;
        } else {
            entry.phone = 'NA';
        }
        
       // entry.photo = '../images/noImages.jpg';
        entry.photo = ite.photo;

        if (ite.url) {
            entry.url = ite.url;
        } 

        if (ite.description) {
            entry.description = ite.description;
        } else {
            entry.description = 'NA';
        }

        parsed.push(entry);
    }
    return parsed;
};