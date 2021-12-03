import React from "react";
import Card from "./Card";

const cards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBldHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Shelby",
    genero: 'Hembra',
    edad: "12 meses",
    description:"quiero decir que esta es la descripcion para que todos tengamos una vida de una manera que cada uno es espécial para aaaa loco y tener un concoimiento donde ser tenga una maenra de conocer",
    url: "",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBldHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Mike",
    genero: 'Macho',
    edad: "1 año y 2 meses",
    description: "",
    url: ""

  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493916665398-143bdeabe500?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Suska",
    genero: 'Hembra',
    edad: "2 meses",
    description: "",
    url: ""
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGFuaW1hbHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Prime",
    genero: 'Macho',
    edad: "recien nacido",
    description: "",
    url: ""
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBldHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Luca",
    genero: 'Macho',
    edad: "3 años",
    description: "",
    url: ""
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1609791636587-50feca5caee7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBldHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Camila",
    genero: 'Hembra',
    edad: "10 años",
    description: "",
    url: ""
  }
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ id, image, title, genero, edad, description, url }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} genero={genero} edad={edad} url={url} description={description} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
