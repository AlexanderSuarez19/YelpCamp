const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Database connected!");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedsDB = async function () {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(places)} ${sample(descriptors)}`,
      image: "https://random.imagecdn.app/500/150",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ad maiores quia voluptas recusandae doloremque dignissimos quidem eum aliquid rerum mollitia, ipsam quos, nostrum dolorum, voluptate repellendus? Inventore, explicabo quibusdam.",
      price: price,
    });
    await camp.save();
  }
};

seedsDB().then(() => {
  mongoose.connection.close();
});
