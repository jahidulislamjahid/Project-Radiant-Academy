import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const TestimonialSection = () => {

    const testimonials = [
        {
            "name": "Shafiul Islam",
            "image": "https://i.ibb.co/vLncdVC/346064333-949333756309325-621565237007494427-n-1.jpg",
            "review": "I received my certificate, and I would like to thank you for your support. Your course was challenging, but you were always there supporting me and ready to help",
            "rating": "4"
        },
        {
            "name": "A K M Monzurul Islam",
            "image": "https://i.ibb.co.com/b5Mg75H/AKM.jpg",
            "review": "Radiant academy is a great platform to explore new technologies. Developers of this team had a great opertunity to make this site future of our upcomming generation",
            "rating": "4.5"
        },
        {
            "name": "Fazzle Rabbi",
            "image": "https://i.ibb.co/B6NNNFT/rabbi.jpg",
            "review": "They have course variation that help student like me to find the right course from a user friendly educational platform. Really their services and behavior are awesome",
            "rating": "5"
        },
        {
            "name": "Jahidul Islam",
            "image": "https://i.ibb.co.com/bW89ZgQ/310747857-5400378163413295-811890902554305829-n.jpg",
            "review": "Impressive !! A educational platform like this was the demand of time. Now its time to take the benifits from them. Young and energatic peoples are giving this type of services. Its just wow",
            "rating": "4.5"
        }
    ]


    var settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 700,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                },
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-slate-800">
            <div className="w-5/6 mx-auto py-20 ">
                <h1 className="text-4xl	font-bold text-violet-800 dark:text-violet-400 pt-20 text-center">Ours Reviews</h1>
                <div className=" review-card text-center">
                    <Slider {...settings}>
                      
                            {
                                testimonials?.map((testimonial , idx) =>
                                    <div 
                                    key={idx}
                                    className="single-card rounded-xl bg-slate-100 dark:bg-slate-700 shadow-xl hover:shadow-zinc-400  dark:hover:shadow-violet-500 transition duration-300  mb-7 my-20 md:mb-0 ">
                                        <div className="grid place-content-center relative bottom-5">
                                            <Image
                                                src={testimonial?.image}
                                                height={120}
                                                width={120}
                                                alt={testimonial?.name}
                                                draggable="false"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h1 className="text-center dark:text-white">{testimonial?.name}</h1>
                                        <p className="text-center text-orange-200 ">Rating : {testimonial?.rating}</p>
                                       
                                        <div>
                                            <p className="text-slate-500 text-center dark:text-slate-400 my-5 w-5/6 mx-auto  ">"{testimonial?.review.slice(0,100)+'...'}"</p>
                                        </div>
                                    </div>
                                )
                            }
                    

                    </Slider>
                    <style >
                        {`
                            .single-card {
                                width: 90% !important;
                            }
                            .review-card .slick-list{
                                padding-bottom: 4rem !important;
                            }
                            .slick-prev:before {
                                color: #32007E;
                            }
                            
                            .slick-next:before {
                                color: #32007E;
                            }
                            
                            .slick-slide:focus {
                                outline: none;
                            }
                            
                            .slick-dots {
                                bottom: 0px;
                            }
                            
                            .slick-dots li button:before {
                                font-size: 0.75rem;
                                opacity: 1;
                                color: #CCDEE2;
                            }
                            
                            .slick-dots li.slick-active button:before {
                                opacity: .75;
                                color: #F2522F;
                            }
                        `}
                    </style>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;