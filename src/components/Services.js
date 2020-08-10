import React, { Component } from "react";
import Title from "./Title";

import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Free cocktails",
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, non.'
            },
            {
                icon: <FaHiking />,
                title: "Endless hiking",
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, non.'
            },
            {
                icon: <FaShuttleVan />,
                title: "Free shuttle",
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, non.'
            },
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, non.'
            }
        ]
    }
    render () {
        return (
            <section className="services">
                <Title title="Services" />
                <div className="services-center">
                    {this.state.services.map((service, index) => {
                        return (
                        <article key={index} className='service'>
                            <span>{service.icon}</span>
                            <h6>{service.title}</h6>
                            <p>{service.info}</p>
                        </article>
                        )
                    })}
                </div>
            </section>
        );
    }
}
