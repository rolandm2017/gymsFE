import { ITestimonial } from "../interface/Testimonial.interface";
import Person1 from "../assets/person1.png";
import Person2 from "../assets/person2.png";
import Person3 from "../assets/person3.png";

export const TESTIMONIALS: ITestimonial[] = [
    {
        name: "Claire Littleton",
        content: "Wow, I managed to start a gym habit using this website. Thanks ApsNearGyms!",
        rating: 5,
        imgPath: Person1,
    },
    {
        name: "Jack Shepherd",
        content: "This site helped me train to look great and get ready for an ironman competition.",
        rating: 4.5,
        imgPath: Person2,
    },
    {
        name: "Benjamin Linus",
        content: "Your team got me going to the gym six days a week. I used to skip the gym. Never since using the site!",
        rating: 5,
        imgPath: Person3,
    },
];
