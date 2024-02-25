
const {User} = require("../../models/user")


async function saveAdmin(){
    const ThePhat = new User({
        username: "thephat",
        role: "superadmin",
        password: "Sp4scldmcc."
    })
    await ThePhat.save()
    const VuongBinh = new User({
        username: "vuongbinh",
        role: "superadmin",
        password: "binh2007"
    })
    await VuongBinh.save()
    const DinhDuy = new User({
        username: "dinhduy",
        role: "superadmin",
        password: "duy2007"
    })
    await DinhDuy.save()
    
}

saveAdmin()