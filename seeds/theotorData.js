const passport=require('passport');
const passportLocal=require('passport-local');

const data = [
  {
    name: "Prithvi Theatre",
    location: "20 Janki Kutir, Juhu Church Rd, Mumbai, Maharashtra 400049",
    Opened: "5 November 1978",
    Owner: "Shri Prithviraj Kapoor Memorial Trust & Research Foundation",
    Phone: "02226149546",
    rating: 4.5,
  },
  {
    name: "INOX",
    location:
      "Located in: R City Mall Lal Bahadur Shastri Rd, Amrut Nagar, Ghatkopar West, Mumbai, Maharashtra 400086",
    Opened: "",
    Owner: "",
    Phone: " 070455 18494",
    rating: 4.5,
  },
  {
    name: "Premiere Gold Theatre",
    location:
      "Municipal Road, Samantbhai Nanji Marg, Dongri, Umerkhadi, Mumbai, Maharashtra 400009",
    Opened: "",
    Owner: "",
    Phone: "",
    rating: 3.4,
  },
  {
    name: "PVR Icon Cinemas - Versova",
    location:
     "Located in: Infiniti Mall 3, Infinity Mall, Andheri, New Link Rd, Phase D, Shastri Nagar, Versova, Mumbai, Maharashtra 400036",
    Opened: "",
    Owner: "",
    Phone: "088009 00009",
    rating: 4.4,
  },
  {
    name: "Carnival Cinemas Imax",
    location:
     "Carnival Cinemas Imax, Anik Wadala Link Rd, Bhakti Park, Wadala, Mumbai, Maharashtra 400037",
    Opened: "",
    Owner: "",
    Phone: "",
    rating: 4.2,
  },
  {
    name: "Sterling Cineplex",
    location:
     " 65, Murzban Rd, Azad Maidan, Fort, Mumbai, Maharashtra 400001",
    Opened: "1969",
    Owner: "",
    Phone: "022 6622 0017",
    rating: 4.1,
  },
  {
    name: "PVR Cinemas",
    location:
     "Unit F, 38, Lal Bahadur Shastri Rd, Kamani, Kurla West, Kurla, Mumbai, Maharashtra 400070",
    Opened: "",
    Owner: "",
    Phone: "",
    rating: 4.4,
  },
  {
    name: "The Royal Opera House",
    location:
     " Mathew Rd, Charni Road East, Opera House, Girgaon, Mumbai, Maharashtra 400004",
    Opened: "1942",
    Owner: "",
    Phone: "022 2366 8888",
    rating: 4.5,
  },
  {
    name: "Metro INOX Cinema",
    location:
     " Mahatma Gandhi Road, Dhobi Talao, New Marine Lines, Junction, Mumbai, Maharashtra 400020",
    Opened: " 8 June 1938",
    Owner: "",
    Phone: "",
    rating: 4.3,
  },
  {
    name: "G7 Multiplex",
    location:
     "Tata Blocks, 30th Rd, Bandra West, Mumbai, Maharashtra 400050",
    Opened: "",
    Owner: "",
    Phone: "",
    rating: 3.7,
  },
];

const mongoose=require('mongoose');
const theotorSchema=require('../models/theotor');

const mongoDB=require('../MongoDB/server');

mongoDB();

const seedDB= async ()=>{



    await theotorSchema.deleteMany({});
    for(let i=0;i<10;i++){
        const theotor=new theotorSchema({
            username:`admin_${i}`,
            name:data[i].name,
            location:data[i].location,
            Opened:data[i].Opened,
            Owner:data[i].Owner,
            Phone:data[i].Phone,
            rating:data[i].rating

        })
        const newUser= await theotorSchema.register(theotor,"admin");

      
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
